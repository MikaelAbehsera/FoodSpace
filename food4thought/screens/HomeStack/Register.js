import React, { Component } from "react";
import { Button, Text, View, ScrollView } from "react-native";
import RegisterStyles from "../styles/HomeStack/RegisterStyles.js";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import moment from "moment";
// Import tcomb form schema
import t from "tcomb-form-native";
const Form = t.form.Form;

const Register = t.struct({
  name: t.String,
  email: t.String,
  password: t.String,
});

var options = {
  fields: {
  }
};

export default class RegisterScreen extends React.Component {
  handleSubmit = () => {
    // do the things  
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('date: ', value);
  }

  render() {
    return (
      <View style={RegisterStyles.container} >
      {/* <ScrollView> */}


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

    {/* </ScrollView> */}

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
