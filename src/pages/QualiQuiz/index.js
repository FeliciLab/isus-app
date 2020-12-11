import React, { useLayoutEffect, useContext, useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { Config } from 'react-native-config';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import IsusSvg from '../../assets/icons/isus_hor.svg';
import { cabecalhoVoltar } from '../../components/layoutEffect/cabecalhoLayout';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';

export default function QualiQuiz({ navigation }) {
  const navigator = useNavigation();
  const { estaLogado, tokenUsuario } = useContext(AutenticacaoContext);

  const handleEffect = () => {
    setTimeout(() => {
      if (!estaLogado) {
        navigation.navigate('QUALIQUIZ_LOGIN');
      } else {
        navigator.navigate(
          'webview',
          {
            title: 'QualiQuiz',
            url: `${Config.QUALIQUIZ_URL}/isus/login/1/${tokenUsuario.access_token}`,
            rota: 'HOME'
          }
        );
      }
    }, 1500);
  };

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
  });

  useFocusEffect(() => {
    handleEffect();
  }, [estaLogado, handleEffect]);

  useLayoutEffect(() => cabecalhoVoltar({
    title: 'QualiQuiz',
    navegador: navigation,
    cor: 'verde'
  }));

  return (
    <>
      <View
        style={{
          flexDirection: 'column',
          paddingTop: '20%',
          alignItems: 'center'
        }}
      >
        <IsusSvg height={250} width={250} />
        <Text>{estaLogado}</Text>
      </View>
    </>
  );
}
