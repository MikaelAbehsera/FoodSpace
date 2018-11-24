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
import ScaledImage from "react-native-scaled-image";
import CollapseDetails from "./Collapse.js";
import CollapseStyles from "../styles/SearchStack/CollapseStyles.js";
import StarSlider from "./Slider.js";

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://e9bf0500.ngrok.io";
////////////////////////////////////////////////////////////////

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.heartFilled = require("../materials/heartFilled.png");
    this.heartEmpty = require("../materials/heartEmpty.png");
    this.state = {
      star: this.heartEmpty,
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
                star: that.heartFilled,
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
    if (this.state.star === this.heartFilled) {
      check = false;
      this.setState({ star: this.heartEmpty, stars: this.state.stars });
    } else if (this.state.star === this.heartEmpty) {
      check = true;
      this.setState({ star: this.heartFilled, stars: this.state.stars });
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
    // console.log("RECIPE DATA RECIPE DATA RECIPE DATA ===> ", recipeData);
    console.log("RECIPE DATA RECIPE DATA RECIPE DATA ===> ", this.props.navigate);
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
                top: -6.5,
                left: -6.5,
                height: 60,
                width: 60,
                zIndex: 99,
                borderRadius: 35,
              }}
              source={require("../materials/arrow.png")}
            />
          </TouchableHighlight>

           <TouchableHighlight
            underlayColor="#ffffff00"
            style={{
              position: "absolute",
              top: 28,
              right: 10,
              height: 60,
              width: 60,
              zIndex: 99,
              borderRadius: 25,
            }}
            onPress={() => {
              this.props.navigation.state.params.navigate("Reviews", {hi: "hi"})
              console.log("hi");
          }}
          >
            <Image
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                height: 50,
                width: 50,
                zIndex: 99,
              }}
              source={require("../materials/reviews.png")}
            />
          </TouchableHighlight>


          <View
            style={{
              width: "60%",
              height: 40,
              backgroundColor: "rgba(255,255,255, 0.7)",
              position: "absolute",
              top: Dimensions.get("window").width / 1.5 - 25,
              right: 10,
              borderRadius: 40,
            }}
          >
            <StarSlider recipeId={recipeData.id} />
          </View>

          <ScrollView style={DetailsStyles.scrollView}>
            <View style={DetailsStyles.infoView}>
              <View style={DetailsStyles.nameView}>
                <Text style={DetailsStyles.nameText}>{recipeData.name}</Text>
              </View>

              <CollapseDetails
                ingredients={recipeData.ingredients}
                instructions={recipeData.instructions}
              />
              <View
                style={{
                  backgroundColor: "#f85260",
                  width: "100%",
                  paddingBottom: 20,
                  alignItems: "center",
                }}
              >
                <View style={{ width: "90%" }}>
                  <Text style={CollapseStyles.ingredientsText}>
                    Category: {recipeData.category_name}
                  </Text>
                  <Text style={CollapseStyles.ingredientsText}>
                    {recipeData.description}
                  </Text>
                  <Text style={CollapseStyles.ingredientsText}>
                    Difficulty: {recipeData.difficulty}/3
                  </Text>
                  <Text style={CollapseStyles.ingredientsText}>
                    Overall Rating: {recipeData.overall_rating}
                  </Text>
                  <Text style={CollapseStyles.ingredientsText}>
                    Time to make: {recipeData.time}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
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
