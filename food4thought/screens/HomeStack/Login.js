import React, {Component} from 'react';
import { Button, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

        <View>
          <Text>Login page</Text>
        </View>

        <View>
          <Text>Want to have a gastronomic universe in your pocket?</Text>
          <View>
            <Button
              title="Register"
              onPress={() => this.props.navigation.navigate("Register")}
            />
          </View>
        </View>

      </View>
    );
  }
}
