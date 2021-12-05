import {Linking} from "react-native";

export const OpenURLButton = ( url ) => {
    console.log(typeof( url));
    Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + props);
        }
  });
}