import React, { useLayoutEffect, useEffect } from 'react';
import { View, BackHandler } from 'react-native';
import { cabecalhoVoltarHome } from '../../../components/layoutEffect/cabecalhoLayout';
import DefaultLogin from '../../../components/loginLayout/DefaultLogin';

const LoginQualiQuiz = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('HOME');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
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
        titulo: 'QualiQuiz'
      },
      []
    )
  );

  return (
    <View>
      <DefaultLogin rotaAposLogin="QUALIQUIZ" />
    </View>
  );
};

export default LoginQualiQuiz;
