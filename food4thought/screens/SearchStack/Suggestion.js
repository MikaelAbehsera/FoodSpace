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

export default class Suggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: this.props.comment.suggest_text,
      name: this.props.comment.username,
      img: { uri: (this.props.comment.profileIMG !== "blank") ? this.props.comment.profileIMG : "https://yt3.ggpht.com/a-/ACSszfEdgh-wnNd6QHJppYBHMo1wiWAL5h_R6DFDHA=s900-mo-c-c0xffffffff-rj-k-no" }
    };
  }

  render() {
    console.log("STATE STATE STATE ===> ", this.state);
    return (
      <View style={SuggestionStyles.container}>
        <View style={SuggestionStyles.messageContainer}>
          {/* <View style={{borderBottomWidth: 0.5, borderBottomColor: "grey", paddingRight: 20, flexDirection: "row"}}> */}
          <Image style={{height: 15, width: 15, marginRight: 5, borderRadius: 10}} source={this.state.img} />
          <Text> {this.state.name}</Text>          
          {/* </View> */}
        </View>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", width: "100%", marginRight: 10, marginLeft: 42,}} >
          <View style={{ marginRight: 10, }} >
            <Text style={{ fontSize: 20, fontWeight: "300", }} >{this.state.text}</Text>
          </View>
        </View>
      </View>
    );
  }
}
