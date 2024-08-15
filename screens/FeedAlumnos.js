import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity
} from "react-native";
import PracticaPreview from "../components/practicaPreview";
import ObtenerPractica from "../hooks/ObtenerPractica";
import { useNavigation } from "@react-navigation/native";



const FeedAlumnos = () => {
  //Tomamos los datos de hook ObtenerPractica
  const DATA = ObtenerPractica();
  //console.log("zzz", DATA);

  const { navigate } = useNavigation()

  //Esta funcion renderiza PracticaPreview pasandole los parametros
  const renderItem = ({ item, index }) => (
    <PracticaPreview
      item={item}
      index={index}
      titulo={item.Titulo}
      categoria="Categoria: Deasrrollo Web"
      fecha={item.Fecha}
    />
  );

  return (
    //SafeAreaView contiene un View para el  texto y un Flatlist para las preview
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ fontSize: 20 }}>Vacantes disponibles</Text>
      </View>
      {
        //EL flatlist ira generando 'PracticasPreview' que haya en la base
      }
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigate("AddPractica")}>
          <Text
            style={{
              color: "rgb(247, 161, 26)",
              textDecorationLine: "underline",
            }}
          >
            Agregar Practica
          </Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    padding: 16,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    marginTop: 0,
    padding: 16,
    backgroundColor: "white",
  },
});

export default FeedAlumnos;
