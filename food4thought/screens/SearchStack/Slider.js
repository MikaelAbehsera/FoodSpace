import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  Slider,
  AsyncStorage,
} from "react-native";
import ScaledImage from "react-native-scaled-image";
import axios from "axios";

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://cf687228.ngrok.io";
////////////////////////////////////////////////////////////////

export default class StarSlider extends Component {
  constructor(props) {
    super(props);
    this.star = require("../materials/star.png");
    this.greyStar = require("../materials/greyStar.png");

    this.state = {
      star1: this.greyStar,
      star2: this.greyStar,
      star3: this.greyStar,
      star4: this.greyStar,
      star5: this.greyStar,
      userRating: null,
    };
  }

  componentDidMount() {
    const that = this;
    let userRating;
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
            `${currentHostedLink}/userRatings/${sessionToken}/${
              that.props.recipeId
            }`,
          )
          .then(function(response) {
            console.log(
              `${currentHostedLink}/userRatings/${sessionToken}/${
                that.props.recipeId
              }`,
            );
            console.log(response.data);
            if (!response.data.success) {
              userRating = 0;
            } else if (response.data.success && response.data.userRating[0]) {
              userRating = response.data.userRating[0];
              that.changeStar(userRating.rating);
            }
          })
          .catch(function(error) {
            console.log(error);
          })
          .finally(() => {});
      });
  }

  changeStar = rating => {
    console.log("CHANGING STARS");
    // for loop does not work here dont refractor working the if statement
    if (rating === 1) {
      this.setState({
        star1: this.star,
        star2: this.greyStar,
        star3: this.greyStar,
        star4: this.greyStar,
        star5: this.greyStar,
        userRating: this.state.userRating,
      });
    } else if (rating === 2) {
      this.setState({
        star1: this.star,
        star2: this.star,
        star3: this.greyStar,
        star4: this.greyStar,
        star5: this.greyStar,
        userRating: this.state.userRating,
      });
    } else if (rating === 3) {
      this.setState({
        star1: this.star,
        star2: this.star,
        star3: this.star,
        star4: this.greyStar,
        star5: this.greyStar,
        userRating: this.state.userRating,
      });
    } else if (rating === 4) {
      this.setState({
        star1: this.star,
        star2: this.star,
        star3: this.star,
        star4: this.star,
        star5: this.greyStar,
        userRating: this.state.userRating,
      });
    } else if (rating === 5) {
      this.setState({
        star1: this.star,
        star2: this.star,
        star3: this.star,
        star4: this.star,
        star5: this.star,
        userRating: this.state.userRating,
      });
    }
  };

  starClick = rating => {
    const that = this;
    // if star n is clicked,
    // make all stars behind it also yellow/filled
    // send post to backend each time the star rating changes
    const sentObject = {
      recipe_id: this.props.recipeId,
      rating: rating,
    };
    let sessionToken;
    //get full form from state, manipulate to one object, and post to backend
    AsyncStorage.getItem("sessionToken")
      .then(value => {
        if (value) {
          sessionToken = value;
          sentObject["sessionToken"] = value;
        }
        console.log("session token (slider component) ===> ", sessionToken);
      })
      .then(() => {
        let validate = false;
        axios
          .post(`${currentHostedLink}/ratings`, sentObject)
          .then(function(response) {
            console.log("(slider comp) success ===> ", response.data.success);
            // if (response.data.success) {
            if (response.data.success) {
              validate = true;
              that.changeStar(rating);
            }
          })
          .catch(function(error) {
            console.log(error);
          })
          .finally(function() {
            console.log("(slider comp) VAIDATE ==> ", validate);
          });
      });
  };

  render() {
    return (
      <View
        style={{
          width: "45%",
          height: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          top: 4,
          left: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableHighlight
            onPress={() => this.starClick(1)}
            underlayColor="#ffffff00"
          >
            <Image
              source={this.state.star1}
              style={{ height: 30, width: 30 }}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.starClick(2)}
            underlayColor="#ffffff00"
          >
            <Image
              source={this.state.star2}
              style={{ height: 30, width: 30 }}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.starClick(3)}
            underlayColor="#ffffff00"
          >
            <Image
              source={this.state.star3}
              style={{ height: 30, width: 30 }}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.starClick(4)}
            underlayColor="#ffffff00"
          >
            <Image
              source={this.state.star4}
              style={{ height: 30, width: 30 }}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.starClick(5)}
            underlayColor="#ffffff00"
          >
            <Image
              source={this.state.star5}
              style={{ height: 30, width: 30 }}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
