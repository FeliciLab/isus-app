import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  semPerfil: {
    backgroundColor: '#fff'
  },
  perfil: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingLeft: 16,
    fontSize: 34
  },
  atuacaoCategoria: {
    backgroundColor: '#fff',
    color: 'rgba(0,0,0,0.6)',
    paddingTop: -10,
    paddingLeft: 18,
    paddingBottom: 10,
    fontSize: 15,
    fontStyle: 'italic'
  }
});

export default function ExibirUsuario({ dados }) {
  return (
    <View>
      <Text style={style.perfil}>
        Olá,
        {' '}
        {dados?.name?.split(' ')[0]}
      </Text>
      <Text style={style.atuacaoCategoria}>
        {/* eslint-disable-next-line */}
        {dados?.profissional?.categoria_profissional?.nome}
      </Text>
    </View>
  );
}
