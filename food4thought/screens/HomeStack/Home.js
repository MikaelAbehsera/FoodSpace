import React, {Component} from 'react';
import { Button, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home!</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
        <Button
          title="Register"
          onPress={() => this.props.navigation.navigate("Register")}
        />
      </View>
    );
  }
}
