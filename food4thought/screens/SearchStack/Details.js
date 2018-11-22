import React, {Component} from "react";
import PropTypes from "prop-types";
import { Button, Text, View, Image, ScrollView, TouchableHighlight } from "react-native";
import {
  StyleSheet,
  PixelRatio
} from "react-native";
import { Dimensions } from 'react-native'; 
import DetailsStyles from "../styles/SearchStack/DetailsStyles.js";
export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.starFilled = require("../materials/star.png");
    this.starEmpty = require("../materials/660463.png");
    this.state = {star: this.starEmpty};
  }

  starChange = () => {
    if(this.state.star === this.starFilled) {
       this.setState({star: this.starEmpty});
    } else if(this.state.star === this.starEmpty) {
      this.setState({star: this.starFilled});
    }
  }

  render() {
    console.log("height ===> ", Dimensions.get('window').height);
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
        <ScrollView style={DetailsStyles.scrollView}>


          <View style={DetailsStyles.infoView} >

          </View>

        </ScrollView>
        <Image source={require("../materials/food.gif")} height={Dimensions.get('window').height + 50} style={{ position:'absolute', flex: 1, zIndex: -10,}} />
        {/* <Image source={require("../materials/food.gif")} height={Dimensions.get('window').height + 50} style={{ position: "absolute", flex: 1, zIndex: -10, top: 180,}} /> */}
      </View>      
    );
  }

}