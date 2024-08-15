import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { createUser } from '../hooks/auth_signup_password';
import RNPickerSelect from 'react-native-picker-select';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

const RegistrarCoordinadorPracticas = (props) => {
  // Estados para los valores de los campos del formulario
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [campus, setCampus] = useState('');
  const [career, setCareer] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    // Validar que todos los campos estén llenos
    if (!email || !name || !lastName || !campus || !password || !confirmPassword || !phone || !department) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Aquí puedes implementar la lógica para enviar los datos del formulario
    console.log('Formulario enviado:', { email, name, lastName, campus, password, confirmPassword, phone, department});

    rol = "3"
    createUser(email, password, name, lastName, campus, rol, phone, department);
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Nombre"
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        label="Apellido"
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        label="CorreoElectronico"
        placeholder="Correo Electronico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        label="Contraseña"
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        label="confirmPassword"
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TextInput
        style={styles.input}
        label="Telefono"
        placeholder="Telefono"
        value={phone}
        onChangeText={setPhone}
      />
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
      <Text style={styles.textInfo}>Departamento</Text>
        <RNPickerSelect style={styles.input}
          onValueChange={(department) => setDepartment(department)}
          items={[
            { label: "Ingenieria en Sistemas", value: "Ingenieria en Sistemas"}
          ]}
        />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    button: {
      backgroundColor: "#007BFF",
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
  });

export default RegistrarCoordinadorPracticas;