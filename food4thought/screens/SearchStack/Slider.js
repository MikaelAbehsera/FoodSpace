import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Image, TouchableHighlight, Slider, AsyncStorage} from "react-native";
import ScaledImage from "react-native-scaled-image";
import axios from "axios";


///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://e9bf0500.ngrok.io";
////////////////////////////////////////////////////////////////

export default class StarSlider extends Component {
  constructor(props) {
    super(props);
    this.star = require("../materials/star.png");
    this.greyStar = require("../materials/greyStar.png");

    this.state = {
      star1: this.greyStar,
      star2: this.greyStar,
      star3: this.greyStar,
      star4: this.greyStar,
      star5: this.greyStar,
    };
  }

  starClick = (rating) => {
    // if star n is clicked, 
    // make all stars behind it also yellow/filled
    // send post to backend each time the star rating changes
    const sentObject = {
      recipeId: this.props.recipeId,
      rating: rating
    };
    let sessionToken;
    //get full form from state, manipulate to one object, and post to backend
    AsyncStorage.getItem("sessionToken")
      .then(value => {
        if (value) {
          sessionToken = value;
          sentObject["sessionToken"] = value;
        }
        console.log("session token (slider component) ===> ", sessionToken);
      })
      .then(() => {
        let validate = false;
        axios
          .post(`${currentHostedLink}/ratings`, sentObject)
          .then(function(response) {
            console.log(
              "(slider comp) success ===> ",
              response.data.success,
            );
            if (response.data.success) {
              validate = true;
            }
          })
          .catch(function(error) {
            console.log(error);
          })
          .finally(function() {
            console.log("(slider comp) VAIDATE ==> ", validate);
          }); 
      });
  };


  render() {
    return (
      <View
        style={{
          width: "45%",
          height: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          top: 4,
          left: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >

          <TouchableHighlight onPress={()=>this.starClick(1)} underlayColor="#ffffff00" >
            <Image source={this.state.star1} style={{ height: 30, width:  30}} />
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.starClick(2)} underlayColor="#ffffff00" >
            <Image source={this.state.star2} style={{ height: 30, width:  30}} />
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.starClick(3)} underlayColor="#ffffff00" >
            <Image source={this.state.star3} style={{ height: 30, width:  30}} />
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.starClick(4)} underlayColor="#ffffff00" >
            <Image source={this.state.star4} style={{ height: 30, width:  30}} />
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.starClick(5)} underlayColor="#ffffff00" >
            <Image source={this.state.star5} style={{ height: 30, width:  30}} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
