import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CabecalhoPerfil({ nome }) {
  return (
    <View style={estilos.espacamento}>
      <Text style={estilos.nome}>
      Olá,
      {' '}
      {nome}
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  nome: {
    fontSize: 24,
    fontWeight: 'normal'
  },
  espacamento: {
    marginVertical: 10
  }
});
