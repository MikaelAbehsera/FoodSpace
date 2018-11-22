import {
  StyleSheet,
  PixelRatio
} from "react-native";
import { Dimensions } from 'react-native';
// Import font scaler 
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';


const DetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  funcs:{
    position: "absolute",  
    // backgroundColor: "blue",
    top: (Dimensions.get("window").width/1.5 - 50),
    right: 10,
    height: 38,
    width: 38,
    zIndex: 99,
  },
  backButton:{
    position: "absolute",  
    top: 28,
    left: 10,
    height: 49,
    width: 49,
    zIndex: 99,
    backgroundColor: "white",
    borderRadius: 35,
  },
  backArrow:{
    position: "absolute",  
    top: -5.5,
    left: -5.5,
    height: 60,
    width: 60,
    zIndex: 99,
    // backgroundColor: "white",
    borderRadius: 35,
  },
  imageView: {
    borderColor: "black",
    borderBottomWidth: 2,
  },
  image: {
    height: Dimensions.get("window").width/1.5,
  },
  infoView: {
    flex: 1,
    margin: 15,
    backgroundColor: "white",
    height: 600,
    borderColor: "black",
    borderWidth: 0.5,
  },
});

export default DetailsStyles;