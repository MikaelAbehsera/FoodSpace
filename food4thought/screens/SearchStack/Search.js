import React, {Component} from 'react';
import { Button, Text, View, ScrollView } from "react-native";

import SearchStyles from "../styles/SearchStack/SearchStyles.js";
import Recipe from "./Recipe.js";
import axios from "axios";

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://2f92c577.ngrok.io";
///////////////////////////////////////////////////////////////



export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {recipes: [{}] };
  }

  componentDidMount() {
    axios.get(`${currentHostedLink}/recipe_list`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {

    // const recipe = {};
  
    return (
      <View style={SearchStyles.container}>
        <ScrollView style={SearchStyles.scrollRecipesView}>
          {/* <Recipe recipe={this.recipe}/> */}
        </ScrollView>
      </View>
    );
  }
}