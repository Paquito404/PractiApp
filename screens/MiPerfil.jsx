import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig";
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, SafeAreaView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";

import { useUserData } from "../context/userContext";
import UserId from "../hooks/UserId";

import { Feather } from "@expo/vector-icons";

const MiPerfil = () => {
    const { userData, uid } = useUserData();

    const userRef = doc(db, "Usuarios", uid);

    const [isEditable, setIsEditable] = useState(false);
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        if (isEditable) {
            setEditedData(userData);
        }
    }, [isEditable, userData]);



    const handleSave = async () => {
        try {
            await updateDoc(userRef, editedData)
            console.log("Datos guardados", editedData);
            setIsEditable(false);
        } catch (error) {

            console.error("Error updating document: ", error);
        }
    };

    const handleCancel = () => {
        console.log("Cancelado");
        setIsEditable(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.titulo}>Mi Perfil</Text>
                    <Text style={styles.subtitulos} >Nombres</Text>
                    <TextInput
                        value={isEditable ? editedData.name : userData.name}
                        onChangeText={(text) => setEditedData({ ...editedData, name: text })}
                        editable={isEditable}
                        style={isEditable ? styles.textoEditable : styles.texto}
                    />
                    <Text style={styles.subtitulos} >Apellidos</Text>
                    <TextInput
                        value={isEditable ? editedData.lname : userData.lname}
                        onChangeText={(text) => setEditedData({ ...editedData, lname: text })}
                        editable={isEditable}
                        style={isEditable ? styles.textoEditable : styles.texto}
                    />
                    <Text style={styles.subtitulos} >Campus</Text>
                    <RNPickerSelect
                        items={[
                            { label: "Hermosillo", value: "Hermosillo" },
                            { label: "Cajeme", value: "Cajeme" },
                            { label: "Caborca", value: "Caborca" },
                            { label: "Nogales", value: "Nogales" },
                            { label: "Santa Ana", value: "Santa Ana" },
                            { label: "Navojoa", value: "Navojoa" },
                        ]}
                        value={isEditable ? editedData.campus : userData.campus}
                        onValueChange={(value) => setEditedData({ ...editedData, campus: value })}
                        disabled={!isEditable}
                        style={isEditable ? styles.textoEditable : styles.texto}
                    />
                    <Text style={styles.subtitulos} >Carrera</Text>
                    <RNPickerSelect
                        items={[
                            { label: "Ingeniería en Sistemas", value: "Ingeniería en Sistemas" }
                        ]}
                        value={isEditable ? editedData.carrera : userData.carrera}
                        onValueChange={(value) => setEditedData({ ...editedData, carrera: value })}
                        disabled={!isEditable}
                        style={isEditable ? styles.textoEditable : styles.texto}
                    />
                    <Text style={styles.subtitulos} >Descripción</Text>
                    <TextInput
                        placeholder={userData.desc == null
                            ? "No has agregado una descripción"
                            : userData.desc}
                        value={isEditable ? editedData.desc : userData.desc}
                        onChangeText={(text) => setEditedData({ ...editedData, desc: text })}
                        editable={isEditable}
                        style={isEditable ? styles.textoEditable : styles.texto}
                    />
                    <Text style={styles.subtitulos} >Habilidades</Text>
                    <TextInput
                        placeholder={
                            userData.hab == null
                                ? "No has agregado tus habilidades"
                                : userData.hab
                        }
                        value={isEditable ? editedData.hab : userData.hab}
                        onChangeText={(text) => setEditedData({ ...editedData, hab: text })}
                        editable={isEditable}
                        style={[{ marginBottom: 12 }, (isEditable ? styles.textoEditable : styles.texto)]}
                    />
                    {isEditable && (
                        <View>
                            <TouchableOpacity onPress={handleSave} style={[{ backgroundColor: '#36AF46' }, styles.boton]}>
                                <Text style={{ color: '#fff' }}>Guardar información</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCancel} style={[{ backgroundColor: '#FF3649' }, styles.boton]}>
                                <Text style={{ color: '#fff' }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
            {!isEditable && (
                <View style={{
                    flex: 1
                }}>
                    <TouchableOpacity
                        style={styles.circle}
                        onPress={() => {
                            setIsEditable(true)
                        }}
                    >
                        <Feather name={"edit"} size={25} color="#FFF" />
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12,
        paddingHorizontal: 30,
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
    texto: {
        fontSize: 16,
        color: '#000'
    },
    actionButtonIcon: {
        fontSize: 25,
        height: 25,
        color: 'white',
    },
    boton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        marginVertical: 8,
        borderRadius: 5,
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
    circle: {
        backgroundColor: '#EAA627',
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 20,
        right: 0,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default MiPerfil;
