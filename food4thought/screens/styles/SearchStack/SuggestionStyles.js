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
    marginTop: 15,
    marginBottom: 15,
    minHeight: 20,
    zIndex: 10,
    flexDirection: "column",
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