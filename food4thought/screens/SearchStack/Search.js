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

    this.state = {recipes: []};
  }

  componentDidMount() {
    const that = this;
    axios.get(`${currentHostedLink}/recipe_list`)
      .then(function (response) {
        // console.log(response.data.recipes);
        that.setState({recipes: response.data.recipes});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  
  categoryButtonGreasy = () => {
    const category = "Greasy";
    console.log(category);
    // SEND RELEVANT GET TO BACKEND TO GET NEW LIST
  }
  categoryButtonHealth = () => {
    const category = "Health Nut";
    console.log(category);
    // SEND RELEVANT GET TO BACKEND TO GET NEW LIST
  }
  categoryButtonMunchies = () => {
    const category = "Munchies";
    console.log(category);
    // SEND RELEVANT GET TO BACKEND TO GET NEW LIST
  }


  render() {

    const list = this.state.recipes.map((recipe, index) => <Recipe recipe={recipe} key={index}/>);
    
    return (
      <View style={SearchStyles.container}>
        <View style={SearchStyles.header}>
          <View style={SearchStyles.buttonContainer} > 
            <View style={SearchStyles.categoryButtonGreasy} >
              <Button
                title="Greasy"
                onPress={this.categoryButtonGreasy}
              />
            </View>
            <View style={SearchStyles.categoryButtonHealth} >
              <Button
                title="Health Nut"
                onPress={this.categoryButtonHealth}
              />
            </View>
            <View style={SearchStyles.categoryButtonMunchies} >
              <Button
                title="Munchies"
                onPress={this.categoryButtonMunchies}
              />
            </View>
          </View>
        </View>

        <ScrollView style={SearchStyles.scrollRecipesView}>
          {list}
        </ScrollView>
      </View>
    );
  }
}