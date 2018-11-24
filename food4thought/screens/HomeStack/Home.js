import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  Image,
  AsyncStorage,
  Dimensions,
} from "react-native";

import HomeStyles from "../styles/HomeStack/HomeStyles.js";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={HomeStyles.container}>
        <View style={{ width: "100%", height: 25, backgroundColor: "black" }} />
        <ScrollView>
          <Text>Home!</Text>
          <Text>Home!</Text>
          <Text>Home!</Text>
          <Text>Home!</Text>
          <Text>Home!</Text>
          <Text>Home!</Text>
          <Text>Home!</Text>
          <Text>Home!</Text>
        </ScrollView>
        {this.props.screenProps.Nav}
      </View>
    );
  }
}
