import React from "react";
import { Button, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";

import Home from "./screens/HomeStack/Home.js";
import Login from "./screens/HomeStack/Login.js";
import Register from "./screens/HomeStack/Register.js";

import Search from "./screens/SearchStack/Search.js";
import Profile from "./screens/ProfileStack/Profile.js";

const HomeStack = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  Home: { screen: Home },
});

const SearchStack = createStackNavigator({
  Settings: { screen: Search },
});

const ProfileStack = createStackNavigator({
  Profile: { screen: Profile },
});

export default createBottomTabNavigator({
  Home: HomeStack,
  Search: SearchStack,
  Profile: ProfileStack,
});
