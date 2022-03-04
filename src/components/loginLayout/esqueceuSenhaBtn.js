import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { Config } from 'react-native-config';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';

const esqueceuSenhaBtn = ({ style }) => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  const abrirWebView = () => {
    // eslint-disable-next-line no-unused-expressions
    netInfo.isConnected
      ? navigation.navigate('webview', {
        title: 'Esqueci minha senha',
        url: `${Config.IDSAUDE_URL}/auth/realms/saude/login-actions/reset-credentials?client_id=account`,
        idSaude: true,
      })
      : navigation.navigate(rotas.SEM_CONEXAO, {
        componente: 'webview',
        title: 'Esqueci minha senha',
        url: `${Config.IDSAUDE_URL}/auth/realms/saude/login-actions/reset-credentials?client_id=account`,
        idSaude: true,
      });
  };

  return (
    <Text
      onPress={() => abrirWebView()}
      style={{
        color: CORES.LARANJA,
        letterSpacing: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        ...style,
      }}>
      Esqueci minha senha
    </Text>
  );
};

export default esqueceuSenhaBtn;
