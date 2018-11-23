import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  AsyncStorage,
} from "react-native";
import { StyleSheet, PixelRatio } from "react-native";
import { Dimensions } from "react-native";
import axios from "axios";
import DetailsStyles from "../styles/SearchStack/DetailsStyles.js";
import CollapseStyles from "../styles/SearchStack/CollapseStyles.js";
import Recipe from "./Recipe.js";
import CollapseView from "react-native-collapse-view";
import ScaledImage from "react-native-scaled-image";

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://e9bf0500.ngrok.io";
///////////////////////////////////////////////////////////////

class CollapseDetails extends Component {
  _renderTensionViewIngredients = collapse => {
    return (
      <View style={CollapseStyles.view}>
        <ScaledImage
          source={require("../materials/redtab.png")}
          height={43}
          style={{ position: "absolute", bottom: -2 }}
        />
        <Text
          style={{
            position: "absolute",
            top: 14,
            left: 32,
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Ingredients
        </Text>
      </View>
    );
  };
  _renderCollapseViewIngredients = collapse => {
    return (
      <View style={CollapseStyles.collapseView}>
        {this.props.ingredients.map((ing, i) => (
          <Text key={i} style={CollapseStyles.ingredientsText}>
            {ing.quantity} of {ing.food_type}.
          </Text>
        ))}
      </View>
    );
  };

  _renderTensionViewInstructions = collapse => {
    return (
      <View style={CollapseStyles.view}>
        <ScaledImage
          source={require("../materials/redtab.png")}
          height={43}
          style={{ position: "absolute", bottom: -2 }}
        />
        <Text
          style={{
            position: "absolute",
            top: 14,
            left: 32,
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Instructions
        </Text>
      </View>
    );
  };
  _renderCollapseViewInstructions = collapse => {
    return (
      <View style={CollapseStyles.collapseView}>
        {this.props.instructions.map((ins, i) => (
          <Text key={i} style={CollapseStyles.instructionsText}>
            {ins.step_number}. {ins.step_description}.
          </Text>
        ))}
      </View>
    );
  };

  render() {
    return (
      <View style={CollapseStyles.container}>
        <CollapseView
          tension={100}
          renderView={this._renderTensionViewIngredients}
          renderCollapseView={this._renderCollapseViewIngredients}
        />
        <CollapseView
          tension={100}
          renderView={this._renderTensionViewInstructions}
          renderCollapseView={this._renderCollapseViewInstructions}
        />
      </View>
    );
  }
}

class StarSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.star = require("../materials/star.png");
    this.greyStar = require("../materials/greyStar.png");
  }

  render() {
    return (
      <View
        style={{
          width: "45%",
          height: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          top: 10,
          left: 10,
        }}
      >
        <Image source={this.star} style={{ height: 20, width: 20 }} />
        <Image source={this.star} style={{ height: 20, width: 20 }} />
        <Image source={this.star} style={{ height: 20, width: 20 }} />
        <Image source={this.greyStar} style={{ height: 20, width: 20 }} />
        <Image source={this.greyStar} style={{ height: 20, width: 20 }} />
      </View>
    );
  }
}

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.starFilled = require("../materials/star.png");
    this.starEmpty = require("../materials/660463.png");
    this.state = {
      star: this.starEmpty,
      stars: [],
      faveStatus: false,
      compLoaded: false,
    };
    this.getFaveStatus = this.getFaveStatus.bind(this);
  }

  getFaveStatus() {
    let sessionToken;

    AsyncStorage.getItem("sessionToken")
      .then(value => {
        if (value) {
          sessionToken = value;
        }
        // console.log("session token ===> ", value);
      })
      .then(() => {
        const that = this;
        axios
          .get(
            `${currentHostedLink}/heart/${sessionToken}/${
              this.props.navigation.state.params.recipe.recipes_id
            }`,
          )
          .then(function(response) {
            console.log("GETTING state before ===> ", that.state);
            // console.log(response.data.faveStatus);
            // reset page load
            that.setState({
              compLoaded: false,
              star: that.state.star,
              stars: that.state.stars,
              faveStatus: that.state.faveStatus,
            });
            // set state to new object
            that.setState({
              compLoaded: false,
              star: that.state.star,
              stars: that.state.stars,
              faveStatus: response.data.faveStatus,
            });
            // state load finsished set new state
            that.setState({
              compLoaded: true,
              star: that.state.star,
              stars: that.state.stars,
              faveStatus: that.state.faveStatus,
            });
            console.log("GETTING state after ===> ", that.state);
          })
          .catch(function(error) {
            console.log(error);
          })
          .finally(() => {
            console.log("finally");
            if (that.state.faveStatus) {
              that.setState({
                compLoaded: that.state.compLoaded,
                star: that.starFilled,
                stars: that.state.stars,
                faveStatus: that.state.faveStatus,
              });
            }
          });
      });
  }

