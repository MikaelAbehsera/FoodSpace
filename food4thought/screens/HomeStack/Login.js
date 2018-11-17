import React, {Component} from "react";
import { Button, Text, View, ScrollView, KeyboardAvoidingView, AsyncStorage } from "react-native";
// Import login styles module
import LoginStyles from "../styles/HomeStack/LoginStyles.js";
// Import font scaler 
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import t from "tcomb-form-native";
import axios from "axios";

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://1a051edb.ngrok.io/login";
///////////////////////////////////////////////////////////////


const Form = t.form.Form;
const Login = t.struct({
  email: t.String,
  password: t.String,
});

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: { text: "I WILL CHANGE FOR YOU" }
    }
  }

  redirect(page) {
    this.props.navigation.navigate(page)
  }

  //things to do
  // login.js => line 45 - 55, depending on response change status text
  // server.js => line 22 - 38, send relevant response for good and bad passwords


  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log("FORM ===> ", value);

    if (value) { // if validation fails, value will be null
      console.log("value is ===> true");
      let validate = false;
      // post user information to backend /login route
      axios.post(currentHostedLink, value)
      .then(function (response) {
        console.log(response.data);
        if(response.data) { 
          validate = true;
          console.log("ID ===> ", response.data.id);
        } else {
          console.log("wrong pass");
          this.setState({status: { text: "I WILL CHANGE FOR YOU" }});
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

