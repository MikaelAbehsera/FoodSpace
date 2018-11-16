import React, {Component} from 'react';
import { Button, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Profile!</Text>
      </View>
    );
  }
}