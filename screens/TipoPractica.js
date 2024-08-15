import React from 'react'
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native'
import BotonPractica from '../components/BotonPractica';

function TipoPractica() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titulo}>Crear oferta de práctica</Text>
        <Text style={styles.subtitulo}>Paso 1. Selecciona el tipo de oferta</Text>
        <BotonPractica
          texto = 'Oferta de práctica normal'
          practica = 'addPractica'
          tipo = '1'
        />
        <BotonPractica 
          texto = 'Oferta de práctica supervisada'
          practica = 'addPractica'
          tipo = '2'
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 30
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 16,
    paddingBottom: 16,
    color: 'rgb(1 51 150)'
  },
})

export default TipoPractica;