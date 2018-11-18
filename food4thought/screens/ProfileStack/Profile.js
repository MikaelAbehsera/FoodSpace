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

    this.state = {};
  }

  componentDidMount() {
    const that = this;
    axios.get(`${currentHostedLink}/profile`)
      .then(function (response) {
        console.log(response.data.userProfile);
        that.setState({userProfile: response.data.userProfile});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={ProfileStyles.header}>
          <View style={ProfileStyles.profilePictureView}>
            <Image 
              style={ProfileStyles.header}
            />
          </View>
          <View style={ProfileStyles.headerDetails} >

          </View>
        </View>
        <ScrollView style={ProfileStyles.scrollView} >
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>
          <Text>I HAS SCROLLVIEW</Text>

        </ScrollView>
      </View>
    );
  }
}