import 'react-native-gesture-handler';
import { DrawerItem, DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';

import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import db from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

//Hooks
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";
import { singOut } from "../hooks/logout";

//screens
import WelcomeScreen from "../screens/Welcome";
import Login from "../screens/Login";
import OlvidePassword from "../screens/OlvidePassword";
import Registrarse from "../screens/Registrarse";
import RegistrarCoordinadorPracticas from "../screens/RegistrarCoordinadorPracticas"
import RegistrarMaestro from "../screens/RegistrarMaestro";
import NavigationFeed from "./NavigationFeed";
import AddPractica from "../screens/addPractica";
import PracticaCompleta from "../screens/PracticaCompleta";
import FeedAlumnos from "../screens/FeedAlumnos";
import Observe from "../hooks/observer";
import TipoPractica from '../screens/TipoPractica';
import MiPerfil from '../screens/MiPerfil';
import AddPracticaSupervidada from '../screens/addPracticaSupervisada';
import EditarPractica from '../screens/EditarPractica';
import VerAplicantesPractica from '../screens/VerAplicantesPractica';
import SolicitudAplicante from './SolicitudAplicante';

// auth

import { getAuth, onAuthStateChanged } from 'firebase/auth';

// roles: 4 facultad, 3 prácticas, 2 maestros, 1 alumnos

const Navigation = () => {
  const rol = Observe();

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // drawer
  const Drawer = createDrawerNavigator();
  function DrawerTabs() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Feed" 
        component={Tabs}
        options={{
          headerTitle: (props) => <FeedHeader {...props} />,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: "#013396",
            height: 120,
          },
        }} />

        {/* Rol 4 facultad */}
        {rol === '4' && (
          <>
            <Drawer.Screen name="Registrar Coordinador de Practicas" component={RegistrarCoordinadorPracticas} />
            <Drawer.Screen name="Registrar Maestro" component={RegistrarMaestro} />
          </>
        )}

        {/* Rol 3 prácticas */}
        {rol === '3' && (
          <>
            <Drawer.Screen name="Registrar Maestro" component={RegistrarMaestro} />
          </>
        )}
        {/* Rol 2 Maestros */}
        {rol === '2' && (
          <>
            <Drawer.Screen name="Registrar Maestro" component={RegistrarMaestro} />
          </>
        )}
        {/* Rol 1 Alumnos */}
        {rol === '1' && (
          <>
            <Drawer.Screen name="Mi perfil" component={MiPerfil} />
          </>
        )}

        {/* Cerrar Sesión */}
        
      </Drawer.Navigator>
    );
  }

  const FeedHeader = () => {
    const navigation = useNavigation();
    const handleLogout = () => {
      Alert.alert(
        "Cerrar sesión",
        "¿Estas seguro de que deseas cerrrar sesión?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Cerrar Sesión",
            onPress: () => {
              singOut();
              navigation.popToTop();
              setIsSignedIn(false);
              // TODO:
              //navigation.dispatch(StackActions.popToTop());
            },
          },
        ]
      );
    };

    return (
      <View style={styles.headerWrapper}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Practicas Unison</Text>
          <TouchableOpacity style={styles.settings} onPress={handleLogout}>
            <Feather name={"settings"} color={"white"} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  //Header para el addPractica
  const PracticaHeader = () => {
    const navigation = useNavigation();
    const handleLogout = () => {
      Alert.alert(
        "Cerrar sesión",
        "¿Estas seguro de que deseas cerrrar sesión?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Cerrar Sesión",
            onPress: () => {
              singOut();
              navigation.popToTop();
              setIsSignedIn(false);
              // TODO:
              //navigation.dispatch(StackActions.popToTop());
            },
          },
        ]
      );
    };

    return (
      <View style={styles.headerWrapper}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Practicas Unison</Text>
          <TouchableOpacity style={styles.settings} onPress={handleLogout}>
            <Feather name={"settings"} color={"white"} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const StackPractica = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#013396",
            height: 80,
          },
        }}
      >
        <Stack.Screen
          name="FeedAlumnos"
          component={FeedAlumnos}
          options={{headerShown: false, unmountOnBlur: true,}}
        />
        <Stack.Screen
          name="PracticaCompleta"
          component={PracticaCompleta}
          options={{
            title: "Practica",
            headerTitleStyle: {
              fontSize: 25,
            },
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#013396",
            },
          }}
        />
        <Stack.Screen 
          name="EditarPractica"
          component={EditarPractica}
          options={{
            title: "Practica",
            headerTitleStyle: {
              fontSize: 25,
            },
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#013396",
            },
          }}
        />
        <Stack.Screen 
          name="VerAplicantesPractica"
          component={VerAplicantesPractica}
          options={{
            title: "Practica",
            headerTitleStyle: {
              fontSize: 25,
            },
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#013396",
            },
          }}
        />
        <Stack.Screen 
          name="SolicitudAplicante"
          component={SolicitudAplicante}
          options={{
            title: "Practica",
            headerTitleStyle: {
              fontSize: 25,
            },
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#013396",
            },
          }}
        />
      </Stack.Navigator>
    );
  };

  //Grupo que pasa de 'tipo de practica' a la creacion de la practica
  const StackAgregarPractica = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="TipoPractica"
          component={TipoPractica}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addPractica"
          component={AddPractica}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addPracticaSupervisada"
          component={AddPracticaSupervidada}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  const Tabs = () => {
    const rol = Observe();
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            //borderTopColor: "white",
            //shadowColor: "white",
          },

          //headerTitle: (props) => <PracticaHeader {...props} />,
        }}
      >
        <Tab.Screen
          name=" "
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name={"home"}
                size={28}
                color={focused ? "#EAA627" : "black"}
              />
            ),
            headerShown: false,
            unmountOnBlur: true,
          }}
        >
          {() => <StackPractica />}
        </Tab.Screen>
        {(rol == '2' || rol == '3' || rol == '4') ? (<Tab.Screen
          name="  "
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name={"plus"}
                size={28}
                color={focused ? "#EAA627" : "black"}
              />
            ),
            headerShown: false,
          }}
        >
          {() => <StackAgregarPractica />}
        </Tab.Screen>) : null}
        {(rol == '1') ? (<Tab.Screen
          name="   "
          component={MiPerfil}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name={"user"}
                size={30}
                color={focused ? "#EAA627" : "black"}
              />
            ),
            headerShown: false,
          }}
        />)
        : null}
      </Tab.Navigator>
    );
  };

  //Inicio, lo que antes estaba en App.js
  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="Feed"
          component={DrawerTabs}
          options={{ headerShown: false, unmountOnBlur: true, }}
        />
        <Stack.Screen
          name="OlvidePassword"
          component={OlvidePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registrarse"
          component={Registrarse}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="RegistrarCoordinadorPracticas"
          component={RegistrarCoordinadorPracticas}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="RegistrarMaestro"
          component={RegistrarMaestro}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flex: 1,
    flexDirection: "column",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  titulo: {
    margin: 10,
    color: "white",
    width: "70%",
    fontSize: 28,
  },
  settings: {
    margin: 20,
    width: "10%",
  },
  buscador: {
    height: "100%",
    width: "100%",
  },
  sliders: {
    margin: 20,
    width: "10%",
  },
});

export default Navigation;
