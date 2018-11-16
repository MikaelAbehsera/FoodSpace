import React, {Component} from 'react';
import { Button, Text, View, ScrollView } from "react-native";

import HomeStyles from "../styles/HomeStack/HomeStyles.js";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={HomeStyles.container}>
        <ScrollView>
          <Text>Home!</Text>
        </ScrollView>
      </View>
    );
  }
}
