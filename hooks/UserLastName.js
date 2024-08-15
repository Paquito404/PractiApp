import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { useState } from "react";

export default function UserLastName(id) {
  const auth = getAuth();
  const [data, setData] = useState([])
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = id//user.uid;

      const docRef = doc(db, "Usuarios", uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      console.log("Rol de usuario: ",userData.rol);
      setData(userData.lname);
      // i want to read the data from Usuarios/uid uid being the one i declared in the const above
      
    } else {
      console.log("No se encontro el usuario");
    }
  });
  return data
}