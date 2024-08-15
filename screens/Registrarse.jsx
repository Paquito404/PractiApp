import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { createUser } from '../hooks/auth_signup_password';
import RNPickerSelect from 'react-native-picker-select';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

const Registrarse = (props) => {
  // Estados para los valores de los campos del formulario
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [campus, setCampus] = useState('');
  const [career, setCareer] = useState('');
  const [desc, setDesc] = useState('');
  const [hab, setHab] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    // Validar que todos los campos estén llenos
    if (!email || !name || !lastName || !campus || !career || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Aquí puedes implementar la lógica para enviar los datos del formulario
    console.log('Formulario enviado:', { email, name, lastName, campus, career, desc, hab, password, confirmPassword });

    rol = "1"
    estatus = "0"
    createUser(email, password, name, lastName, campus, rol, career, phone='', dep='' ,desc, hab, estatus);
  };
  
  // Ir al Login
  const Login = () => {
    props.navigation.navigate('Login')
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <View style={styles.images}>
            <Image source={require('../assets/Message.png')} />
          </View>
          <Text style={styles.textInfo}>Correo institucional</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View>
          <View style={styles.images}>
            <Image source={require('../assets/Profile.png')}/>
          </View>
          <Text style={styles.textInfo}>Nombre(s)</Text>
          <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
          />
        </View>
        <View>
          <View style={styles.images}>
            <Image source={require('../assets/Profile.png')}/>
          </View>
          <Text style={styles.textInfo}>Apellido(s)</Text>
          <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
          />
        </View>
        <View>
          <View style={styles.images}>
            <Image source={require('../assets/Books.png')}/>
          </View>
        <Text style={styles.textInfo}>Campus</Text>
        <RNPickerSelect style={styles.input}
          onValueChange={(campus) => setCampus(campus)}
          items={[
            { label: "Hermosillo", value: "Hermosillo"},
            { label: "Cajeme", value: "Cajeme" },
            { label: "Caborca", value: "Caborca" },
            { label: "Nogales", value: "Nogales" },
            { label: "Santa Ana", value: "Santa Ana" },
            { label: "Navojoa", value: "Navojoa" },
          ]}
        />
        </View>
        <View>
          <View style={styles.images}>
            <Image source={require('../assets/Books.png')}/>
          </View>
          <Text style={styles.textInfo}>Carrera</Text>
          <RNPickerSelect style={styles.input}
            onValueChange={(career) => setCareer(career)}
            items={[
              { label: "Ingeniería en Sistemas", value: "Ingeniería en Sistemas"}
            ]}
          />
        </View>
        <View>
          <Text style={styles.textInfo}>Descripción</Text>
          <TextInput
                style={styles.input}
                value={desc}
                onChangeText={setDesc}
                placeholder="Ingrese una breve descripción"
          />
        </View>
        <View>
          <Text style={styles.textInfo}>Habilidades</Text>
          <TextInput
                style={styles.input}
                value={hab}
                onChangeText={setHab}
                placeholder="Ingrese sus habilidades en la carrera"
          />
        </View>
        <View>
          <View style={styles.images}>
            <Image source={require("../assets/Lock.png")}/>
          </View>
          <Text style={styles.textInfo}>Contraseña</Text>
          <View style={styles.passwordInput}>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword} // Ocultar o mostrar contraseña basado en el estado
                placeholderTextColor="#ccc"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={24} color="black" style={styles.ojo} />
              </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.images}>
              <Image source={require('../assets/Lock.png')}/>
          </View>
          <Text style={styles.textInfo}>Confirmar contraseña</Text>
          <View style={styles.passwordInput}>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword} // Ocultar o mostrar contraseña basado en el estado
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={24} color="black" style={styles.ojo} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tarjetaBottom}>
          <View style={styles.contText}>
            <Text>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={Login}>
            <Text style={styles.Text2}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.PadreBoton}>
                  <TouchableOpacity style={styles.cajaBoton} onPress={handleSubmit}>
                      <Image source={require('../assets/Arrow - Right.png')} style={{marginLeft:20, marginTop:20}}/>
                  </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor:'white',
    paddingTop:10,
    paddingBottom: 20
  },
  images:{
    left: 4,
    top:30
  },
  textInfo:{
    color: 'rgb(193, 198, 208)',
    fontSize: 16,
    marginLeft:40,
    top:8
  },
  input: {
    paddingVertical:0,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(193, 198, 208)',
    borderRadius:0,
    marginVertical:10,
    flex:1
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  contText:{
    flexDirection: 'row', // Establece la dirección del contenedor como fila
    alignItems: 'center', // Alinea los elementos verticalmente en el centro
    justifyContent: 'center',
  },
  Text1:{
    color: 'rgb(170,170,170)',
    fontSize: 16,
    marginHorizontal: 3, 
  },
  Text2:{
    color:'rgb(247, 161, 26)',
    fontSize: 16
  },
  tarjetaBottom:{
    flex:2,
    flexDirection: 'row',
  },
  PadreBoton:{
    alignItems:'center',
    borderRadius:90,
    marginTop:28,
    marginLeft: 30
  },
  cajaBoton:{
    backgroundColor:'rgb(1, 51, 151)',
    borderRadius:40,
    width:60,
    height:60,
    marginTop:0
  },
  passwordInput:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    marginVertical: 10,
  },
  ojo:{
    marginRight:10,
  }
});

export default Registrarse;
