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
  titleView: {
    backgroundColor: "lightblue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"

  },
  registerView: {
    backgroundColor: "red",
    height: 60,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 30,
    marginBottom: 30,
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