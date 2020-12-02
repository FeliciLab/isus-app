import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cores } from '../estiloBase';

const cadastrarNovoBtn = ({ style }) => {
  const navigator = useNavigation();
  const navegarCadastro = () => {
    navigator.navigate('CADASTRO');
  };

  return (
    <View style={{ ...style }}>
      <Text
        style={{
          textAlign: 'center',
          letterSpacing: 1
        }}
      >
        Ainda não tem o ID Saúde?
      </Text>
      <Text
        onPress={() => navegarCadastro()}
        style={{
          textAlign: 'center',
          letterSpacing: 1,
          color: cores.laranja,
          fontWeight: 'bold'
        }}
      >
        Cadastre-se agora
      </Text>
    </View>
  );
};

export default cadastrarNovoBtn;
