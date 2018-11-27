import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  AsyncStorage,
  TouchableHighlight,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfileStyles from "../styles/ProfileStack/ProfileStyles.js";
import axios from "axios";

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://662c08a4.ngrok.io";
///////////////////////////////////////////////////////////////

class Bubble extends React.Component {
  constructor(props) {
    super(props);
  }

  reRoute = () => {
    // send a object with a recipe key+value
    const that = this;
    let sessionToken;

    AsyncStorage.getItem("sessionToken")
      .then(value => {
        if (value) {
          sessionToken = value;
        }
        console.log("ID ID ID ID ID ID ID ID ID ===> ", that.props);
      })
      .then(() => {
        axios
          .get(
            `${currentHostedLink}/specificRecipeDetails/${
              that.props.recipeId ? that.props.recipeId : that.props.recipe.id
            }/${sessionToken}`,
          )
          .then(function(response) {
            if (response.data) {
              console.log("ROUTING TO DETAILS PAGE");
              // console.log(Object.keys(that.props))
              that.props.navigate("Details", {
                recipe: response.data.allRecipes[0],
              });
              console.log("WILL ROUTE TO DETAILS WITH THIS OBJECT", {
                recipe: response.data.allRecipes[0],
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          })
          .finally(() => {});
      });
  };

  render() {
    return (
      <TouchableHighlight
        underlayColor="#F85260"
        onPress={() => {
          this.reRoute();
        }}
      >
        <View style={ProfileStyles.bubbleView}>
          <Image
            style={{ height: 23, width: 23, marginLeft: 10, marginRight: 10 }}
            source={
              this.props.created
                ? require("../materials/pot.png")
                : require("../materials/recipe.png")
            }
          />
          <Text style={ProfileStyles.bubbleViewText}>
            "{this.props.name}"
            {this.props.created ? (
              <Text style={ProfileStyles.bubbleViewText}>
                by {this.props.created}.
              </Text>
            ) : null}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { compLoaded: false, userProfile: {}, modalVisible: false };
  }

  componentDidMount() {
    const that = this;
    let sessionToken;

    AsyncStorage.getItem("sessionToken")
      .then(value => {
        if (value) {
          sessionToken = value;
        }
        console.log("session token (profile.js) ===> ", value);
      })
      .then(() => {
        axios
          .get(`${currentHostedLink}/profile/${sessionToken}`)
          .then(function(response) {
            // reset page load
            that.setState({
              compLoaded: false,
              userProfile: that.state.userProfile,
              modalVisible: that.state.modalVisible,
            });
            // set state to new object
            that.setState({
              compLoaded: false,
              userProfile: response.data.userProfile,
              modalVisible: that.state.modalVisible,
            });
            // state load finsished set new state
            that.setState({
              compLoaded: true,
              userProfile: that.state.userProfile,
              modalVisible: that.state.modalVisible,
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      });
  }

  signout = () => {
    const that = this;
    AsyncStorage.setItem("sessionToken", "").then(() => {
      that.props.screenProps.OnSessionChange();
    });
    that.props.screenProps.changePage("Auth");
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.compLoaded) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* <View style={{ position: "absolute", width: "90%", height: "100%",backgroundColor: "rgba(248, 82, 96, 1)",zIndex: -10, borderLeftWidth: 0.7, borderRightWidth: 0.7,}} /> */}
          <View
            style={{
              top: 0,
              width: "100%",
              height: 25,
              backgroundColor: "black",
            }}
          />
          <View
            style={{
              width: "100%",
              height: 15,
              backgroundColor: "rgba(248, 82, 96, 1)",
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "95%",
            }}
          >
            <ScrollView style={ProfileStyles.scrollView}>
              {/* <View style={{width: "100%", height: 25,}} /> */}
              <View style={ProfileStyles.header}>
                <View style={ProfileStyles.headerTop}>
                  <View style={ProfileStyles.profilePictureView}>
                    {/* <TouchableHighlight onPress={() => { this.setModalVisible(true) }}> */}
                    <Image
                      style={ProfileStyles.profilePicture}
                      source={{
                        uri: this.state.userProfile.userInfo.profileIMG
                          ? this.state.userProfile.userInfo.profileIMG
                          : "https://yt3.ggpht.com/a-/ACSszfEdgh-wnNd6QHJppYBHMo1wiWAL5h_R6DFDHA=s900-mo-c-c0xffffffff-rj-k-no",
                      }}
                    />
                    {/* </TouchableHighlight> */}
                  </View>
                </View>
                <View style={ProfileStyles.headerRight}>
                  <View style={ProfileStyles.headerDetails}>
                    <View style={ProfileStyles.headerDetailsTop}>
                      <Text style={ProfileStyles.headerDetailsTopText}>
                        {this.state.userProfile.userInfo.username}
                      </Text>
                    </View>
                    <View style={ProfileStyles.headerDetailsMiddle}>
                      <Text style={ProfileStyles.headerDetailsTopMiddle}>
                        {this.state.userProfile.userInfo.location}
                      </Text>
                    </View>
                    <View style={ProfileStyles.headerDetailsBottom}>
                      <Text style={ProfileStyles.headerDetailsTopBottom}>
                        {this.state.userProfile.userInfo.email}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={ProfileStyles.createdContainer}>
                <View>
                  <Text style={ProfileStyles.titleText}>Created Recipes</Text>
                </View>
                <View style={ProfileStyles.createdView}>
                  {this.state.userProfile.recipesCreated.map((recipe, i) => (
                    <Bubble
                      key={i}
                      navigate={navigate}
                      recipeId={recipe.recipes_id}
                      recipe={recipe}
                      name={recipe.name}
                    />
                  ))}
                </View>
                <View
                  style={{ borderBottomWidth: 0.4, borderBottomColor: "grey" }}
                />
              </View>
              <View style={ProfileStyles.favesContainer}>
                <View>
                  <Text style={ProfileStyles.titleText}>Favorite Recipes</Text>
                </View>
                <View style={ProfileStyles.favesView}>
                  {this.state.userProfile.faves.map((fave, i) => (
                    <Bubble
                      key={i}
                      navigate={navigate}
                      recipeId={fave.recipes_id}
                      name={fave.name}
                      created={fave.username}
                    />
                  ))}
                </View>
                <View
                  style={{ borderBottomWidth: 0.4, borderBottomColor: "grey" }}
                />
              </View>
            </ScrollView>
            <View style={ProfileStyles.signoutButton}>
              <Button title="Signout" onPress={this.signout} color="red" />
            </View>
          </View>
          {this.props.screenProps.Nav}
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
