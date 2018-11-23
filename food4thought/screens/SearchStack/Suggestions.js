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
const currentHostedLink = "http://02fa9f65.ngrok.io";
///////////////////////////////////////////////////////////////

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {compLoaded: false, suggestions: []};
  }

  componentDidMount() {
    this.loadSuggesitons();
  }
  
  loadSuggesitons = () => {
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
    axios.get(`${currentHostedLink}/suggestions/${recipe_id}/${sessionToken}`)
      .then(function (response) {
        console.log("GETTING Suggestions")
        // console.log(response.data.suggestions);
        // reset page load
        that.setState({compLoaded: false, recipes: that.state.suggestions});
        // set state to new object
        that.setState({compLoaded: true, recipes:  response.data.suggestions});
        // state load finsished set new state
        that.setState({compLoaded: true, recipes: that.state.suggestions});
      })
      .catch(function (error) {
        console.log(error);
      });
    });
  }

  render() {  
    const {navigate} = this.props.navigation;

    if(this.state.compLoaded) {
    // const list = this.state.suggestions.map((sug, index) => <Recipe navigate={navigate} recipe={recipe} key={index}/>);

    return (
      <View style={SearchStyles.container}>
        
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