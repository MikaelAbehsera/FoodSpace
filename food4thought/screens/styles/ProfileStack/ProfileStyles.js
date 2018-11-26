import {
  StyleSheet,
  PixelRatio
} from "react-native";

// Import font scaler 
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize

} from "react-native-responsive-dimensions";

const ProfileStyles = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  header: {
    marginTop: 20,
    width: "100%",
    height: 250,
    flexDirection: "column",
    alignItems: "center",
    borderBottomWidth: 0.4, 
    borderBottomColor: "grey",
  },
  headerTop: {
    paddingTop: 25,
    width: "100%",
    backgroundColor: "#24CCF9",
  },
  headerRight: {
    backgroundColor: "#24CCF9",
    flex:3 ,    
  },
  headerDetails: {
    height: 150,
    width: responsiveWidth(100),
  },
  headerDetailsTop: {
    marginTop: 15,
    alignSelf: "center",
  },
  headerDetailsTopText: {
    fontWeight: "500",
    fontSize: 25,
  },
  headerDetailsMiddle: {
    marginTop: 1,
    alignSelf: "center",
  },
  headerDetailsTopMiddle: {
    fontWeight: "100",
    fontSize: 15,
  },
  headerDetailsBottom: {
    marginTop: 30,
    alignSelf: "center",
    borderBottomWidth: 0.4, 
    borderBottomColor: "grey",
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerDetailsTopBottom: {
    fontWeight: "100",
    fontSize: 15,
  },
  profilePictureView: {
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 100,
    height: 90,
    width: 90,
  },
  profilePicture: {
    borderRadius: 100,
    flex: 1,
  },


  createdContainer: {
    flex: 1,
    width: "100%",
  },
  favesContainer: {
    flex: 1,
    width: "100%",
  },

  createdView: {
    flex: 1,
    width: "100%",
  },
  favesView: {
    flex: 1,
    width: "100%",
  },

  bubbleView: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
    alignSelf: "flex-start",
    // textDecoration: "underline overline wavy blue",
    textAlign: "right",
  },
  bubbleViewText: {
    fontSize: 16,
    fontWeight: "400",
  },
  titleText: {
    marginLeft: 5,
    marginTop: 20,
    fontSize: 19,
    fontWeight: "500",
  },
  signoutButton: {
    width: 110,
    position: "absolute",
    right: 2,
    bottom: 5,
  },

});

export default ProfileStyles;
