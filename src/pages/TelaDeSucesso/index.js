import React, { useEffect } from 'react';
import {
  Text, View, SafeAreaView, StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BarraDeStatus from '../../components/barraDeStatus';
import Check from '../../assets/icons/check.svg';

function TelaDeSucesso({ route }) {
  const { textoApresentacao, telaDeRedirecionamento, telaDeBackground } = route.params;
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(telaDeRedirecionamento);
    }, 4000);
  }, []);
  return (
    <>
      <BarraDeStatus backgroundColor={telaDeBackground} barStyle="light-content" />
      <View style={{ backgroundColor: telaDeBackground }}>
        <SafeAreaView style={estilos.safeArea}>
          <Check />
          <Text style={estilos.textoApresentacao}>
            { textoApresentacao }
          </Text>
        </SafeAreaView>
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  // background: {
  //   backgroundColor: '#4CAF50',
  // },
  safeArea: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textoApresentacao: {
    textAlign: 'center',
    fontSize: 24,
    color: '#ffffff',
    marginTop: 32,
    marginHorizontal: 10
  }
});

export default TelaDeSucesso;
