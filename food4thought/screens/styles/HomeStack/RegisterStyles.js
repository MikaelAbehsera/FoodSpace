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

const RegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "lightblue",
  },
  scrollContainer: {
    width: "100%",
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "yellow",
  },
  headerText: {
    fontSize: 60,
    fontWeight: "bold",
  },
  middleContainer: {
    width: "100%",
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "lightgreen",
  },
  formView: {
    width: "80%",
  },
  loginButtonView: {
    marginTop: 20,
    flex: 1,
    width: "50%",
  },
  loginButton: {
    marginTop: 20,
    flex: 1,
  },
  footerContainer: {
    marginTop: 20,
    marginBottom: 30,
    width: "100%",
  },
  registerError: {
    fontStyle: "italic",
    color: "red",
  },
  registerTextView: {
    // set R L margins since justify content does not work
    marginRight: "5%",
    marginLeft: "5%",
  },
  registerText: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    // align text in center
    alignSelf: "center"
  },
  buttonView: {
    marginTop: 10,
    // set R L margins since justify content does not work
    marginRight: "25%",
    marginLeft: "25%",
  },
  registerButton: {

  }
});

export default RegisterStyles;