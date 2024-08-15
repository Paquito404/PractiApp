//Este componente es el formato para el preview de la practica en el feed
import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from "@react-navigation/native";

//Array de colores para alternar los colores de las preview
const colors = ['rgba(234, 166, 39, .3)', 'rgba(1, 51, 150, .2)']

const PracticaPreview = (props) => {
  // eslint-disable-next-line react/prop-types
  //item son los datos completos de la practica mientras que los otros campos son heredados del feed para llenar el preview
  const { item, index, fecha, titulo, categoria} = props

  //navigate para pasar de ventana
  const { navigate } = useNavigation()

  //la funcion onPress se utiliza para que el preview pase de ventana
  const onPress = () => {
    return (
      navigate('PracticaCompleta', item)
    )
  }

  //Regresamos un 'Touchable que convierte el preview en un boton
  return(
    <TouchableOpacity style={[styles.item, {backgroundColor: colors[index % colors.length]}]} onPress={onPress}>
      <Text style={styles.fecha}>{fecha}</Text>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.categoria}>{categoria}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'rgba(234, 166, 39, .5)',
    padding: 10,
    marginVertical: 8,
  },
  fecha: {
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 30,
    color: 'rgba(0, 0, 0, .6)'
  },
  titulo: {
    fontSize: 32,
  },
  categoria: {
    fontSize: 20,
    color: 'rgba(0, 0, 0, .6)'
  }
})

export default PracticaPreview
