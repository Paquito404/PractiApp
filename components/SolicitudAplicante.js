import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Button, Alert } from 'react-native'
import { Feather } from "@expo/vector-icons";
import { doc, collection, addDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import UserName from '../hooks/UserName';
import UserLastName from '../hooks/UserLastName';
import UserDesc from '../hooks/UserDesc';
import UserHab from '../hooks/UserHab';
import { useNavigation } from "@react-navigation/native";

const SolicitudAplicante = (props) => {

  const navigation = useNavigation()

  const id = props.uid;
  const nombre = UserName(id);
  const lastName = UserLastName(id);
  const desc = UserDesc(id);
  const hab = UserHab(id);
  const pid = props.pid;
  const index = props.index
  const vacantes = props.vacantes

  const aplicantes = [].concat(props.aplicantes)
  const integrantes = [].concat(props.integrantes)

  const [botones, setBotones] = useState(false);

  const onPress = () => {
    if(botones == false && props.name != ''){
      setBotones(true)
    } else if (botones == true){
      setBotones(false)
    }
  }

  //Funcionas para modificar el estatus de usuario
  const collectionPractica = collection(
    db,
    "Campus",
    "Hermosillo",
    "Facultades",
    "Ingeniería",
    "Ingeniería en Sistemas",
    "Practicas",
    "Children",
  );

  const collectionUser = collection(
    db,
    "Usuarios"
  );

  const rechazar = () => {
    updateDoc(doc(collectionUser, id), { estatus: "0"})
    const arr = aplicantes.filter((e, i) => i!== index)
    updateDoc(doc(collectionPractica, pid), { Aplicantes: arr });
    Alert.alert("Has rechazado al alumno");
  }

  const aceptar = () => {
    if(vacantes == "0"){
      Alert.alert("Ya no quedan vacantes para esta practica");
    } else{
      updateDoc(doc(collectionUser, id), { estatus: "2"})
      const arr = aplicantes.filter((e, i) => i!== index)
      updateDoc(doc(collectionPractica, pid), { Aplicantes: arr });
      updateDoc(doc(collectionPractica, pid), { Integrantes: integrantes.concat(id) });
      updateDoc(doc(collectionPractica, pid), { Vacantes: String(vacantes - 1) });
      Alert.alert("Has aprobado al alumno");
    }
  }

  return(
    <View style={styles.contenedorAlumno}>
      <TouchableOpacity onPress={onPress} style={styles.nombreContenedor}>
        <Text style={styles.nombre}>{nombre} {lastName}</Text>
        {botones == false ?
          <Feather name={"chevron-down"} size={16} />
        : <Feather name={"chevron-up"} size={16} />}
      </TouchableOpacity>
      {botones == true ?
      <>
      <Text style={styles.descripcion}>{(desc == "") ? "No tiene descripcion" : desc}</Text>
      <Text style={styles.descripcion}>{(hab == "") ? "No tiene habilidades señaladas" : hab}</Text>
      <View style={styles.contenedorBotones}>
        <TouchableOpacity style={[styles.boton, {backgroundColor: '#FF3649'}]} onPress={rechazar} >
          <Text style={{color: '#fff', fontSize:16}}>Rechazar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.boton, {backgroundColor: '#36AF46'}]} onPress={aceptar} >
          <Text style={{color: '#fff', fontSize:16}}>Aprobar</Text>
        </TouchableOpacity>
      </View>
      </>
      : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorAlumno: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
  },
  nombre: {
    fontSize: 16,
  },
  contenedorBotones: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    height: 50,
  },
  boton: {
    color: '#fff',
    fontSize: 16,
    borderRadius: 5,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descripcion: {
    fontSize: 16,
    color: '#AAAAAA'
  },
  nombreContenedor: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default SolicitudAplicante;