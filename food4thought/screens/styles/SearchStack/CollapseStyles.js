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


const CollapseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f85260",
  },
  view: {
    height: 50,
    padding: 0,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderBottomColor: "#f85260",
    borderBottomWidth: 3,
  },
  collapseView: {
    padding: 20
  },
  iconView: {
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  ingredientsText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "300",
  },
  instructionsText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "300",
  },
});

export default CollapseStyles;