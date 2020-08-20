import React, { useLayoutEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SetaEsquerda from '../../../assets/icons/seta_esquerda.svg';
import BarraDeStatus from '../../../components/barraDeStatus';

export default function TermosDeUsoScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#304FFE',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Termos de Uso',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
           <SetaEsquerda />
        </TouchableOpacity>
      )
    });
  });

  return (
    <>
    <BarraDeStatus barStyle="light-content" backgroundColor="#304FFE" />
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View>
        <Text style={estilos.titulo}>Termos de uso do ID Saúde</Text>
      </View>
      <View style={estilos.conteudoTexto}>
        <Text style={estilos.texto}>
          Textooooo
        </Text>
        <Text style={estilos.texto}>
          Textooooo 1
        </Text>
        <Text style={estilos.texto}>
          Textooooo 2
        </Text>
      </View>
    </ScrollView>
    </>
  );
}

const estilos = StyleSheet.create({
  titulo: { fontSize: 24, left: 16, top: 30 },
  conteudoTexto: { marginHorizontal: 16, marginBottom: 50 },
  texto: {
    color: '#000000', opacity: 0.6, fontSize: 14, marginBottom: 10, top: 50
  }
});
