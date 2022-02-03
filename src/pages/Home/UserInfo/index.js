import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useAutenticacao from '~/hooks/useAutenticacao';

const UserInfo = () => {
  const { pessoa } = useAutenticacao();

  return (
    <View>
      <Text style={styles.perfil}>
        Olá, {pessoa?.nomeCompleto?.split(' ')[0] || ''}
      </Text>
      <Text style={styles.atuacaoCategoria}>
        {pessoa?.categoriaProfissional?.nome || ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default UserInfo;
