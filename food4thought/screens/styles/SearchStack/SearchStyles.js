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


const SearchStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "lightgreen",
  },
  scrollRecipesView: {
    width: "95%",
    // backgroundColor: "lightblue",

  },
  header: {
    width: "100%",
    // height: 50,
    backgroundColor: "red",
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: "blue",
    width: "100%",
    flexDirection: "row",
  },
  categoryButtonGreasy: {
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
  },
  categoryButtonHealth: {
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
  },
  categoryButtonMunchies: {
    borderWidth: 1,
    borderColor: "black",
    flex: 1,
  }
});

export default SearchStyles;