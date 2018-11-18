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


const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    marginTop: 5,
    marginBottom: 5,
  },
  leftView: {
    height: 130,
    borderWidth: 2,
    borderColor: "red",
  },
  rightView: {
    flex:1,
    height: 130,
    borderWidth: 2,
    borderColor: "yellow",
  },
  header: {
    flex:1,
    height: 130,
    borderWidth: 2,
    borderColor: "blue",
    flexDirection: "row",    
  },
  overall_rating: {
    flex:1,
    borderWidth: 2,
    borderColor: "red",
  },
  time: {
    flex:1,
    borderWidth: 2,
    borderColor: "blue",
  },
  footer: {
    flex:1,
    height: 130,
    borderWidth: 2,
    borderColor: "purple",
  },
  imgView: {
    borderWidth: 2,
    borderColor: "blue",
  },
  img: {
    width: 130,
    height: 130
  },
});

export default HomeStyles;