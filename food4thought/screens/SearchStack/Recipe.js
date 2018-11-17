import React, {Component} from 'react';
import { Button, Text, View } from "react-native";

import RecipeStyles from "../styles/SearchStack/RecipeStyles.js";


export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={RecipeStyles.container}>
        <Text>I am a recipe</Text>
      </View>
    );
  }
}