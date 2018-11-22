import React, {Component} from "react";
import PropTypes from "prop-types";
import { Button, Text, View, Image, ScrollView, TouchableHighlight, AsyncStorage } from "react-native";
import {
  StyleSheet,
  PixelRatio
} from "react-native";
import { Dimensions } from 'react-native'; 
import axios from "axios";
import DetailsStyles from "../styles/SearchStack/DetailsStyles.js";

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://424fb32d.ngrok.io";
///////////////////////////////////////////////////////////////


export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.starFilled = require("../materials/star.png");
    this.starEmpty = require("../materials/660463.png");
    this.state = {star: this.starEmpty};
  }

  starChange = () => {
    let check = false;
    if(this.state.star === this.starFilled) {
      check = false;
      this.setState({star: this.starEmpty});
    } else if(this.state.star === this.starEmpty) {
      check = true;
      this.setState({star: this.starFilled});
    }
    console.log("check ==> ", check);

    this.checkStatus(check);
  }

  checkStatus(check) {
    const that = this;
    const send = { check: check, recipe_id: this.props.navigation.state.params.recipe.recipes_id};
    let sessionToken;
    //get full form from state, manipulate to one object, and post to backend
    AsyncStorage.getItem("sessionToken").then(
      (value) => {
        if(value) {
          sessionToken = value;
          send["sessionToken"] = value;
        }
        console.log("session token (details page) ===> ", sessionToken);
      }
    ).then(() => {
    let validate = false;
    // post user information to backend /login route
    axios.post((`${currentHostedLink}/fave`), send)
    .then(function (response) {
      console.log("full form submit success ===> ", response.data.success);
      if(response.data.success) { 
        validate = true;
      }
    })
    .catch(function (error) {
      console.log(error);
    }).finally(function() { 
      console.log("VAIDATE (details)==> ", validate)
    });
  });
  }



  render() {
    const starStyle = StyleSheet.create({
      star: {
        width: 37,
        height: 37,
        position: "absolute",
        // top: -40,
        // right: 20,
        zIndex: 100,
      },  
    });

    const { goBack } = this.props.navigation;
    const recipeData = this.props.navigation.state.params.recipe;
    return (
      <View style={DetailsStyles.container}>
        <View style={{width: "100%", height: 25, backgroundColor: "black"}} />
        <View style={DetailsStyles.imageView} >
          <Image 
            style={DetailsStyles.image} 
            source={{ uri: recipeData.recipeIMG ? recipeData.recipeIMG : "https://media.giphy.com/media/3o6Zt1s75ToFZ0a9va/source.gif" }} 
          />
        </View>
        <TouchableHighlight underlayColor="#ffffff00" style={DetailsStyles.funcs} onPress={this.starChange}>
          <Image style={starStyle.star} source={this.state.star} />
        </TouchableHighlight> 

        <TouchableHighlight underlayColor="#ffffff00" style={DetailsStyles.backButton} onPress={() => goBack()}>
        <Image style={DetailsStyles.backArrow} source={require("../materials/arrow.png")} />
        </TouchableHighlight> 

        
        <ScrollView style={DetailsStyles.scrollView}>


          <View style={DetailsStyles.infoView} >

          </View>

        </ScrollView>
        <Image source={require("../materials/food.gif")} height={Dimensions.get('window').height + 50} style={{ position:'absolute', flex: 1, zIndex: -10,}} />
      </View>      
    );
  }

}