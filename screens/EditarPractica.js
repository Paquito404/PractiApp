import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

import 'moment/locale/es';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../firebaseConfig';

import * as ImagePicker from "expo-image-picker";
import { v4 } from "uuid";

const EditarPractica = ({ route }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  const handleImage = async (result) => {
    try {
      const imageUri = result.assets[0].uri;
      const fileName = result.assets[0].fileName || imageUri.split('/').pop();
      const fileExtension = fileName.split('.').pop();
      const imageName = `${v4()}.${fileExtension}`;
      const imageRef = ref(storage, `images/${imageName}`);

      const response = await fetch(imageUri);
      const blob = await response.blob();

      await uploadBytesResumable(imageRef, blob);

      console.log('Image uploaded successfully');
      setEditedData({ ...editedData, Imagen: imageName });
      setImageChanged(true);
    } catch (error) {
      console.error('Error handling or uploading image:', error);
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
      await handleImage(result);
    } else {
      alert("Ninguna imagen fue seleccionada");
      setImageChanged(false);
    }
  };

  const { id, Titulo, Desc, Requisitos, Vacantes, Contacto, Horario, Paga, Ubi, Fecha, Imagen } = route.params;
  const userRef = doc(db, "/Campus/Hermosillo/Facultades/Ingeniería/Ingeniería en Sistemas/Practicas/Children", id);

  useEffect(() => {
    if (Imagen != "" && !imageChanged) {
      const pathRef = ref(storage, `images/${Imagen}`);
      getDownloadURL(pathRef)
        .then(url => setImageUrl(url))
        .catch(error => console.error("Error fetching imagen: ", error));
    }
  }, [Imagen, imageChanged]);

  const handleSave = async () => {
    try {
      await updateDoc(userRef, editedData);
      console.log("Datos editados", editedData);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleCancel = () => {
    console.log("Cancelado");
  };

  // logica de edicion
  const [editedData, setEditedData] = useState({
    Titulo,
    Desc,
    Requisitos,
    Vacantes,
    Contacto,
    Horario,
    Paga,
    Ubi,
    Fecha,
    Imagen,
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View key={id} style={styles.container}>
          <Text style={styles.titulo}>Editar oferta de Pr&aacute;ctica</Text>
          <TextInput
            value={editedData.Titulo}
            onChangeText={(text) => setEditedData({ ...editedData, Titulo: text })}
            editable={true}
            style={styles.textoEditable}
          />
          <Text style={styles.subtitulos}>Descripción</Text>
          <TextInput
            value={editedData.Desc}
            onChangeText={(text) => setEditedData({ ...editedData, Desc: text })}
            editable={true}
            style={styles.textoEditable}
          />
          <Text style={styles.subtitulos}>Requisitos</Text>
          <TextInput
            value={editedData.Requisitos}
            onChangeText={(text) => setEditedData({ ...editedData, Requisitos: text })}
            editable={true}
            style={styles.textoEditable}
          />
          <Text style={styles.subtitulos}>Número de Vacantes</Text>
          <TextInput
            value={editedData.Vacantes}
            onChangeText={(text) => setEditedData({ ...editedData, Vacantes: text })}
            editable={true}
            style={styles.textoEditable}
          />
          <Text style={styles.subtitulos}>Ubicación de la empresa</Text>
          <TextInput
            value={editedData.Ubi}
            onChangeText={(text) => setEditedData({ ...editedData, Ubi: text })}
            editable={true}
            style={styles.textoEditable}
          />
          <Text style={styles.subtitulos}>Horario</Text>
          <TextInput
            value={editedData.Horario}
            onChangeText={(text) => setEditedData({ ...editedData, Horario: text })}
            editable={true}
          />
          <Text style={styles.subtitulos}>Apoyo Económico</Text>
          <TextInput
            value={editedData.Paga}
            onChangeText={(text) => setEditedData({ ...editedData, Paga: text })}
            editable={true}
            style={styles.textoEditable}
          />
          <Text style={styles.subtitulos}>Fecha de Expiración</Text>
          <TextInput
            value={editedData.Fecha}
            onChangeText={(text) => setEditedData({ ...editedData, Fecha: text })}
            editable={true}
            style={styles.textoEditable}
          />
          <Text style={styles.subtitulos}>Categorias de esta Oferta</Text>
          <Text style={styles.textoEditable}>Desarrollo Web</Text>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
          ) : (
            Imagen && imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
          )}
          <TouchableOpacity style={styles.button2} onPress={pickImageAsync}>
            <Text style={styles.buttonText2}>+ Adjuntar imagen</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleSave} style={[{ backgroundColor: '#36AF46' }, styles.boton]}>
            <Text style={{ color: '#fff' }}>Guardar información</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={[{ backgroundColor: '#FF3649' }, styles.boton]}>
            <Text style={{ color: '#fff' }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 30,
  },
  button2: {
    backgroundColor: '#36AF46',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText2: {
    color: 'white',
  },
  boton: {
    padding: 12,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoEditable: {
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#C1C7D0',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  titulo: {
    fontWeight: '500',
    fontSize: 24,
    paddingBottom: 6,
  },
  subtitulos: {
      fontSize: 20,
      color: '#013396',
      paddingVertical: 6,
  },
  
});

export default EditarPractica;
