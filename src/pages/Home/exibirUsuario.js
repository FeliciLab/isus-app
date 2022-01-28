import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AutenticacaoContext } from '~/context/AutenticacaoContext';

const ExibirUsuario = () => {
  const { pessoa } = useContext(AutenticacaoContext);

  return (
    <View>
      <Text style={style.perfil}>
        Olá, {pessoa?.nomeCompleto?.split(' ')[0] || ''}
      </Text>
      <Text style={style.atuacaoCategoria}>
        {pessoa?.categoriaProfissional?.nome || ''}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  semPerfil: {
    backgroundColor: '#fff',
  },
  perfil: {
    backgroundColor: '#fff',
    color: '#000',
    paddingTop: 15,
    paddingLeft: 16,
    fontSize: 34,
  },
  atuacaoCategoria: {
    backgroundColor: '#fff',
    color: 'rgba(0,0,0,0.6)',
    paddingTop: -10,
    paddingLeft: 18,
    paddingBottom: 10,
    fontSize: 15,
    fontStyle: 'italic',
  },
});

export default ExibirUsuario;
