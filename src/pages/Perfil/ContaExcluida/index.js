import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import {
  BackHandler,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import DeletarConta from '~/assets/images/deletar_conta.svg';
import BarraDeStatus from '~/components/barraDeStatus';
import rotas from '~/constantes/rotas';

export default function ContaExcluida() {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('HOME');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4054B2',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#4054B2',
      headerTitleAlign: 'center',
      headerTitle: '',
    });
  }, []);

  return (
    <ScrollView>
      <BarraDeStatus backgroundColor="#4054B2" barStyle="light-content" />
      <View style={estilos.container}>
        <View style={estilos.parteCenter}>
          <DeletarConta style={estilos.imagemUser} />
          <Text style={estilos.textoInfo}>
            Conta excluída com sucesso. Esta ação não pode ser desfeita, mas
            você pode criar novamente uma conta quando quiser.
          </Text>
          <Text style={estilos.textoInfo}>
            Esperamos que você retorne em breve.
          </Text>
          <Button
            color="#fff"
            mode="contained"
            style={estilos.botaoOk}
            onPress={() => navigation.navigate(rotas.HOME)}>
            OK
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
const widthView = Dimensions.get('window').width;
const heightViewAux = Dimensions.get('window').height / 2;
const heightView = Dimensions.get('window').height;

const estilos = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    width: widthView,
    flexDirection: 'row',
    flex: 1,
  },
  parteCenter: {
    alignSelf: 'center',
    height: heightView,
    backgroundColor: '#4054B2',
    flex: 1,
  },
  imagemUser: {
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  textoInfo: {
    width: widthView - widthView * 0.05,
    color: '#fff',
    alignSelf: 'center',
    marginTop: 32,
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
  },
  botaoOk: {
    width: 145,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: heightViewAux,
    height: 48,
    marginTop: 37,
  },
});
