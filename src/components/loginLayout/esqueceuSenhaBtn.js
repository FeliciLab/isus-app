import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { cores } from '../../constantes/estiloBase';

const esqueceuSenhaBtn = ({ style }) => {
  const navigator = useNavigation();
  const abrirWebView = () => {
    navigator.navigate(
      'webview',
      {
        title: 'Esqueci minha senha',
        url: 'https://dev.id.org.br/auth/realms/saude/login-actions/reset-credentials?client_id=account',
        idSaude: true
      }
    );
  };

  return (
    <>
      <Text
        onPress={() => abrirWebView()}
        style={{
          color: cores.laranja,
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
