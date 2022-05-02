import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CabecalhoPerfil({ nome }) {
  return (
    <View style={styles.espacamento}>
      <Text style={styles.nome}>Olá, {nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nome: {
    fontSize: 24,
    fontWeight: 'normal',
    color: '#000',
  },
  espacamento: {
    marginVertical: 10,
  },
});
