import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { BackHandler, View } from 'react-native';
import { Config } from 'react-native-config';
import IsusSvg from '~/assets/icons/isus_hor.svg';
import { cabecalhoVoltar } from '~/components/layoutEffect/cabecalhoLayout';
import useAutenticacao from '~/hooks/useAutenticacao';

export default function QualiQuiz({ navigation }) {
  const navigator = useNavigation();

  const { user, token } = useAutenticacao();

  const handleEffect = () => {
    setTimeout(() => {
      if (!user) {
        navigation.navigate('QUALIQUIZ_LOGIN');
      } else {
        navigator.navigate('webview', {
          title: 'Voltar ao iSUS',
          url: `${Config.QUALIQUIZ_URL}/isus/login/1/${token.access_token}`,
          rota: 'HOME',
          navigationOptions: {
            headerStyle: {
              backgroundColor: '#4E377C',
            },
            headerTitleAlign: 'left',
          },
        });
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
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  useFocusEffect(() => {
    handleEffect();
  });

  useLayoutEffect(
    () =>
      cabecalhoVoltar({
        title: 'QualiQuiz',
        navegador: navigation,
        cor: 'verde',
      }),
    [],
  );

  return (
    <View
      style={{
        flexDirection: 'column',
        paddingTop: '20%',
        alignItems: 'center',
      }}>
      <IsusSvg height={250} width={250} />
    </View>
  );
}
