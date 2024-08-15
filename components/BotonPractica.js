import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";

function BotonPractica(props) {
  const { navigate } = useNavigation()
  const onPress = () => {
    navigate(`${props.practica}`, tipo = props.tipo)
  };

  return(
    <TouchableOpacity style={styles.boton} onPress={onPress}>
          <Text style={styles.texto}>{props.texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#EAA627',
    padding: 12,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  texto: {
    color: 'white'
  }
})

export default BotonPractica;