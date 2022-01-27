import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MenuPerfil({ titulo, children }) {
  return (
    <View style={estilos.menuContainer}>
      <Text style={estilos.titulo}>{titulo}</Text>
      {children}
    </View>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
    marginTop: 15,
    color: '#000',
  },
  menuContainer: {
    flexDirection: 'column',
    marginBottom: -10,
  },
});
