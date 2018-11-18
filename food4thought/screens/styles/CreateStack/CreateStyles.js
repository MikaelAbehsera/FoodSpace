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


const CreateStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "lightgreen",
  },
  scrollContainer: {
    width: "95%",
    backgroundColor: "lightblue",
  },
  ingredientsView: {
    minHeight: 230,
    flexDirection: "row",
    // backgroundColor: "green",
  },
  instructionsView: {
    minHeight: 230,
    flexDirection: "row",
    // backgroundColor: "red",
  },
  ingredientsForm: {
    borderWidth: 2,
    borderColor: "black",
    flex: 1,
  },
  ingredientsList: {
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "black",
    flex: 1,
  },
  instructionsForm: {
    borderWidth: 2,
    borderColor: "black",
    flex: 1,
  },
  instructionsList: {
    borderWidth: 2,
    borderColor: "black",
    flex: 1,
  },

});

export default CreateStyles;