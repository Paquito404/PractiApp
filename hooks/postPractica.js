import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Alert } from "react-native";
import { storage } from "../firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import moment from 'moment'
import 'moment/locale/es'

export async function postPractica(formValues, navigation) {
  try {
    const childrenCollectionRef = collection(
      db,
      "Campus",
      "Hermosillo",
      "Facultades",
      "Ingeniería",
      "Ingeniería en Sistemas",
      "Practicas",
      "Children"
    );

    var fecha = moment(new Date().toDateString()).format("LL")

    let postData = {
      Titulo: formValues.title,
      Desc: formValues.desc,
      Requisitos: formValues.reqs,
      Ubi: formValues.ubi,
      Horario: formValues.horario,
      Paga: formValues.paga,
      Vacantes: formValues.vacantes,
      Contacto: formValues.contacto,
      Autor: formValues.autor,
      Imagen: formValues.image,
      Tipo: formValues.tipo,
      Fecha: fecha,
      Aplicantes: [],
      Integrantes: [],
    };

    if (formValues.image && formValues.image.fileName) {
      const imageName = v4()+formValues.image.fileName;
      console.log(imageName);
      const imageRef = ref(storage, `images/${imageName}`);
      uploadBytes(imageRef, formValues.image).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });

      // Update postData after the image upload is successful
      postData = {
        ...postData,
        Imagen: imageName, // Include image URL in the data
      };
    }

    // const docRef = await addDoc(childrenCollectionRef, {
    //   Titulo: formValues.title,
    //   Desc: formValues.desc,
    //   Requisitos: formValues.reqs,
    //   Ubi: formValues.ubi,
    //   Horario: formValues.horario,
    //   Paga: formValues.paga,
    //   Vacantes: formValues.vacantes,
    //   Contacto: formValues.contacto,
    // });

    const docRef = await addDoc(childrenCollectionRef, postData);

    Alert.alert("Listo", "Se publicó la practica", [
      { text: "Aceptar", onPress: () => navigation.navigate("Feed") },
    ]);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error writing document: ", error);
    throw error;
  }
}
