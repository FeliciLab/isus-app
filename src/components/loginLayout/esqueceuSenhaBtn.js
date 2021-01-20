import React from 'react';
import { Config } from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { CORES } from '../../constantes/estiloBase';

const esqueceuSenhaBtn = ({ style }) => {
  const navigator = useNavigation();
  const abrirWebView = () => {
    navigator.navigate('webview', {
      title: 'Esqueci minha senha',
      url: `${Config.IDSAUDE_URL}/auth/realms/saude/login-actions/reset-credentials?client_id=account`,
      idSaude: true
    });
  };

  return (
    <>
      <Text
        onPress={() => abrirWebView()}
        style={{
          color: CORES.LARANJA,
          letterSpacing: 1,
          textAlign: 'center',
          fontWeight: 'bold',
          ...style
        }}
      >
        Esqueci minha senha
      </Text>
    </>
  );
};

export default esqueceuSenhaBtn;
