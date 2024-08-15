import React, { useEffect } from "react";
import { View, Text } from "react-native";

import db from "../firebaseConfig";

import { collection, getDocs } from "firebase/firestore";

async function fetchDataFromFirestore() {
  const campus = collection(db, "/Campus/Hermosillo/Facultades/Ingeniería/Ingeniería en Sistemas/Practicas/Children");
  const querySnapshot = await getDocs(campus);
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    Object.keys(doc.data()).forEach(key => {
        console.log(`${key}: ${doc.data()[key]}`);
    })
  });
}

export default function Practica() {
  useEffect(() => {
    fetchDataFromFirestore();
  }, []);

  return (
    <View>
      <Text>Title</Text>
      <Text>Descripcion</Text>
      <Text>Lorem</Text>
      <Text>Requisitos</Text>
      <Text>Lorem</Text>
      <Text>Numero de Vacantes</Text>
      <Text>Number</Text>
      <Text>Información de Contacto</Text>
      <Text>Lorem</Text>
      <Text>Lorem</Text>
      <Text>Lorem</Text>
      <Text>Fecha de Expiracion</Text>
    </View>
  );
}
