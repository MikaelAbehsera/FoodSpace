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

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
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
  },
  avoidView: {
    // flex: 1,
    width: "100%",
    // backgroundColor: "white",
    borderColor: "black",
    borderWidth: 10,
  },
  formView: {
    width: "90%",
  },
  loginButtonView: {
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
    width: "50%",
  },
  loginButton: {
    marginTop: 20,
    flex: 1,
  },
  footerContainer: {
    marginTop: "auto",
    marginBottom: 30,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    // backgroundColor: "red",

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
  deadspaceView: {
    // height: "40%",
    // height: 300,
    height: responsiveHeight(10),
  },
  registerButton: {
    marginBottom: 15,
  }
});

export default LoginStyles;