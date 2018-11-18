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
    marginLeft: 20,
  },
  headerRight: {
    
  },
  profilePictureView: {
    borderColor: "black",
    borderRadius: 100,
    borderWidth: 2,
    height: 90,
    width: 90,
  },
  profilePicture: {
    borderRadius: 100,
    flex: 1,
  },

});

export default ProfileStyles;
