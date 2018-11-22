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
    width: "100%",
    height: 100,
    backgroundColor: "lightblue",
    flexDirection: "row",
    alignItems: "center"
  },
  headerLeft: {
    flex:1 ,
    marginLeft: 20,
    marginRight: 20,
  },
  headerRight: {
    flex:3 ,    
    marginRight: 20,
  },
  headerDetails: {
    flex: 1,
    borderColor: "black",
    borderWidth: 2,
  },
  headerDetailsTop: {
    flex: 1,
    borderColor: "red",
    borderWidth: 2,
  },
  headerDetailsMiddle: {
    flex: 1,
    borderColor: "blue",
    borderWidth: 2,
  },
  headerDetailsBottom: {
    flex: 1,
    borderColor: "green",
    borderWidth: 2,
  },
  profilePictureView: {
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
    borderTopWidth: 1,
    borderTopColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  favesContainer: {
    flex: 1,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
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
    alignSelf: "flex-start",
    backgroundColor: "#4392F1",
    borderWidth: 1,
    borderRadius: 20,
    textDecoration: "underline overline wavy blue",
    textAlign: "right",
    '&:hover': {
    backgroundColor: 'yellow'
 },       
  },
 
  signoutButton: {
    width: 110,
    position: "absolute",
    right: 20,
    bottom: 100,
  },

});

export default ProfileStyles;
