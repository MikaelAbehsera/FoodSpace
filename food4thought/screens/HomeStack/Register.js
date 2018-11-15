import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import RegisterStyles from "../styles/HomeStack/RegisterStyle.js";

export default class RegisterScreen extends React.Component {
  render() {
    return (
      <View style={RegisterStyles.container}>
        <Text>Register!</Text>
      </View>
    );
  }
}
