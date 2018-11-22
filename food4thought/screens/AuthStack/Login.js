import React, {Component} from "react";
import { Button, Text, View, ScrollView, Dimensions, KeyboardAvoidingView, AsyncStorage } from "react-native";
import Image from 'react-native-scalable-image';
import PropTypes from "prop-types";
import LoginStyles from "../styles/HomeStack/LoginStyles.js";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from "axios";
import t from "tcomb-form-native";
const Form = t.form.Form;

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://424fb32d.ngrok.io";
///////////////////////////////////////////////////////////////

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

const Login = t.struct({
  email: Email,
  password: t.String,
});

const options = {
  fields: {
    email: {
      error: 'Without an email address how are you going to reset your password when you forget it?'
    },
    password: {
      error: 'Choose something you use on a dozen other sites or something you won\'t remember',
      password: true,
      secureTextEntry: true,
    },
  },
}



export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: { text: "I WILL CHANGE FOR YOU" }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  redirect(page) {
    this.props.navigation.navigate(page);
  }

  componentDidMount() {
    // console.log("token getting removed")
    // AsyncStorage.setItem("sessionToken", "").then(() => {
    //   console.log("token removed")
    // })
  }

  //notes
  // every time we access a page, check for id or username + password (depending on what works)

  handleSubmit = () => {
    const that = this;
    const value = this._form.getValue(); // use that ref to get the form value
    console.log("LOGIN FORM ===> ", value);
    that.redirect("Login") 
    if (value) { // if validation fails, value will be null
      let validate = false;
      // post user information to backend /login route
      axios.post((`${currentHostedLink}/login`), value)
      .then(function (response) {
        if(response.data) { 
          console.log("USER RESONPSE  ===> ", response.data);
          // notifiy user that the password is wrong with a relevant message
          if(response.data.id < 0) {
            console.log("wrong pass");
            that.setState({status: { text: "DA PASSVORD IS WRONG!" }});
          } else {
            AsyncStorage.setItem("sessionToken", response.data.sessionToken).then(
            () => {
              console.log("SESSION HELLO");
              that.props.screenProps.OnSessionChange()
            })
            validate = true;  
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      }).finally(function() { 
        console.log("VAIDATE ==> ", validate)
        if(validate) {
          that.props.screenProps.changePage("Profile");
        }
      });
    }
  }


  render() {
    return (
      <View style={LoginStyles.container} >
        <ScrollView style={LoginScreen.avoidView} >
        <View style={{width: "100%", height: 25, backgroundColor: "black"}} />
        <View style={{width: "100%", height: 50}} />

        <View style={LoginStyles.headerContainer}>
          <Text style={LoginStyles.headerText} >Login</Text>
        </View>

        <View style={LoginStyles.middleContainer}>
          <View style={LoginStyles.formView}>
            <Form 
            ref={c => this._form = c}
            type={Login} 
            options={options}
            /> 
          </View>
          <View style={LoginStyles.loginButtonView}>
            <Button
              style={LoginStyles.loginButton}
              title="Login"
              onPress={this.handleSubmit}
            />
          </View>

        </View>


        <View style={LoginStyles.footerContainer}>
          <View style={LoginStyles.registerTextView}>
            <Text 
              adjustsFontSizeToFit={true}
              minimumFontScale={0.1}
              style={LoginStyles.registerText} >
            Want the gastronomic universe in your pocket?
            </Text>
          </View>
          <View style={LoginStyles.buttonView}>
            <View style={LoginStyles.registerButton} >
              <Button
                title="Register"
                onPress={() => this.props.navigation.navigate("Register")}
              />
            </View>
          </View>
        </View>

        <View style={{width: "100%", height: 500}} />
      
        </ScrollView>

        <Image source={require("../materials/food.gif")} height={Dimensions.get('window').height + 50} style={{ position: 'absolute', width: "100%", zIndex: -10,}} />
      </View>
    );
  }
}

LoginScreen.propTypes = {
  changePage: PropTypes.func,
};