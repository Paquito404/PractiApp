//funcion de ulise que se conecta con la BD
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function ObtenerPractica() {
  console.log(db);

  const [data, setData] = useState([]); // State to hold the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDataFromFirestore() {
      try {
        const campus = collection(
          db,
          "Campus/Hermosillo/Facultades/Ingeniería/Ingeniería en Sistemas/Practicas/Children"
        );
        const querySnapshot = await getDocs(campus);
        const newData = [];
        querySnapshot.forEach((doc) => {
          newData.push({ id: doc.id, ...doc.data() });
        });
        setData(newData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDataFromFirestore();
  }, []);
  return data;
}
