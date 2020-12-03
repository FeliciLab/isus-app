import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { cabecalhoVoltarHome } from '../../../components/layoutEffect/cabecalhoLayout';
import DefaultLogin from '../../../components/loginLayout/DefaultLogin';

const LoginQualiQuiz = ({ navigation }) => {
  useLayoutEffect(() => cabecalhoVoltarHome({
    navegador: navigation,
    cor: 'verde',
    titulo: 'QualiQuiz'
  }));

  return (
    <View>
      <DefaultLogin rotaAposLogin="QUALIQUIZ" />
    </View>
  );
};

export default LoginQualiQuiz;
