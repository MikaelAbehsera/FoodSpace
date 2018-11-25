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


const SuggestionStyles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 15,
    paddingBottom: 5,
    minHeight: 20,
    zIndex: 10,
    flexDirection: "column",
    borderBottomColor: "black",
    borderBottomWidth: 0.3,
  },
  messageContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 2,
    width: "100%",
    flexDirection: "row",
  },
});

export default SuggestionStyles;