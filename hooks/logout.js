import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

import { Alert } from "react-native";

export const singOut = () => {
  signOut(auth)
    .then(() => {
      Alert.alert("Sesión cerrada");
    })
    .catch((error) => {
      Alert.alert("Ocurrió un error " + error);
    });
};
