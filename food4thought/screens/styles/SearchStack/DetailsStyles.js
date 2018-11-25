import {
  StyleSheet,
  PixelRatio
} from "react-native";
import {
  Dimensions
} from "react-native";
// Import font scaler 
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";


const DetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    backgroundColor: "#E0392F",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  infoView: {
    flex: 1,
    margin: 10,
    backgroundColor: "white",
    paddingBottom: responsiveHeight(18),
    borderColor: "black",
    borderWidth: 0.5,
  },
  nameView: {
    alignItems: "center",
    width: "100%",
  },
  nameText: {
    fontSize: 30,
    fontWeight: "300",
    borderBottomWidth: 0.4,
    paddingLeft: 15,
    paddingRight: 15,
  },


  funcs: {
    position: "absolute",
    // backgroundColor: "blue",
    top: (Dimensions.get("window").width / 1.5 - 24),
    right: 20,
    height: 38,
    width: 38,
    zIndex: 99,
  },
  backButton: {
    position: "absolute",
    top: 28,
    left: 10,
    height: 45,
    width: 45,
    zIndex: 99,
    backgroundColor: "white",
    borderRadius: 35,
  },

  imageView: {
    borderColor: "black",
    borderBottomWidth: 2,
  },
  image: {
    height: Dimensions.get("window").width / 1.5,
  },
});

export default DetailsStyles;