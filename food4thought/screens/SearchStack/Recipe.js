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

    this.state = { 
      clocks: [],
      stars: [],
    }
  }


  clockCalculator = () => {
    const count = 0;
    // for every 15 min add a clock, but max is 3 clocks
    
    // for(let i = 0; i < count; i++) {
    //   this.setState({ 
    //     clocks: this.state.clocks,
    //     stars: [],
    //   });
    // }
  }
  renderStars() {
    const starArr = [];
    for(let i = 0; i < this.props.recipe.overall_rating; i++) {
      starArr.push(<Image key={i} source={require("../materials/star.png")} style={RecipeStyles.star}/>);
    }
    return starArr;
  }

  componentDidMount() {
 
  }


  render() {

    // SET STYLE SHEET
    let right = {
      flex:1,
      minHeight: 50,
    };
    
    // ADD DIFF COLOR
    // right["backgroundColor"] = this.props.color; 
    right["backgroundColor"] = "white";

    // MAKE INTO JSON STYLESHEET THEN CALL IN VIEW
    const infoStyle = StyleSheet.create({
      infoView: right
    });
  
    return (
      <TouchableHighlight underlayColor="#ffffff00" onPress={() => this.props.navigate("Details", {recipe: this.props.recipe})} >

        <View style={RecipeStyles.container}>
          <View style={RecipeStyles.backgroundView}>
            <View style={RecipeStyles.imgView} >
              <Image source={{ uri: this.props.recipe.recipeIMG ? this.props.recipe.recipeIMG : "https://media.giphy.com/media/3o6Zt1s75ToFZ0a9va/source.gif" }} style={RecipeStyles.img} />
            </View>
          </View>



          <View style={infoStyle.infoView}>

            <View style={RecipeStyles.header} >
              <View style={RecipeStyles.name} >
                <Text style={RecipeStyles.nameText} > {this.props.recipe.name}</Text>
              </View>

              <View style={RecipeStyles.overall_rating} >
                {this.state.clocks}
              </View>

              <View style={RecipeStyles.time} >
                {this.renderStars()}
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