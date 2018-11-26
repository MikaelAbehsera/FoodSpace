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
    flex: 1,
    alignItems: "center",
    // backgroundColor: "lightgreen",
  },
  scrollContainer: {
    width: "95%",
    // backgroundColor: "lightblue",
  },
  catSelectorText: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 6,
  },
  catSelectorView: {
    width: "95%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "lightgrey",
    marginBottom: 8,
    height: 45,
  },
  catSelector: {},
  detailSubmitButton: {
    marginTop: 20,
    marginBottom: 30,
    alignSelf: "center",
    width: "80%",
  },
  ingredientsView: {
    flex: 1,
    flexDirection: "column",
  },
  instructionsView: {
    flex: 1,
    flexDirection: "column",
  },
  ingredientsForm: {
  },
  ingredientsList: {
    marginTop: 20,
    flex: 1,
    flexDirection: "column", 
    justifyContent: "flex-start"
  },
  instructionsForm: {
  },
  instructionsList: {
    marginTop: 20,
    flex: 1,
    flexDirection: "column", 
    justifyContent: "flex-start"
  },

});

export default CreateStyles;