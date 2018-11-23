import React, { Component } from "react";
import { Button, Text, View, ScrollView, Dimensions, KeyboardAvoidingView, AsyncStorage } from "react-native";
import Image from 'react-native-scalable-image';
import axios from "axios";
import RegisterStyles from "../styles/HomeStack/RegisterStyles.js";

// Import tcomb form schema
import t from "tcomb-form-native";
const Form = t.form.Form;

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://45eced04.ngrok.io";
///////////////////////////////////////////////////////////////


const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

const Register = t.struct({
  username: t.String,
  email: Email,
  profilePictureURL: t.maybe(t.String),
  location: t.String,
  password: t.String,
  passwordConfirmation: t.String,
});

var options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true,
      },
    passwordConfirmation: {
      password: true,
      secureTextEntry: true,
      },
  }
};

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    title: "Please register!",
  };

  redirect(page) {
    this.props.navigation.navigate(page)
  }

  componentDidMount() {
    console.log("token getting removed")
    AsyncStorage.setItem("sessionToken", "").then(() => {
      console.log("token removed")
    })
  }

  handleSubmit = () => {
    const that = this;
    const value = this._form.getValue(); // use that ref to get the form value
    console.log("REGISTER FORM ===> ", value);
    if (value) { // if validation fails, value will be null
      let validate = false;
      // post user information to backend /login route
      axios.post((`${currentHostedLink}/register`), value)
      .then(function (response) {
        console.log("RESPONSE ===> ", response.data.sessionToken);
        if(response.data.id < 0) {
          console.log("-1 from server something is wrong");
        } else {
          AsyncStorage.setItem("sessionToken", response.data.sessionToken).then(
          () => {
            console.log("SESSION TOKEN HAS BEEN STORED");
            that.props.screenProps.OnSessionChange()
          })
          validate = true;  
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
    const { goBack } = this.props.navigation;

    return (
      <View style={RegisterStyles.container} >
        <View style={{width: "100%", height: 25, backgroundColor: "black"}} />
      <ScrollView style={RegisterStyles.scrollContainer} >
      <View style={{width: "100%", height: 100}} />
        <View style={RegisterStyles.headerContainer}>
          <Text style={RegisterStyles.headerText} >Register</Text>
        </View>

        <View style={RegisterStyles.middleContainer}>

          <View style={RegisterStyles.formView}>
            <Form 
            ref={c => this._form = c}
            type={Register}
            options={options} 
            /> 
          </View>

        </View>
        <View style={{width: "100%", height: 300}} />
    </ScrollView>

        <View style={RegisterStyles.footerContainer}>
          <View style={RegisterStyles.registerTextView}>
            <Text 
              adjustsFontSizeToFit={true}
              minimumFontScale={0.1}
              style={RegisterStyles.registerText} >
            You do want the gastronomic universe in your pocket!
            </Text>
          </View>
          <View style={RegisterStyles.buttonView}>
            <View style={RegisterStyles.registerButton} >
              <Button
                title="Register"
                onPress={this.handleSubmit}
                />
              <Button
                title="Go Back"
                onPress={() => goBack()}
                />
            </View>
          </View>
        </View>

        <Image source={require("../materials/food.gif")} height={Dimensions.get('window').height + 50} style={{ position: 'absolute', flex: 1, zIndex: -10,}} />
      </View>
    );
  }
}
