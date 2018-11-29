import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  AsyncStorage,
} from "react-native";
import Image from "react-native-scalable-image";
import PropTypes from "prop-types";
import LoginStyles from "../styles/HomeStack/LoginStyles.js";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import axios from "axios";
import t from "tcomb-form-native";
const Form = t.form.Form;

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://662c08a4.ngrok.io";
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
      error:
        "Without an email address how are you going to reset your password when you forget it?",
    },
    password: {
      error:
        "Choose something secure and memorable - since our reset feature is still a work in progress",
      ////////////////////////////////
      password: true,
      secureTextEntry: true,
    },
  },
};

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  redirect(page) {
    this.props.navigation.navigate(page);
  }

  componentDidMount() {}

  //notes
  // every time we access a page, check for id or username + password (depending on what works)

  handleSubmit = () => {
    const that = this;
    const value = this._form.getValue(); // use that ref to get the form value
    console.log("(login.js) LOGIN FORM ===> ", value);
    that.redirect("Login");
    if (value) {
      // if validation fails, value will be null
      let validate = false;
      // post user information to backend /login route
      axios
        .post(`${currentHostedLink}/login`, value)
        .then(function(response) {
          if (response.data) {
            console.log("(login.js) USER RESPONSE  ===> ", response.data);
            // notifiy user that the password is wrong with a relevant message
            if (response.data.id < 0) {
              console.log(
                "(login.js) wrong password was inputed, server returned success false",
              );
              that.setState({
                status: "Incorrect password or email - please try again",
              });
            } else {
              AsyncStorage.setItem(
                "sessionToken",
                response.data.sessionToken,
              ).then(() => {
                that.props.screenProps.OnSessionChange();
              });
              validate = true;
            }
          }
        })
        .catch(function(error) {
          console.log("(login.js) ", error);
        })
        .finally(function() {
          console.log(
            "VAIDATE is ==> ",
            validate,
            " redirecting page to profile.js",
          );
          if (validate) {
            that.props.screenProps.changePage("Profile");
          }
        });
    }
  };

  render() {
    return (
      <View style={LoginStyles.container}>
        <View
          style={{
            width: "100%",
            height: 25,
            backgroundColor: "black",
          }}
        />
        <View
          style={{
            width: "100%",
            height: 15,
            backgroundColor: "rgba(248, 82, 96, 1)",
          }}
        />
        <ScrollView style={LoginScreen.avoidView}>
          <View
            style={{
              width: "100%",
              height: 50,
            }}
          />
          <View style={LoginStyles.headerContainer}>
            <Text style={LoginStyles.headerText}> Login </Text>
          </View>
          <View style={LoginStyles.middleContainer}>
            <View style={LoginStyles.formView}>
              <Form
                ref={c => (this._form = c)}
                type={Login}
                options={options}
              />
            </View>
            <Text style={LoginStyles.registerError}> {this.state.status} </Text>
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
                style={LoginStyles.registerText}
              >
                Want the gastronomic universe in your pocket ?
              </Text>
            </View>
            <View style={LoginStyles.buttonView}>
              <View style={LoginStyles.registerButton}>
                <Button
                  title="Register"
                  onPress={() => this.props.navigation.navigate("Register")}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 500,
            }}
          />
        </ScrollView>
        {/* <View style={{ position: "absolute", width: "90%",height: "100%",backgroundColor: "rgba(248, 82, 96, 1)",zIndex: -10, borderLeftWidth: 0.7, borderRightWidth: 0.7,}} /> */}
      </View>
    );
  }
}

LoginScreen.propTypes = {
  changePage: PropTypes.func,
};
