import React, { useEffect, useLayoutEffect } from 'react';
import { BackHandler, View } from 'react-native';
import { cabecalhoVoltarHome } from '~/components/layoutEffect/cabecalhoLayout';
import DefaultLogin from '~/components/loginLayout/DefaultLogin';
import rotas from '~/constantes/rotas';

const LoginQualiQuiz = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      navigation.navigate(rotas.HOME);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  }, []);
  useLayoutEffect(() =>
    cabecalhoVoltarHome(
      {
        navegador: navigation,
        cor: 'verde',
        titulo: 'QualiQuiz',
      },
      [],
    ),
  );

  return (
    <View>
      <DefaultLogin rotaAposLogin={rotas.QUALIQUIZ} />
    </View>
  );
};

export default LoginQualiQuiz;
