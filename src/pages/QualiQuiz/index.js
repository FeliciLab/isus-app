import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import { Config } from 'react-native-config';
import QualiQuizLogo from '~/assets/images/qualiquiz/logo.svg';
import BarraDeStatus from '~/components/BarraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import { Container, Content, TextContent } from './styles';

export default function QualiQuiz({ navigation }) {
  const navigator = useNavigation();

  const { token } = useAutenticacao();

  const timeOutRef = useRef();

  const handleEffect = () => {
    timeOutRef.current = setTimeout(() => {
      navigator.navigate(rotas.WEBVIEW_PAGE, {
        title: 'Voltar ao iSUS',
        url: `${Config.QUALIQUIZ_URL}/isus/login/1/${token.accessToken}`,
        navigationOptions: {
          headerStyle: {
            backgroundColor: CORES.QUALIQUIZ,
          },
          headerTitleAlign: 'left',
        },
        barraDeStatusProps: {
          backgroundColor: CORES.QUALIQUIZ,
        },
        backButtonRedirectRoute: rotas.HOME,
        activityIndicatorProps: {
          color: CORES.QUALIQUIZ,
        },
      });
    }, 1500);
  };

  useEffect(() => {
    const backAction = () => {
      clearTimeout(timeOutRef.current);
      navigation.navigate(rotas.HOME);
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  useFocusEffect(() => {
    handleEffect();
  });

  return (
    <Container>
      <BarraDeStatus
        backgroundColor={CORES.QUALIQUIZ}
        barStyle="light-content"
      />
      <Content>
        <QualiQuizLogo height={250} width={250} />
        <TextContent>Carregando, aguarde um instante...</TextContent>
      </Content>
    </Container>
  );
}
