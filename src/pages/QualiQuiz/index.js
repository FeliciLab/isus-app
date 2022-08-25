import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import { Config } from 'react-native-config';
import QualiQuizLogo from '~/assets/images/qualiquiz/logo.svg';
import BarraDeStatus from '~/components/BarraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';

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
    <View style={styles.container}>
      <BarraDeStatus
        backgroundColor={CORES.QUALIQUIZ}
        barStyle="light-content"
      />
      <View style={styles.content}>
        <QualiQuizLogo height={250} width={250} />
        <Text style={styles.textContent}>
          Carregando, aguarde um instante...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CORES.QUALIQUIZ_LIGTH,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    textAlign: 'center',
    color: CORES.BRANCO,
    lineHeight: 19,
    fontWeight: '500',
    fontSize: 16.5,
    marginTop: 38,
  },
});
