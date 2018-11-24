import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  Image,
  AsyncStorage,
  TouchableHighlight,
} from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet, PixelRatio } from "react-native";
import ReviewsStyles from "../styles/SearchStack/ReviewsStyles.js";
import Recipe from "./Recipe.js";
import axios from "axios";

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://e9bf0500.ngrok.io";
///////////////////////////////////////////////////////////////

export default class ReviewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { compLoaded: false, reviews: [] };
  }

  componentDidMount() {
    this.setState({ compLoaded: true, reviews: this.state.reviews });
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
        let sessionToken;
        AsyncStorage.getItem("sessionToken")
          .then(value => {
            if (value) {
              sessionToken = value;
            }
            console.log("session token ===> ", value);
          })
          .then(() => {
            axios
              .get(
                `${currentHostedLink}/suggestions/${
                  that.props.navigation.state.params.recipeId
                }/${sessionToken}`,
              )
              .then(function(response) {
                console.log(
                  `${currentHostedLink}/suggestions/${
                    that.props.navigation.state.params.recipeId
                  }/${sessionToken}`,
                );
                console.log(
                  "THIS IS THE RESPONSE!!!!!!1 ====> ",
                  response.data,
                );
              })
              .catch(function(error) {
                console.log(error);
              })
              .finally(() => {});
          });
      });
  }

  render() {
    const { goBack } = this.props.navigation;
    if (this.state.compLoaded) {
      return (
        <View style={ReviewsStyles.container}>
          <TouchableHighlight
            underlayColor="#ffffff00"
            style={{ position: "absolute", top: 28, left: 10, height: 45, width: 45, zIndex: 99, backgroundColor: "white", borderRadius: 35, }} onPress={() => goBack()} >
            <Image style={{ position: "absolute", top: -6.5, left: -6.5, height: 60, width: 60, zIndex: 99, borderRadius: 35, }} source={require("../materials/arrow.png")} />
          </TouchableHighlight>

          <ScrollView>
            
          </ScrollView>

          <View style={{width: "100%",height: "100%",backgroundColor: "rgb(248, 82, 96)",zIndex: -1,}} />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            // backgroundColor: "#CED3DC",
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
