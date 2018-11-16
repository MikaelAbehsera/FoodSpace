import React, {Component} from "react";
import { Button, Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
// Import login styles module
import LoginStyles from "../styles/HomeStack/LoginStyles.js";
// Import font scaler 
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import t from "tcomb-form-native";

const Form = t.form.Form;

const Login = t.struct({
  email: t.String,
  password: t.String,
  // rememberMe: t.maybe(t.Boolean),
});

export default class LoginScreen extends React.Component {
  redirect(page) {
    this.props.navigation.navigate(page)
  }

  handleSubmit = () => {
    // do the things  
    const value = this._form.getValue(); // use that ref to get the form value

    // knex => users table where email matches
    //          get password
    //          check password matches  -> if yes redirect to home
    //                                  -> if no ERROR PAGE

    console.log('value: ', value);
    if (value) { // if validation fails, value will be null
    setTimeout(() => { this.redirect("Home") }, 200);
    }
  }
  

  render() {

    const options = {
      fields: {
        email: {
          error: 'Without an email address how are you going to reset your password when you forget it?'
        },
        password: {
          error: 'Choose something you use on a dozen other sites or something you won\'t remember'
        },
      },
    };
    return (
      <View style={LoginStyles.container} >
        <ScrollView style={LoginScreen.avoidView} >

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
          <View style={LoginStyles.deadspaceView} />

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

