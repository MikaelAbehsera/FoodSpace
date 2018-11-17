import React, {Component} from "react";
import { Button, Text, View, ScrollView, KeyboardAvoidingView, AsyncStorage } from "react-native";
// Import login styles module
import LoginStyles from "../styles/HomeStack/LoginStyles.js";
// Import font scaler 
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from "axios";

import t from "tcomb-form-native";
const Form = t.form.Form;

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://2f92c577.ngrok.io";
///////////////////////////////////////////////////////////////




const Login = t.struct({
  email: t.String,
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
    this.props.navigation.navigate(page)
  }

  //notes
  // every time we access a page, check for id or username + password (depending on what works)

  handleSubmit = () => {
    const that = this;
    const value = this._form.getValue(); // use that ref to get the form value
    console.log("LOGIN FORM ===> ", value);

    if (value) { // if validation fails, value will be null
      let validate = false;
      // post user information to backend /login route
      axios.post((`${currentHostedLink}/login`), value)
      .then(function (response) {
        console.log(response.data);
        if(response.data) { 
          validate = true;
          console.log("USER ID ===> ", response.data.id);
          // notifiy user that the password is wrong with a relevant message
          if(response.data.id < 0) {
            console.log("wrong pass");
            that.setState({status: { text: "DA PASSVORD IS WRONG!" }});
            }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      
      if(validate) {
        setTimeout(() => { this.redirect("Home") }, 200);
      }
    }
  }


  render() {
    return (
      <View style={LoginStyles.container} >
        <ScrollView style={LoginScreen.avoidView} >

        <View style={LoginStyles.headerContainer}>
          <Text style={LoginStyles.headerText} >Login</Text>
        </View>

        <View style={LoginStyles.middleContainer}>
          <View style={LoginStyles.formView}>
          <Text id="statusText" >{this.state.status.text}</Text>
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
        
        </ScrollView>
      </View>
    );
  }
}

