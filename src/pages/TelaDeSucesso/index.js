import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Check from '~/assets/icons/check.svg';
import BarraDeStatus from '~/components/BarraDeStatus';

function TelaDeSucesso({ route }) {
  const navigation = useNavigation();

  const {
    textoApresentacao,
    telaDeRedirecionamento,
    telaDeBackground,
  } = route.params;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(telaDeRedirecionamento);
    }, 4000);
  }, []);

  return (
    <View style={{ backgroundColor: telaDeBackground }}>
      <BarraDeStatus
        backgroundColor={telaDeBackground}
        barStyle="light-content"
      />
      <SafeAreaView style={estilos.safeArea}>
        <Check />
        <Text style={estilos.textoApresentacao}>{textoApresentacao}</Text>
      </SafeAreaView>
    </View>
  );
}

const estilos = StyleSheet.create({
  safeArea: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoApresentacao: {
    textAlign: 'center',
    fontSize: 24,
    color: '#ffffff',
    marginTop: 32,
    marginHorizontal: 10,
  },
});

export default TelaDeSucesso;
