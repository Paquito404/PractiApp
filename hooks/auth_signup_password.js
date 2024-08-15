import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import { db } from '../firebaseConfig';
import { doc, setDoc, collection } from "firebase/firestore"

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const createUser = async (email, password, name, lastName, campus, rol, career = " ", phone = " ", department = " ", desc, hab, estatus) => {
  try {
    //se guarda usuario en auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //dependiendo del rol se almacena con rol distinto en bd
    if (rol == "1") {
      //se crea alumno
      await setDoc(doc(db, 'Usuarios', userCredential.user.uid), {
        email: email,
        name: name,
        lname: lastName,
        campus: campus,
        carrera: career,
        rol: rol,
        desc: desc,
        hab: hab,
        estatus: estatus
      });

    } else if (rol == "2") {
      //se hacen estos cambios de valores por el orden de los parametros
      department = phone
      phone = career
      //se crea maestro
      await setDoc(doc(db, 'Usuarios', userCredential.user.uid), {
        email: email,
        name: name,
        lname: lastName,
        campus: campus,
        department: department,
        phone: phone,
        rol: rol
      });


    } else if (rol == "3") {
      //se hacen estos cambios de valores por el orden de los parametros
      department = phone
      phone = career
      //se crea coordinador de practicas
      await setDoc(doc(db, 'Usuarios', userCredential.user.uid), {
        email: email,
        name: name,
        lname: lastName,
        campus: campus,
        department: department,
        phone: phone,
        rol: rol
      });
    }


    Alert.alert('Usuario creado')
    navigation.navigate("Feed");
  } catch (error) {
    throw error;
  }
};
