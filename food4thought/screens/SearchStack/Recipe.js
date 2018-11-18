import React, {Component} from "react";
import PropTypes from "prop-types";
import { Button, Text, View, Image } from "react-native";

import RecipeStyles from "../styles/SearchStack/RecipeStyles.js";


export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={RecipeStyles.container}>

        <View style={RecipeStyles.leftView}>

          <View style={RecipeStyles.imgView} >
            <Image source={{ uri: this.props.recipe.recipeIMG }} style={RecipeStyles.img} />
          </View>

        </View>

        <View style={RecipeStyles.rightView}>

          <View style={RecipeStyles.header} >

            <View style={RecipeStyles.overall_rating} >
              <Text> {this.props.recipe.overall_rating} / 5</Text>
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
    );
  }
}

Recipe.propTypes = {
  recipe: PropTypes.object,
};