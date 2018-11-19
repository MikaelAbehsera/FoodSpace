import {
  StyleSheet,
  PixelRatio
} from "react-native";

// Import font scaler 
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';


const RecipeStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    borderTopLeftRadius: 40,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  leftView: {
    height: 126.5,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  //right view
  // rightView: {
  //   flex:1,
  //   height: 126.5,
  //   borderLeftWidth: 2,
  //   borderBottomEndRadius: 8,
  //   borderTopEndRadius: 8,
  //   borderLeftColor: "black",
  //   backgroundColor: "green",
  // },
  header: {
    flex:1,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  name: {
    flex:1,
  },
  middle: {
    flex:1,
    flexDirection: "row",    
  },
  overall_rating: {
    flex:1,
    borderRightWidth: 2,
    borderRightColor: "black",
  },
  time: {
    flex:1,
  },
  footer: {
    flex:2,
    height: 130,
    borderTopWidth: 2,
    borderTopColor: "black",
  },
  imgView: {
    borderTopLeftRadius: 10,
    borderBottomStartRadius: 40,
  },
  img: {
    width: 130,
    height: 126,
    borderTopLeftRadius: 38,
    borderBottomLeftRadius: 38,
  },
});

export default RecipeStyles;