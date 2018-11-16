import React, {Component} from 'react';
import { Button, Text, View, ScrollView } from "react-native";
// Import login styles module
import LoginStyles from "../styles/HomeStack/LoginStyles.js";


export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={LoginStyles.container} >

        <View style={LoginStyles.titleView}>
          <Text>Login page</Text>
        </View>

        <View style={LoginStyles.titleView}>
          <Text>I am Middle</Text>
        </View>


        <View style={LoginStyles.registerView}>
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
