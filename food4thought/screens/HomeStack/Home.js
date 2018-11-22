import React, {Component} from 'react';
import { Button, Text, View, ScrollView, CameraRoll, Image, AsyncStorage, Dimensions } from "react-native";

import HomeStyles from "../styles/HomeStack/HomeStyles.js";

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      photos: [],
   };
  }
  // render() {

  //   return (
  //     <View style={HomeStyles.container}>
  //       <View style={{width: "100%", height: 25, backgroundColor: "black",}} />
  //       <ScrollView>
  //         <Text>Home!</Text>
  //       </ScrollView>
        
  //       <Image source={require("../materials/food.gif")} height={Dimensions.get('window').height + 50} style={{ position: "absolute", zIndex: -10,}} />
  //       {this.props.screenProps.Nav}        
  //     </View>
  //   );
  // }

  _handleButtonPress = () => {
    CameraRoll.getPhotos({
        first: 10,
        assetType: 'Photos',
      })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
         //Error Loading Images
      });
    };

 render() {

  return (
    <View>
      <View style={{width: "100%", height: 50}} />
      <Button title="Load Images" onPress={this._handleButtonPress} />
      <ScrollView>
        {this.state.photos.map((p, i) => {
        return (
          <Image
            key={i}
            style={{
              width: 300,
              height: 100,
            }}
            source={{ uri: p.node.image.uri }}
          />
        );
      })}
      </ScrollView>
    </View>
  );
 }
}
