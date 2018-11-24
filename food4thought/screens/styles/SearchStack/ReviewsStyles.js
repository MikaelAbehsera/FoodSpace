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


const ReviewsStyles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    flex: 1,
    flexDirection: "column",
    borderWidth: 1,
    zIndex: 1,
  },

});

export default ReviewsStyles;