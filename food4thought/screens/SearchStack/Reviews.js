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
import Suggestion from "./Suggestion.js";
import axios from "axios";
import t from "tcomb-form-native";
const Form = t.form.Form;

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://662c08a4.ngrok.io";
///////////////////////////////////////////////////////////////
const comment = t.struct({
  Comment: t.String,
});

const Options = {
  fields: {
    Comment: {
      maxLength: 150,
    },
  }
}
export default class ReviewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { compLoaded: false, comments: [] };
  }

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    this.setState({ compLoaded: true, comments: this.state.comments });
    const that = this;
    let sessionToken;

    AsyncStorage.getItem("sessionToken")
      .then(value => {
        if (value) {
          sessionToken = value;
        }
        // console.log("session token ===> ", value);
      })
      .then(() => {
        axios
          .get(
            `${currentHostedLink}/suggestions/${
              that.props.navigation.state.params.recipeId
            }/${sessionToken}`,
          )
          .then(function(response) {
            console.log( `${currentHostedLink}/suggestions/${ that.props.navigation.state.params.recipeId }/${sessionToken}`, );
            console.log("THIS IS THE RESPONSE!!!!!!1 ====> ", response.data);
            that.setState({compLoaded: false, comments: that.state.comments});
            that.setState({compLoaded: true, comments: response.data.suggestions});
          })
          .catch(function(error) {
            console.log(error);
          })
          .finally(() => {});
      });
  }

  sendComment = () => {
    console.log("send func running")
    const form = this._form.getValue();
    const that = this;
    let sessionToken;
    console.log("comment comment comment ===> ", form.Comment)
    let sentObject = {
      newSuggestText: form.Comment,
      recipeId: this.props.navigation.state.params.recipeId
    }
     AsyncStorage.getItem("sessionToken")
      .then(value => {
        if (value) {
          sessionToken = value;
          sentObject["sessionToken"] = value;
        }
        console.log("session token ===> ", value);
      })
      .then(() => {
        axios
          .post( `${currentHostedLink}/suggestion`, sentObject)
          .then(function(response) {
            console.log(response.data)
          })
          .catch(function(error) {
            console.log(error);
          })
          .finally(() => {
            this.getComments();
          });
      });
  }

  render() {
    const { goBack } = this.props.navigation;
    if (this.state.compLoaded) {
      const comments = this.state.comments.map((comment, i) => <Suggestion key={i} comment={comment} />);
      console.log("CONSOLE CONSOLE CONSOLE ===> ", this.state.comments);
      return (
        <View style={ReviewsStyles.container}>
          <TouchableHighlight
            underlayColor="#ffffff00"
            style={{ position: "absolute", top: 28, left: 10, height: 45, width: 45, zIndex: 99, backgroundColor: "white", borderRadius: 35, }} onPress={() => goBack()} >
            <Image style={{ position: "absolute", top: -6.5, left: -6.5, height: 60, width: 60, zIndex: 99, borderRadius: 35, }} source={require("../materials/arrow.png")} />
          </TouchableHighlight>
          <View style={{ width: "100%", height: 80,}} />
          <View style={{ width: "95%", flexDirection: "column", marginLeft: 5, minHeight: 0,}}>
            <View style={{width: "100%"}}>
              <Form
                ref={c => (this._form = c)}
                type={comment}
                options={Options}
              />  
            </View>
            <View style={{width: "50%", alignSelf: "center", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 17,}} >
              <Button title="Enter" onPress={()=> {this.sendComment(); console.log("enter comment") }} />  
            </View>
          </View>
          <ScrollView>
            {comments}
          </ScrollView>

          <View style={{ position: "absolute", width: "100%",height: "100%",backgroundColor: "rgba(248, 82, 96, 1)",zIndex: -10,}} />
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
