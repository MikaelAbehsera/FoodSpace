import React from "react";
import {
  Button,
  Text,
  View,
  Image,
  AsyncStorage
} from "react-native";
import {
  Ionicons
} from "@expo/vector-icons";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import Home from "./screens/HomeStack/Home.js";
import Login from "./screens/HomeStack/Login.js";
import Register from "./screens/HomeStack/Register.js";
import Search from "./screens/SearchStack/Search.js";
import Create from "./screens/CreateStack/Create.js";
import Profile from "./screens/ProfileStack/Profile.js";


const HomeStack = createStackNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  },
  Home: {
    screen: Home
  },
});

const SearchStack = createStackNavigator({
  List: {
    screen: Search
  },
});

const CreateStack = createStackNavigator({
  Create: {
    screen: Create
  },
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile
  },
});

const tab = createBottomTabNavigator({
  //home should be at top!
  Home: HomeStack,
  Search: SearchStack,
  Create: CreateStack,
  Profile: ProfileStack,
}, {
  navigationOptions: ({
    navigation
  }) => ({
    // tabBarVisible: navigation.state.key === 'Search' && loggedIn ? true : false,
    // tabBarVisible: navigation.state.key === 'Login' || navigation.state.key === 'Search',
    whatever: console.log(navigation)
  }),
  tabBarLabel: {},
  tabBarOptions: {
    activeTintColor: "tomato",
    inactiveTintColor: "gray",
    // showLabel: false,
  },
}

);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStack: "Home",
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage(page) {
    this.setState({currentStack: page});
  }

  OnSessionChange() {
    console.log("We are in!");
    AsyncStorage.getItem("sessionToken").then(
      (value) => {
        if(value) {
          // forcing clients to profile
          // if(this.state.currentStack !== "Profile") {
          this.setState({currentStack: "Profile"});
          // }
        }
        console.log("session token ===> ", value);
      }
    );
  }

  componentDidMount() {
    this.OnSessionChange();
  }

  render() {
    const props = {changePage: this.changePage, OnSessionChange: this.OnSessionChange};

    if (this.state.currentStack === "Home") {
      return ( <HomeStack  screenProps={props} />);
    } else if (this.state.currentStack === "Search") {
      return ( <SearchStack  screenProps={props} />);
    } else if (this.state.currentStack === "Create") {
      return ( <CreateStack  screenProps={props} />);
    } else if (this.state.currentStack === "Profile") {
      return ( <ProfileStack screenProps={props} />);
    } else {
      return (<View><Text>HIHIHIHIHIH</Text><Text>HIHIHIHIHIH</Text><Text>HIHIHIHIHIH</Text><Text>HIHIHIHIHIH</Text><Text>HIHIHIHIHIH</Text><Text>HIHIHIHIHIH</Text></View>);
    }
  }
}