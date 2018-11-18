import React, {Component} from 'react';
import { Button, Text, View, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfileStyles from "../styles/ProfileStack/ProfileStyles.js";
import axios from "axios";

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://2f92c577.ngrok.io";
///////////////////////////////////////////////////////////////

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { compLoaded: false, userProfile: {}};
  }

  componentDidMount() {
    const that = this;
    axios.get(`${currentHostedLink}/profile`)
      .then(function (response) {
        // reset page load
        that.setState({ compLoaded: false, userProfile: that.state.userProfile });
        // set state to new object
        that.setState({ userProfile: response.data.userProfile });
        // state load finsished set new state
        that.setState({ compLoaded: true, userProfile: that.state.userProfile });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  render() {

    
    if(this.state.compLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={ProfileStyles.header}>
            <View style={ProfileStyles.headerLeft}>
              <View style={ProfileStyles.profilePictureView}>
                <Image 
                  style={ProfileStyles.profilePicture}
                  // source={{uri: this.state.userProfile.profileIMG}}
                  source={{uri: "https://yt3.ggpht.com/a-/ACSszfEdgh-wnNd6QHJppYBHMo1wiWAL5h_R6DFDHA=s900-mo-c-c0xffffffff-rj-k-no"}}
                />
              </View>
            </View>
            <View style={ProfileStyles.headerRight} >
              <View style={ProfileStyles.headerDetails} >
                <View style={ProfileStyles.headerDetailsTop}>
                  <Text>{this.state.userProfile.userInfo.username}</Text>
                </View>
                <View style={ProfileStyles.headerDetailsMiddle}>
                  <Text>{this.state.userProfile.userInfo.location}</Text>
                </View>
                <View style={ProfileStyles.headerDetailsBottom}>
                  <Text>{this.state.userProfile.userInfo.email}</Text>
                </View>
              </View>
            </View>
  
          </View>
          <ScrollView style={ProfileStyles.scrollView} >
            <Text>A text</Text>
          </ScrollView>
        </View>
      );
    } else {
      return (<Text>Loading</Text>);
    }
  }
}