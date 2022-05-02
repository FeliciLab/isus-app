import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { CORES } from '~/constantes/estiloBase';
import ROTAS from '~/constantes/rotas';

// TODO: remover depois
const cadastrarNovoBtn = ({ style }) => {
  const navigator = useNavigation();
  const navegarCadastro = () => {
    navigator.navigate(ROTAS.CADASTRO);
  };

  return (
    <View style={{ ...style }}>
      <Text
        style={{
          textAlign: 'center',
          letterSpacing: 1,
        }}>
        Ainda não tem o ID Saúde?
      </Text>
      <Text
        onPress={() => navegarCadastro()}
        style={{
          textAlign: 'center',
          letterSpacing: 1,
          color: CORES.LARANJA,
          fontWeight: 'bold',
        }}>
        Cadastre-se agora
      </Text>
    </View>
  );
};

export default cadastrarNovoBtn;
