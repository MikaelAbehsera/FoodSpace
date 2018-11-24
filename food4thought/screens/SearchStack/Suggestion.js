import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  Image,
  AsyncStorage,
  TouchableHighlight,
} from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet, PixelRatio } from "react-native";
import SuggestionStyles from "../styles/SearchStack/SuggestionStyles.js";
import axios from "axios";

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://e9bf0500.ngrok.io";
///////////////////////////////////////////////////////////////

export default class ReviewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <View style={SuggestionStyles.container}>
      
      </View>
    );
  }
}
