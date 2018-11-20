import React, {Component} from 'react';
import { Button, Text, View, ScrollView, Image, AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfileStyles from "../styles/ProfileStack/ProfileStyles.js";
import axios from "axios";

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://2f92c577.ngrok.io";
///////////////////////////////////////////////////////////////

class Bubble extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View style={ProfileStyles.bubbleView} >
        <Text>"{this.props.name}" {this.props.created ? <Text>by {this.props.created}.</Text> : null}</Text>
      </View>
    );
  }
}


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { compLoaded: false, userProfile: {}};
  }
  
  static navigationOptions = {
    title: "Profile",
  };
  
  
  componentDidMount() {
    const that = this;
    axios.get(`${currentHostedLink}/profile`)
    .then(function (response) {
      // reset page load
      that.setState({ compLoaded: false, userProfile: that.state.userProfile });
      // set state to new object
      that.setState({ compLoaded: false, userProfile: response.data.userProfile });
      // state load finsished set new state
      that.setState({ compLoaded: true, userProfile: that.state.userProfile });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  signout = () => {
    const that = this;
    AsyncStorage.setItem("sessionToken", "").then(
      () => {
        console.log("hello");
        that.props.screenProps.OnSessionChange()
      })
    
      that.props.screenProps.changePage("Home")
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

            <View style={ProfileStyles.createdContainer}>
              <View><Text>Recipes you created</Text></View>
              <View style={ProfileStyles.createdView}> 
                {this.state.userProfile.recipesCreated.map((recipe, i) => <Bubble key={i} name={recipe.name} ></Bubble>)}
              </View>
            </View>


            <View style={ProfileStyles.favesContainer}>
              <View><Text>Recipes you favortited</Text></View>
              <View style={ProfileStyles.favesView}> 
                {this.state.userProfile.faves.map((fave, i) => <Bubble key={i} name={fave.name} created={fave.creator_id} ></Bubble>)}
              </View>
            </View>
            
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am jifreifjerifhefuihrhuferheifhifuherhufeuhfuii</Text>
            <Text>I am bottom</Text>
          </ScrollView>
          <View style={ProfileStyles.signoutButton} >
            <Button 
              title="Signout"
              onPress={this.signout}
              color="red"
            />
          </View>

          {this.props.screenProps.Nav}
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "#CED3DC", flexDirection: "column", justifyContent: "center"}}>
          <View style={{ flexDirection: "row", justifyContent: "center"}}>
            <Text style={{color: "#4392F1", fontWeight: "900", fontSize: 85, }} >Loading . . .</Text>
          </View>
        </View>);
    }
  }
}