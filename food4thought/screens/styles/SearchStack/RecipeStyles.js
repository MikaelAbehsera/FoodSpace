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


const RecipeStyles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 2,
    marginBottom: 2,
    height: 175,
  },
  backgroundView: {
    position: "absolute",
    height: 175,
    width: "100%",
    flex: 1,
  },
  star: {
    height: 14,
    width: 14,
  },
  imgView: {
    flex: 1,
  },
  img: {
    flex: 1,
  },
  header: {
    flex:1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  name: {
    flex:2,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 17,
  },
  overall_rating: {
    flexDirection: "row",
  },
  time: {
    paddingLeft: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  footer: {
    flex:1,
  },
  descriptionView: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});

export default RecipeStyles;