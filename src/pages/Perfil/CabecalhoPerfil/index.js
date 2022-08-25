import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CORES } from '~/constantes/estiloBase';

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
    color: CORES.PRETO,
  },
  espacamento: {
    marginVertical: 10,
  },
});
