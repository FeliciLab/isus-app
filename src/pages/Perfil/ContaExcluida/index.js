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
import BarraDeStatus from '~/components/BarraDeStatus';
import rotas from '~/constantes/rotas';
import { CORES } from '~/constantes/estiloBase';

export default function ContaExcluida() {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.navigate(rotas.HOME);
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
        backgroundColor: CORES.INDIGO,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: CORES.INDIGO,
      headerTitleAlign: 'center',
      headerTitle: '',
    });
  }, []);

  return (
    <ScrollView>
      <BarraDeStatus backgroundColor={CORES.INDIGO} barStyle="light-content" />
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
            color={CORES.BRANCO}
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
    backgroundColor: CORES.INDIGO,
    flex: 1,
  },
  imagemUser: {
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  textoInfo: {
    width: widthView - widthView * 0.05,
    color: CORES.BRANCO,
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
