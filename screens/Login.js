import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert, SafeAreaView} from 'react-native'
import React, { useState } from 'react'

// CONEXION A BD
import appFirebase from '../firebaseConfig'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
const auth = getAuth(appFirebase)


export default function Login(props) {

    // creamos la variable de estado
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const logueo = async() => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            Alert.alert('Iniciando sesión', 'Accediendo...')
            props.navigation.navigate('Feed')
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'El usuario o la contraseña son incorrectos')
        }
    }

    const OlvidePassword = () => {
        props.navigation.navigate('OlvidePassword')
    }
    const Registrarse = () => {
        props.navigation.navigate('Registrarse')
    }


    return (
        <SafeAreaView style={styles.padre}>
            <View>
                <Text style={{fontWeight:700, fontSize:25, marginRight:170, marginBottom:24}}>Inicia Sesión</Text>
            </View>
            <View>
                <Text style={{fontSize:16, color:'rgb(170,170,170)', marginRight:170}}>Bienvenido de vuelta</Text>
            </View>
            <View style={styles.tarjeta}>
                <View style={styles.loginImages}>
                    <Image source={require('../assets/Message.png')}/>
                </View>
                <Text style={styles.textoLoginContra}>Correo</Text>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='' style={{paddingHorizontal:15}} 
                    onChangeText={(text)=>setEmail(text)}/>
                </View>
                <View style={styles.loginImages}>
                    <Image source={require('../assets/Lock.png')}/>
                </View>
                <Text style={styles.textoLoginContra}>Contraseña</Text>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder='' style={{paddingHorizontal:15}} secureTextEntry={true}
                    onChangeText={(text)=>setPassword(text)} />
                </View>
                {/* <View style={{alignItems:'center'}}>
                    <TouchableOpacity onPress={OlvidePassword}>
                        <Text style={{color:'rgb(247, 161, 26)', textDecorationLine: 'underline'}}>¿Olvidaste la contraseña?</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
            <View style={styles.tarjetaBottom}>
                <View style={styles.RegistrarseContenedor}>
                    <Text style={styles.textResgistrarse}>¿No tienes cuenta?</Text>
                    <TouchableOpacity onPress={Registrarse}>
                        <Text style={styles.textRegistrarse1}>Regístrate</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.PadreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={logueo}>
                        <Image source={require('../assets/Arrow - Right.png')} style={{marginLeft:20, marginTop:20}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    padre:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        paddingTop:10
    },
    profile:{
        width:100,
        height:100,
        borderRadius:50,
        borderColor:'white'
    },
    tarjeta:{
        marginTop:20,
        backgroundColor:'white',
        borderRadius:20,
        width:'90%',
        padding: '20%',
        paddingTop:20,
        paddingBottom: 190,
        shadowColor:'#000',
        shadowOffset: {
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:4
    },
    loginImages:{
        resizeMode: 'cover',
        left: -27,
        top:30
    },
    textoLoginContra:{
        color: 'rgb(193, 198, 208)',
        fontSize: 14,
        marginLeft:18,
        top:8
    },
    cajaTexto:{
        paddingVertical:0,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(193, 198, 208)',
        borderRadius:0,
        marginVertical:10
    },
    tarjetaBottom:{
        flex:2,
        flexDirection: 'row'
    },
    PadreBoton:{
        justifyContent: 'center',
        marginLeft: 25,
        borderRadius:90
    },
    cajaBoton:{
        backgroundColor:'rgb(1, 51, 151)',
        borderRadius:40,
        paddingTop:0,
        paddingBottom:0,
        width:60,
        height:60,
        marginTop:0
    },
    textoBoton:{
        textAlign:'center',
        marginBottom:4,
        color:'white',
        fontSize:40
    },
    RegistrarseContenedor:{
        flexDirection: 'row', // Establece la dirección del contenedor como fila
        alignItems: 'center', // Alinea los elementos verticalmente en el centro
        justifyContent: 'center', // Alinea los elementos horizontalmente en el centro (puedes ajustar esto según sea necesario)
    },
    textResgistrarse: {
        color: 'rgb(170,170,170)',
        fontSize: 16,
        marginHorizontal: 3, // Añade un margen horizontal entre los elementos de texto
    },
    textRegistrarse1:{
        color:'rgb(247, 161, 26)',
        fontSize: 16
    }
})