import React from "react";
import { Button, Text, View, Image, AsyncStorage, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import Home from "./screens/HomeStack/Home.js";
import Login from "./screens/AuthStack/Login.js";
import Register from "./screens/AuthStack/Register.js";
import Search from "./screens/SearchStack/Search.js";
import Details from "./screens/SearchStack/Details.js";
import Reviews from "./screens/SearchStack/Reviews.js";
import Create from "./screens/CreateStack/Create.js";
import Profile from "./screens/ProfileStack/Profile.js";
import NavStyles from "./screens/styles/NavbarStyles.js";

// things to do

// create back pages for all relevant screens
// add a all button to the recipe list page, with a relevant get
// redo cards on search page, use https://www.google.ca/search?q=yelp+phone+app&source=lnms&tbm=isch&sa=X&ved=0ahUKEwj1oua19OXeAhUF4IMKHZjoAmQQ_AUIDygC&biw=1280&bih=721#imgrc=NlWjAkPr8WQm2M:
// redo profile page
// finish details page
// make a back button using react navigate back method
// break create page up to multiple modules

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const SearchStack = createStackNavigator(
  {
    List: {
      screen: Search,
    },
    Details: {
      screen: Details,
    },
    Reviews: {
      screen: Reviews,
    },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const CreateStack = createStackNavigator(
  {
    Create: {
      screen: Create,
    },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
    },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  },
);

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchButton: "rgb(248, 82, 96)",
      CreateButton: "rgb(248, 82, 96)",
      ProfileButton: "rgb(248, 82, 96)",
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.updateCreate = this.updateCreate.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  updateSearch() {
    this.props.screenProps.changePage("Search");
  }

  updateCreate() {
    this.props.screenProps.changePage("Create");
  }

  updateProfile() {
    this.props.screenProps.changePage("Profile");
  }

  render() {
    return (
      <View style={NavStyles.container}>
        <View style={NavStyles.buttonView}>
          <Button title="Search" onPress={this.updateSearch} color={this.state.SearchButton} />
        </View>
        <View style={NavStyles.buttonView}>
          <Button title="Create" onPress={this.updateCreate} color={this.state.CreateButton} />
        </View>
        <View style={NavStyles.buttonView}>
          <Button title="Profile" onPress={this.updateProfile} color={this.state.ProfileButton} />
        </View>
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStack: "Auth",
      appLoaded: false,
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage(page) {
    this.setState({ currentStack: page });
  }

  componentDidMount() {
    this.setState({
      currentStack: "Auth",
      appLoaded: true,
    })

    this.OnSessionChange();
  }
  
  OnSessionChange = () => {
    const that = this;
    console.log("(app.js) App has loaded redirecting to relevant page");
    AsyncStorage.getItem("sessionToken").then(value => {
      if (value) {
        that.setState({ currentStack: "Home" });
      }
      console.log("(app.js) session token = ===> ", value);
    });
  }

  render() {
    const Nav = <NavBar screenProps={{ changePage: this.changePage }} />;

    const props = {
      Nav: Nav,
      changePage: this.changePage,
      OnSessionChange: this.OnSessionChange,
    };
  
    if(this.state.appLoaded) {
      if (this.state.currentStack === "Home") {
        return <HomeStack screenProps={props} />;
      } else if (this.state.currentStack === "Search") {
        return <SearchStack screenProps={props} />;
      } else if (this.state.currentStack === "Create") {
        return <CreateStack screenProps={props} />;
      } else if (this.state.currentStack === "Profile") {
        return <ProfileStack screenProps={props} />;
      } else if (this.state.currentStack === "Auth") {
        return <AuthStack screenProps={props} />;
      } else {
        return (
          <View>
            <Image source={{uri: "https://media0.giphy.com/media/26u4cqVR8dsmedTJ6/giphy.gif"}} />
            <Text>WORST CASE SENARIO HAS HAPPENED, APP IS BROKEN PLS FIX </Text>
          </View>
        );
      }
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#CED3DC",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#24CCF9",
          }}
        >
          <Image
            source={require("./screens/materials/loading.gif")}
            height={Dimensions.get("window").height + 50}
            style={{ position: "absolute", width: "100%", zIndex: -10 }}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }} />
        </View>
      );
    }
  }
}
