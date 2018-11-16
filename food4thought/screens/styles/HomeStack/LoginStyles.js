import {
  StyleSheet,
  PixelRatio
} from "react-native";

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerContainer: {
    width: "100%",
    backgroundColor: "yellow",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"

  },
  headerText: {
    fontSize: 70,
    fontWeight: "bold",
  },
  middleContainer: {
    width: "100%",
    flex: 4,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  formView: {
    flex: 1,
    width: "80%",
  },
  loginButtonView: {
    flex: 2,
    width: "50%",
  },
  footerContainer: {
    backgroundColor: "lightgreen",
    height: 60,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  registerTextView: {
    // set R L margins since justify content does not work
    marginRight: "15%",
    marginLeft: "15%",
  },
  registerText: {
    fontSize: 13,
    fontWeight: "bold",
    // align text in center
    alignSelf : "center"
  },
  buttonView: {
    // set R L margins since justify content does not work
    marginRight: "25%",
    marginLeft: "25%",
  },
  registerButton: {

  }
});

export default LoginStyles;