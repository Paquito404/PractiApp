import React, { useState, useEffect } from 'react';
import { View, Image, Button, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = ({ navigation }) => {
    // cargar las fuentes
    const [fontsLoaded, setFontsLoaded] = useState(false);
    console.log('fonts state:', fontsLoaded)

    useEffect(() => {
        if (fontsLoaded == false) {
            loadFonts();
        }
    });

    const loadFonts = async() => {
        try {
            await Font.loadAsync({
                'Montserrat-bold': require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
                'Montserrat-italic': require('../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf'),
            });
            console.log('Loaded fonts...')
            setFontsLoaded(true);
        } catch (error) {
            console.log('ERROR: fonts not loaded...', error)
        }
    }

    const [continuePressed, setContinuePressed] = useState(false);

    const handleContinue = () => {
        setContinuePressed(true);
        navigation.navigate('Login'); // Navegar a la pantalla de inicio de sesión al presionar el botón
    };
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
            <View>
                <Image
                source={require('../assets/owlicon.png')}
                style={{ width: 230, height: 230, marginLeft: 20 }}
                />
                <Text style={styles.Practicas}>Prácticas Unison</Text>
                <Text style={styles.Bienvenido}>Bienvenido</Text>
                {/* <Button title="Continuar" onPress={handleContinue} /> */}
                <View style={styles.PadreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={handleContinue}>
                        <Image source={require('../assets/Arrow - Right.png')} style={{marginLeft:20, marginTop:20}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#013396",
    },
    Practicas: {
        color: 'black',
        fontSize: 30,
        paddingBottom:25,
        fontFamily: 'Montserrat-bold',
        fontWeight:'bold'
    },
    Bienvenido:{
        color: "black",
        fontSize: 25,
        fontWeight: '700' ,
        padding: 1,
        right: 5,
        paddingBottom:20,
        alignItems:'',
        fontFamily: 'Montserrat-bold',
        marginLeft: 60
    },
    tarjetaBottom:{
        flex:2,
        flexDirection: 'row'
    },
    PadreBoton:{
        alignItems:'center',
        borderRadius:90,
        marginTop:75,
        left: 120,
        top: 120
    },
    cajaBoton:{
        backgroundColor:'rgb(1, 51, 151)',
        borderRadius:40,
        paddingTop:0,
        paddingBottom:0,
        width:60,
        height:60,
        marginTop:0
    }
})

export default WelcomeScreen;
