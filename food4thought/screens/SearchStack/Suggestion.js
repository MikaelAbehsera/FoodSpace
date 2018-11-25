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
      img: { uri: (this.props.comment.profileIMG !== "blank") ? this.props.comment.profileIMG : "https://yt3.ggpht.com/a-/ACSszfEdgh-wnNd6QHJppYBHMo1wiWAL5h_R6DFDHA=s900-mo-c-c0xffffffff-rj-k-no" },
      minus: this.props.comment.minus,
      plus: this.props.comment.plus,
    };
  }

  plus = () => {
  console.log("plus");
  }

  minus = () => {
  console.log("minus");
  }

  render() {
    // console.log("STATE STATE STATE ===> ", this.state);
    return (
      <View style={SuggestionStyles.container}>
        <View style={SuggestionStyles.messageContainer}>
          <Image style={{height: 18, width: 18, marginRight: 5, borderRadius: 10}} source={this.state.img} />
          <Text> {this.state.name}</Text>          

          <View style={{flexDirection: "row", justifyContent: "flex-end", flex:1,}} >
            
            <View style={{marginLeft: 5, marginRight: 5,}}>
              <Text>{this.state.plus}</Text>
            </View>
            
            <TouchableHighlight onPress={()=> this.plus()} style={{width: 20, height: 20,}} ><Image style={{width: 20, height: 20,}} source={require("../materials/upColor.png")} /></TouchableHighlight>
            
            <View style={{marginLeft: 5, marginRight: 5,}}>
              <Text>{this.state.minus}</Text>
            </View>

            <TouchableHighlight onPress={()=> this.minus()} style={{width: 20, height: 20,}} ><Image style={{width: 20, height: 20,}} source={require("../materials/downColor.png")} /></TouchableHighlight>
          </View>

        </View>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", width: "90%", marginRight: 10, marginLeft: 42,}} >
          <View style={{ marginRight: 10, }} >
            <Text style={{ fontSize: 20, fontWeight: "300", flexWrap: 'wrap'}} >{this.state.text}</Text>
          </View>
        </View>
      </View>
    );
  }
}
