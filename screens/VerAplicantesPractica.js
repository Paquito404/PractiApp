import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import UserName from '../hooks/UserName';
import SolicitudAplicante from '../components/SolicitudAplicante';

const VerAplicantesPractica = ({ route }) => {
  const { aplicantes, pid, vacantes, integrantes } = route.params

  const user = UserName("Lq4QMlEcYbXblWLCCVclVJ7IBZ92");

  const alumnos = [].concat(aplicantes)
  const nombre = [];
  alumnos.forEach(alumno => {
    nombre.push(UserName(alumno))
  });

  const renderItem = ({ item, index }) => (
    <SolicitudAplicante
      uid = {item}
      index = {index}
      aplicantes = {aplicantes}
      pid = {pid}
      vacantes = {vacantes}
      integrantes = {integrantes}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titulo}>Aplicantes de esta oferta</Text>
        <FlatList
          data={aplicantes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    marginTop: 10,
    marginBottom: 20,
  },
  contenedorAlumno: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
  },
  nombre: {
    fontSize: 16,
  }
})

export default VerAplicantesPractica;