  componentDidMount() {
    this.getFaveStatus();
  }

  starChange = () => {
    let check = this.state.faveStatus;
    if (this.state.star === this.starFilled) {
      check = false;
      this.setState({ star: this.starEmpty, stars: this.state.stars });
    } else if (this.state.star === this.starEmpty) {
      check = true;
      this.setState({ star: this.starFilled, stars: this.state.stars });
    }
    this.checkStatus(check);
  };

  checkStatus(check) {
    const that = this;
    const send = {
      check: check,
      recipe_id: this.props.navigation.state.params.recipe.recipes_id,
    };
    let sessionToken;
    //get full form from state, manipulate to one object, and post to backend
    AsyncStorage.getItem("sessionToken")
      .then(value => {
        if (value) {
          sessionToken = value;
          send["sessionToken"] = value;
        }
        console.log("session token (details page) ===> ", sessionToken);
      })
      .then(() => {
        let validate = false;
        // post user information to backend /login route
        axios
          .post(`${currentHostedLink}/fave`, send)
          .then(function(response) {
            console.log(
              "full form submit success ===> ",
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
            console.log("VAIDATE (details)==> ", validate);
          });
      });
  }

  render() {
    const starStyle = StyleSheet.create({
      star: {
        width: 37,
        height: 37,
        position: "absolute",
        zIndex: 100,
      },
    });

    const { goBack } = this.props.navigation;
    const recipeData = this.props.navigation.state.params.recipe;

    if (this.state.compLoaded) {
      return (
        <View style={DetailsStyles.container}>
          <View
            style={{ width: "100%", height: 25, backgroundColor: "black" }}
          />
          <View style={DetailsStyles.imageView}>
            <Image
              style={DetailsStyles.image}
              source={{
                uri: recipeData.recipeIMG
                  ? recipeData.recipeIMG
                  : "https://media.giphy.com/media/3o6Zt1s75ToFZ0a9va/source.gif",
              }}
            />
          </View>
          <TouchableHighlight
            underlayColor="#ffffff00"
            style={DetailsStyles.funcs}
            onPress={this.starChange}
          >
            <Image style={starStyle.star} source={this.state.star} />
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="#ffffff00"
            style={{
              position: "absolute",
              top: 28,
              left: 10,
              height: 45,
              width: 45,
              zIndex: 99,
              backgroundColor: "white",
              borderRadius: 35,
            }}
            onPress={() => goBack()}
          >
            <Image
              style={{
                position: "absolute",
                top: -5.5,
                left: -5.5,
                height: 60,
                width: 60,
                zIndex: 99,
                borderRadius: 35,
              }}
              source={require("../materials/arrow.png")}
            />
          </TouchableHighlight>

          <View
            style={{
              width: "45%",
              height: 40,
              backgroundColor: "rgba(255,255,255, 0.5)",
              position: "absolute",
              top: Dimensions.get("window").width / 1.5 - 25,
              right: 10,
              borderRadius: 40,
            }}
          >
            <StarSlider />
          </View>

          <ScrollView style={DetailsStyles.scrollView}>
            <View style={DetailsStyles.infoView}>
              {/* 
          - collapsable views for details, ingredients, and instructions
          - slidable 5 star review, if 4th is clicked all 4 get yellow
          - button that when clicked take user to the review page
        */}
              <View style={DetailsStyles.nameView}>
                <Text style={DetailsStyles.nameText}>{recipeData.name}</Text>
              </View>

              <CollapseDetails
                ingredients={recipeData.ingredients}
                instructions={recipeData.instructions}
              />
            </View>
          </ScrollView>
          <Image
            source={require("../materials/food.gif")}
            height={Dimensions.get("window").height + 50}
            style={{ position: "absolute", flex: 1, zIndex: -10 }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#CED3DC",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#24CCF9",
          }}
        >
          <Image
            source={require("../materials/loading.gif")}
            height={Dimensions.get("window").height + 50}
            style={{ position: "absolute", width: "100%", zIndex: -10 }}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }} />
        </View>
      );
    }
  }
}
