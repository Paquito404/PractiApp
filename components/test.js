import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import db from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Practica() {
  const [data, setData] = useState([]); // State to hold the fetched data

  useEffect(() => {
    async function fetchDataFromFirestore() {
      const campus = collection(db, "/Campus/Hermosillo/Facultades/Ingeniería/Ingeniería en Sistemas/Practicas/Children");
      const querySnapshot = await getDocs(campus);
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push({ id: doc.id, ...doc.data() });
      });
      setData(newData);
    }

    fetchDataFromFirestore();
  }, []);

  return (
    <View>
      {data.map((item) => (
        <View key={item.id}>
          <Text>Titulo: {item.Titulo}</Text>
          <Text>Desc: {item.Desc}</Text>
          <Text>Requisitos: {item.Requisitos}</Text>
          <Text>Vacantes: {item.Vacantes}</Text>
          <Text>Contacto: {item.Contacto}</Text>
        </View>
      ))}
    </View>
  );
}
