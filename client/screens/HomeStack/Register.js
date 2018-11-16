import React, { Component } from "react";
import { Button, Text, View, ScrollView } from "react-native";
import RegisterStyles from "../styles/HomeStack/RegisterStyles.js";
// import { ImageFactory } from "react-native-image-picker-form";

// Import tcomb form schema
import t from "tcomb-form-native";
const Form = t.form.Form;



const Register = t.struct({
  username: t.String,
  email: t.String,
  profilePictureUrl: t.maybe(t.String),
  location: t.String,
  password: t.String,
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
  handleSubmit = () => {
    // do the things  
    const data = this._form.getValue(); // use that ref to get the form value
    console.log('date: ', data);

  }

  render() {
    return (
      <View style={RegisterStyles.container} >

      <ScrollView style={RegisterStyles.scrollContainer} >

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
            </View>
          </View>
        </View>

      </View>
    );
  }
}
