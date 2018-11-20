import {
  StyleSheet,
  PixelRatio
} from "react-native";

// Import font scaler 
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";


const NavStyles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "grey",
    left: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonView: {
    flex: 1,
  }
});


export default NavStyles;
