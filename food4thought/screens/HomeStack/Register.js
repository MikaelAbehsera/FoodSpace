import React, { Component } from "react";
import { Button, Text, View } from "react-native";

import RegisterStyles from "../styles/HomeStack/RegisterStyles.js";

export default class RegisterScreen extends React.Component {
  render() {
    return (
      <View style={RegisterStyles.container}>
        <Text>Register!</Text>
      </View>
    );
  }
}
