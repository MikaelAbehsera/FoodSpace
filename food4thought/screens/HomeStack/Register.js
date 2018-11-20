import React, { Component } from "react";
import { Button, Text, View, ScrollView } from "react-native";
import axios from "axios";
import RegisterStyles from "../styles/HomeStack/RegisterStyles.js";

// Import tcomb form schema
import t from "tcomb-form-native";
const Form = t.form.Form;

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://2f92c577.ngrok.io";
///////////////////////////////////////////////////////////////


const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

const Register = t.struct({
  username: t.String,
  email: Email,
  profilePictureUrl: t.maybe(t.String),
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

  handleSubmit = () => {
    const that = this;
    const value = this._form.getValue(); // use that ref to get the form value
    console.log("REGISTER FORM ===> ", value);
    that.redirect("Register") 
    if (value) { // if validation fails, value will be null
      let validate = false;
      // post user information to backend /login route
      axios.post((`${currentHostedLink}/register`), value)
      .then(function (response) {
        if(response.data.success) { 
          validate = true;
          console.log("USER ID ===> ", response.data.id);
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
