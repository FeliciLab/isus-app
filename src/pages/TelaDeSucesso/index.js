import React, { useEffect } from 'react';
import {
  Text, View, SafeAreaView, StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Check from '../../assets/icons/check.svg';

function TelaDeSucesso({ route }) {
  const { textoApresentacao, telaDeRedirecionamento } = route.params;
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(telaDeRedirecionamento);
    }, 2000);
  }, []);
  return (
    <View style={estilos.background}>
      <SafeAreaView style={estilos.safeArea}>
        <Check />
        <Text style={estilos.textoApresentacao}>
          { textoApresentacao }
        </Text>
      </SafeAreaView>
    </View>
  );
}

const estilos = StyleSheet.create({
  background: {
    backgroundColor: '#4CAF50',
  },
  safeArea: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textoApresentacao: {
    textAlign: 'center',
    fontSize: 24,
    color: '#ffffff',
    marginTop: 32
  }
});

export default TelaDeSucesso;
