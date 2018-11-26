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
    minHeight: 230,
    flexDirection: "row",
    // backgroundColor: "green",
  },
  instructionsView: {
    minHeight: 230,
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 30,
    // backgroundColor: "red",
  },
  ingredientsForm: {
    borderTopWidth: 1,
    borderTopColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    flex: 1,
  },
  ingredientsList: {
    overflow: "hidden",
    borderTopWidth: 1,
    borderTopColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    flex: 1,
  },
  instructionsForm: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    flex: 1,
  },
  instructionsList: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    flex: 1,
  },

});

export default CreateStyles;