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
    width: "100%",
  },
  header: {
    width: "100%",
    backgroundColor: "black",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
  },
  categoryButtonGreasy: {
    borderLeftWidth: 0.5,
    borderColor: "black",
    flex: 2,
  },
  categoryButtonHealth: {
    borderLeftWidth: 0.5,
    borderColor: "black",
    flex: 2,
  },
  categoryButtonMunchies: {
    borderLeftWidth: 0.5,
    borderColor: "black",
    flex: 2,
  },
  categoryButtonAll: {
    borderLeftWidth: 0.5,
    borderColor: "black",
    flex: 1,
  }
});

export default SearchStyles;