import React, {Component} from 'react';
import { Button, Text, View, ScrollView, Image, AsyncStorage } from "react-native";
import { Dimensions } from 'react-native'; 
import {
  StyleSheet,
  PixelRatio
} from "react-native";
import SearchStyles from "../styles/SearchStack/SearchStyles.js";
import Recipe from "./Recipe.js";
import axios from "axios";

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://424fb32d.ngrok.io";
///////////////////////////////////////////////////////////////


export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {compLoaded: false, recipes: []};
  }

  componentDidMount() {
    this.categoryButtonAll();
  }
  
  categoryButtonAll = () => {
    let sessionToken;

    AsyncStorage.getItem("sessionToken").then(
      (value) => {
        if(value) {
          sessionToken = value;
        }
        console.log("session token ===> ", value);
      }
    ).then(() => {
    const that = this;
    axios.get(`${currentHostedLink}/recipe_list/${sessionToken}`)
      .then(function (response) {
        console.log("GETTING RECIPES")
        // console.log(response.data.allRecipes);
        // reset page load
        that.setState({compLoaded: false, recipes: that.state.recipes});
        // set state to new object
        that.setState({compLoaded: true, recipes:  response.data.allRecipes});
        // state load finsished set new state
        that.setState({compLoaded: true, recipes: that.state.recipes});
      })
      .catch(function (error) {
        console.log(error);
      });
    });
  }

  categoryButtonGreasy = () => {
    const category = "Greasy";
    console.log(category);
    this.categoryButtonPress(category)
  }
  categoryButtonHealth = () => {
    const category = "Health nut";
    console.log(category);
    this.categoryButtonPress(category)
  }
  categoryButtonMunchies = () => {
    const category = "Munchies";
    console.log(category);
    this.categoryButtonPress(category)
  }


  categoryButtonPress = (categoryName) => {
    const that = this;
    axios.get(`${currentHostedLink}/list/${categoryName}`)
    .then(function (response) {
      console.log(`GETTING DIS RECIPE CAT ===> ${categoryName}`)
      // console.log(response.data.allRecipes);
      // reset page load

      that.setState({compLoaded: false, recipes: that.state.recipes});
      // set state to new object

      that.setState({compLoaded: true, recipes:  response.data.allRecipes});
      // state load finsished set new state
      
      that.setState({compLoaded: true, recipes: that.state.recipes});
    })
    .catch(function (error) {
      console.log(error);
    });

  }



  render() {
    
    function diffstyle(diff) {
      let style;
      if(diff === 3) {
        style = "red"
      } else if(diff === 2) {
        style = "yellow"
      } else if(diff === 1) {
        style = "green"
      }

    return style;
    }
    
    const {navigate} = this.props.navigation;

    if(this.state.compLoaded) {
    const list = this.state.recipes.map((recipe, index) => <Recipe navigate={navigate} recipe={recipe} color={diffstyle(recipe.difficulty)} key={index}/>);

    return (
      <View style={SearchStyles.container}>
        <View style={{width: "100%", height: 25, backgroundColor: "black",}} />
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
            <View style={SearchStyles.categoryButtonAll} >
              <Button
                title="All"
                onPress={this.categoryButtonAll}
              />
            </View>
          </View>
        </View>

        <ScrollView style={SearchStyles.scrollRecipesView}>
          <View style={{width: "100%", height: 10}} />
          {list}
          <View style={{width: "100%", height: 200}} />
        </ScrollView>
        <Image source={require("../materials/foodBlurred.gif")} height={Dimensions.get('window').height + 1000} style={{ position: "absolute", zIndex: -10,}} />
        {this.props.screenProps.Nav}
      </View>
    );
  }  else {
    return (
      <View style={{ flex: 1, backgroundColor: "#CED3DC", flexDirection: "column", justifyContent: "center", backgroundColor: "#24CCF9",}}>
        <Image source={require("../materials/loading.gif")} height={Dimensions.get('window').height + 50} style={{ position: 'absolute', width: "100%", zIndex: -10,}} />          
        <View style={{ flexDirection: "row", justifyContent: "center"}}>
        </View>
      </View>);
  }
}
}