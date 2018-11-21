import React, {Component} from "react";
import PropTypes from "prop-types";
import { Button, Text, View, Image, TouchableHighlight } from "react-native";
import {
  StyleSheet,
  PixelRatio
} from "react-native";

import RecipeStyles from "../styles/SearchStack/RecipeStyles.js";


export default class Recipe extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    // SET STYLE SHEET
    let right = {
      flex:1,
      height: 126.5,
      borderLeftWidth: 2,
      borderBottomEndRadius: 8,
      borderTopEndRadius: 8,
      borderLeftColor: "black",
    };
    
    // ADD DIFF COLOR
    right["backgroundColor"] = this.props.color;

    // MAKE INTO JSON STYLESHEET THEN CALL IN VIEW
    const rightStyle = StyleSheet.create({
      rightView: right
    });
    
    // <TouchableHighlight onPress={() => console.log("PRESS")} >
    return (
      <TouchableHighlight onPress={() => this.props.navigate("Details", {recipe: this.props.recipe})} >

        <View style={RecipeStyles.container}>
          <View style={RecipeStyles.leftView}>

            <View style={RecipeStyles.imgView} >
              <Image source={{ uri: this.props.recipe.recipeIMG ? this.props.recipe.recipeIMG : "https://media.giphy.com/media/3o6Zt1s75ToFZ0a9va/source.gif" }} style={RecipeStyles.img} />
            </View>

          </View>

          <View style={rightStyle.rightView}>

            <View style={RecipeStyles.header} >

              <View style={RecipeStyles.name} >
                <Text> {this.props.recipe.name}</Text>
              </View>

            </View>

            <View style={RecipeStyles.middle} >

              <View style={RecipeStyles.overall_rating} >
                <Text> {this.props.recipe.overall_rating ? `Overall Rating ${this.props.recipe.overall_rating} / 5` : "N/A"}</Text>
              </View>

              <View style={RecipeStyles.time} >
                <Text> {this.props.recipe.time} Mintues</Text>
              </View>

            </View>


            <View style={RecipeStyles.footer} >
              <View style={ RecipeStyles.descriptionView } >
                <Text style={ RecipeStyles.description } > { this.props.recipe.description } </Text>
              </View>
            </View>

          </View>
        
        </View>
      </TouchableHighlight>
    );
  }
}

Recipe.propTypes = {
  recipe: PropTypes.object,
  color: PropTypes.string,
};