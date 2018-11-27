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
import CollapseStyles from "../styles/SearchStack/CollapseStyles.js";
import CollapseView from "react-native-collapse-view";
import ScaledImage from "react-native-scaled-image";

export default class CollapseDetails extends Component {
  _renderTensionViewDetails = collapse => {
    return (
      <View style={CollapseStyles.view}>
        <ScaledImage
          source={require("../materials/redtab.png")}
          height={43}
          style={{ position: "absolute", bottom: -2, left: 175 }}
        />
        <Text
          style={{
            position: "absolute",
            top: 14,
            left: 195,
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Recipe Details
        </Text>
      </View>
    );
  };
  _renderCollapseViewDetails = collapse => {
    return <View style={{ height: 0 }} />;
  };
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
          style={{ position: "absolute", bottom: -2, left: 90 }}
        />
        <Text
          style={{
            position: "absolute",
            top: 14,
            left: 122,
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
        <CollapseView
          tension={100}
          renderView={this._renderTensionViewDetails}
          renderCollapseView={this._renderCollapseViewDetails}
        />
      </View>
    );
  }
}
