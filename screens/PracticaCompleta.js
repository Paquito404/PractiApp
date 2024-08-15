import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native'
import moment from 'moment'
import 'moment/locale/es'
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '../firebaseConfig';
import { doc, collection, getDoc, addDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import UserId from "../hooks/UserId"
import Observe from '../hooks/observer';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PracticaPreview from '../components/practicaPreview';
import FeedAlumnos from './FeedAlumnos';

import { useUserData } from "../context/userContext";


const PracticaCompleta = ({ route }) => {
  const { userData, uid } = useUserData();

  const { id, Titulo, Desc, Requisitos, Vacantes, Autor, Contacto, Horario, Paga, Ubi, Fecha, Imagen, Aplicantes, Integrantes } = route.params;
  const [imageUrl, setImageUrl] = useState(null);

  const rol = Observe();

  const { navigate } = useNavigation()

  console.log("qqqqqq: " + uid);


  useEffect(() => {
    if (Imagen != "") {
      const pathRef = ref(storage, `images/${Imagen}`);
      getDownloadURL(pathRef)
        .then(url => setImageUrl(url))
        .catch(error => console.error("Error fetching imagen: ", error));
    }
  }, [Imagen]);

  // fetch imagen del firebase storage


  //Lo que hace el boton de aplicar practicA
  const childrenCollectionRef = collection(
    db,
    "Campus",
    "Hermosillo",
    "Facultades",
    "Ingeniería",
    "Ingeniería en Sistemas",
    "Practicas",
    "Children",
  );
  
  const onPress = async () => {
    try {
      const docRef = doc(childrenCollectionRef, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // aqui checa si ya existe un array y si no lo inicializa
        const currentAplicantes = docSnap.data().Aplicantes || [];
        await updateDoc(docRef, { Aplicantes: [...currentAplicantes, uid] });
        Alert.alert("Has aplicado a esta oferta. En caso de ser elegido, se te notificara");
      } else {
        Alert.alert("Documento no encontrado");
      }
    } catch (error) {
      console.error("Error actualizando doc: ", error);
      Alert.alert("Error al aplicar a la oferta");
    }
  };

  //Botones del action boton
  const [icon_1] = useState(new Animated.Value(20));
  const [icon_2] = useState(new Animated.Value(20));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 90,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 160,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 20,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 20,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View key={id} style={styles.container}>
          <Text style={styles.titulo}>{Titulo}</Text>
          <Text style={styles.subtitulo}>Descripción</Text>
          <Text style={styles.texto}>{Desc}</Text>
          <Text style={styles.subtitulo}>Requisitos</Text>
          <Text style={styles.texto}>{Requisitos}</Text>
          <Text style={styles.subtitulo}>Número de Vacantes</Text>
          <Text style={styles.texto}>Existen {Vacantes} vacantes para esta oferta.</Text>
          <Text style={styles.subtitulo}>Ubicación de la empresa</Text>
          <Text style={styles.texto}>{Ubi}</Text>
          <Text style={styles.subtitulo}>Horario</Text>
          <Text style={styles.texto}>{Horario}</Text>
          <Text style={styles.subtitulo}>Apoyo Económico</Text>
          <Text style={styles.texto}>{Paga}</Text>
          <Text style={styles.subtitulo}>Fecha de Expiración</Text>
          <Text style={styles.texto}>{Fecha}</Text>
          <Text style={styles.subtitulo}>Categorias de esta Oferta</Text>
          <Text style={styles.texto}>Desarrollo Web</Text>
          {Imagen && imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />}
          {userData.rol == '1' && (
            <TouchableOpacity style={styles.boton} onPress={onPress}>
              <Text style={styles.textoBoton}>Aplicar a esta oferta</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      {/* ACtion Button */}
      {['3', '4'].includes(userData.rol) || (userData.rol == "2" && userData.email == Autor) ?
        <View style={{
          flex: 1
        }}>
          <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
            <TouchableOpacity onPress={() => navigate('EditarPractica', { ...route.params })}>
              <Feather name={"edit"} size={25} color="#FFF" />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.circle, { bottom: icon_2 }]}>
            <TouchableOpacity onPress={() => navigate('VerAplicantesPractica', { aplicantes: Aplicantes , pid: id, vacantes: Vacantes, integrantes: Integrantes })}>
              <Feather name={"eye"} size={25} color="#FFF" />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => {
              pop === false ? popIn() : popOut();
            }}
          >
            {(pop === false) ?
              <Feather name={"plus"} size={25} color="#FFF" />
              : <Feather name={"x"} size={25} color="#FFF" />}
          </TouchableOpacity>
        </View>
        : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 20,
    color: '#013396',
    marginTop: 10,
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#36AF46',
    padding: 12,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white'
  },
  circle: {
    backgroundColor: '#EAA627',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default PracticaCompleta