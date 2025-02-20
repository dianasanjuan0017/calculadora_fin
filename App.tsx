import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './app/Components/Header';
import Propinas from './app/screens/Propinas';
import Footer from './app/Components/Foother';

export default function App() {
  return (
    <View style={styles.container}>
      <Header 
        titulo='Calculadora de Propinas'
        nombre='DIANA MONSERRAT ONTIVEROS SANJUAN'
        imagen={require('./assets/guero.png')}
      />
      <Propinas />
      <Footer fecha='2025-02-07' telefono='614-123-4567' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff', // Asegúrate de tener un color de fondo
  },
});
