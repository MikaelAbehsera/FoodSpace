import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import RegisterStyles from "../styles/HomeStack/RegisterStyles.js";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import moment from "moment";
// Import tcomb form schema
import t from "tcomb-form-native";
const Form = t.form.Form;

const Login = t.struct({
  name: t.String,
  email: t.String,
  password: t.String,
  birthDate: t.Date,

  // birthDate: t.Date, // is not working not sure why 
  // rememberMe: t.maybe(t.Boolean),
});

var options = {
  fields: {
    birthDate: {
      mode: 'date' // display the Date field as a DatePickerAndroid
    }
  }
};

export default class RegisterScreen extends React.Component {
  handleSubmit = () => {
    // do the things  
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
  }

  render() {
    return (
      <View style={RegisterStyles.container} >

        <View style={RegisterStyles.headerContainer}>
          <Text style={RegisterStyles.headerText} >Register</Text>
        </View>

        <View style={RegisterStyles.middleContainer}>

          <View style={RegisterStyles.formView}>
            <Form 
            ref={c => this._form = c}
            type={Login}
            options={options} 
            /> 
          </View>

        </View>


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
