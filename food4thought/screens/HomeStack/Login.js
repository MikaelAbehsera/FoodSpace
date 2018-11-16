import React, {Component} from "react";
import { Button, Text, View, ScrollView } from "react-native";
// Import login styles module
import LoginStyles from "../styles/HomeStack/LoginStyles.js";

import t from "tcomb-form-native";

const Form = t.form.Form;

const Login = t.struct({
  email: t.String,
  password: t.String,
});

export default class LoginScreen extends React.Component {

  handleSubmit = () => {
    // do the things  
    console.log("MING");
    console.log("BING");
  }

  render() {
    return (
      <View style={LoginStyles.container} >

        <View style={LoginStyles.headerContainer}>
          <Text style={LoginStyles.headerText}>Login</Text>
        </View>

        <View style={LoginStyles.middleContainer}>
          <View style={LoginStyles.formView}>
            <Form type={Login} /> 
          </View>
          <View style={LoginStyles.loginButtonView}>
            <Button
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

      </View>
    );
  }
}

