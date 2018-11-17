import React, {Component} from 'react';
import { Button, Text, View, ScrollView } from "react-native";
import axios from "axios";
import CreateStyles from "../styles/CreateStack/CreateStyles.js";

// Import tcomb form schema
import t from "tcomb-form-native";
const Form = t.form.Form;

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://2f92c577.ngrok.io";
///////////////////////////////////////////////////////////////


const Create = t.struct({
  username: t.String,
  email: t.String,
  profilePictureUrl: t.maybe(t.String),
  location: t.String,
  password: t.String,
  passwordConfirmation: t.String,
});

export default class CreateScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  redirect(page) {
    this.props.navigation.navigate(page)
  }

  handleSubmit = () => {
    const that = this;
    const value = this._form.getValue(); // use that ref to get the form value
    console.log("CREATE FORM ===> ", value);

    if (value) { // if validation fails, value will be null
      let validate = false;
      // post user information to backend /login route
      axios.post((`${currentHostedLink}/create`), value)
      .then(function (response) {
        console.log("success ===> ", response.data.success);
        if(response.data.success) { 
          validate = true;
        }
      })
      .catch(function (error) {
        console.log(error);
      }).finally(function() {
        if(validate) {
          setTimeout(() => { that.redirect("List") }, 200);
        }
      });
      
    }
  }

  render() {

    return (
      <View style={CreateStyles.container}>
        <Text>Create!</Text>
      </View>
    );
  }
}