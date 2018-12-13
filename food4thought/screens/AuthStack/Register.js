import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  AsyncStorage,
  TouchableHighlight,
} from "react-native";
import Image from "react-native-scalable-image";
import axios from "axios";
import RegisterStyles from "../styles/HomeStack/RegisterStyles.js";

// Import tcomb form schema
import t from "tcomb-form-native";
const Form = t.form.Form;

///////////////// Ngrok Link ///////////////////////////////////
 const currentHostedLink = "http://83c7f83b.ngrok.io";
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
  },
};

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = {
    title: "Please register!",
  };

  redirect(page) {
    this.props.navigation.navigate(page);
  }

  componentDidMount() {
    console.log("(register.js) token getting removed");
    AsyncStorage.setItem("sessionToken", "").then(() => {
      console.log("(register.js) async token removed");
    });
  }

  handleSubmit = () => {
    const that = this;
    const value = this._form.getValue(); // use that ref to get the form value
    console.log("REGISTER FORM ===> ", value);
    if (value) {
      // if validation fails, value will be null
      let validate = false;
      // post user information to backend /login route
      axios
        .post(`${currentHostedLink}/register`, value)
        .then(function(response) {
          console.log("RESPONSE ===> ", response.data.sessionToken);
          if (response.data.id < 0) {
            console.log("-1 from server something is wrong");
            that.setState({
              errorMessage: response.data.errorMessage,
            });
            //////////////// SET STATE OF ERROR HERE
          } else {
            AsyncStorage.setItem(
              "sessionToken",
              response.data.sessionToken,
            ).then(() => {
              console.log("SESSION TOKEN HAS BEEN STORED");
              that.props.screenProps.OnSessionChange();
            });
            validate = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(function() {
          console.log("VAIDATE ==> ", validate);
          if (validate) {
            that.props.screenProps.changePage("Profile");
          }
        });
    }
  };

  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={RegisterStyles.container}>
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
        <ScrollView style={RegisterStyles.scrollContainer}>
          <View
            style={{
              width: "100%",
              height: 100,
            }}
          />
          <View style={RegisterStyles.headerContainer}>
            <Text style={RegisterStyles.headerText}> Register </Text>
          </View>
          <View style={RegisterStyles.middleContainer}>
            <View style={RegisterStyles.formView}>
              <Form
                ref={c => (this._form = c)}
                type={Register}
                options={options}
              />
            </View>
          </View>
          <Text style={RegisterStyles.registerError}>
            {this.state.errorMessage}
          </Text>
          <View
            style={{
              width: "100%",
              height: 300,
            }}
          />
        </ScrollView>
        <View style={RegisterStyles.footerContainer}>
          <View style={RegisterStyles.registerTextView}>
            <Text
              adjustsFontSizeToFit={true}
              minimumFontScale={0.1}
              style={RegisterStyles.registerText}
            >
              You do want the gastronomic universe in your pocket!
            </Text>
          </View>
          <View style={RegisterStyles.buttonView}>
            <View style={RegisterStyles.registerButton}>
              <Button title="Register" onPress={this.handleSubmit} />
            </View>
          </View>
        </View>

        <TouchableHighlight
          underlayColor="#ffffff00"
          style={{
            position: "absolute",
            top: 28,
            left: 10,
            height: 45,
            width: 45,
            zIndex: 99,
            backgroundColor: "white",
            borderRadius: 35,
          }}
          onPress={() => goBack()}
        >
          <Image
            height={60}
            width={60}
            style={{
              position: "absolute",
              top: -6.5,
              left: -6.5,
              zIndex: 99,
              borderRadius: 35,
            }}
            source={require("../materials/arrow.png")}
          />
        </TouchableHighlight>
        {/* <View style={{ position: "absolute", width: "90%",height: "100%",backgroundColor: "rgba(248, 82, 96, 1)",zIndex: -10, borderLeftWidth: 0.7, borderRightWidth: 0.7,}} /> */}
      </View>
    );
  }
}
