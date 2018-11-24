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
import ScaledImage from "react-native-scaled-image";


export default class StarSlider extends Component {
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
