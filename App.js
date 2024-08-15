import 'react-native-get-random-values'

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// stack
import 'react-native-gesture-handler';
import Navigation from './components/Navigation'
import { UserProvider } from './context/userContext';


export default function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
