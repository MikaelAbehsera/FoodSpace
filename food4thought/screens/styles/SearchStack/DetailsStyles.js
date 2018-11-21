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
    height: 41,
    width: 41,
    zIndex: 99,

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