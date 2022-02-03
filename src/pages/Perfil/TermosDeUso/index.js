import { useNavigation } from '@react-navigation/native';
import { uniqueId } from 'lodash';
import React, { useLayoutEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SetaEsquerda from '~/assets/icons/seta_esquerda.svg';
import termoDeUso from './termo-de-uso.json';

export default function TermosDeUsoScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Termos de Uso',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <SetaEsquerda />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View>
        <Text style={estilos.titulo}>TERMOS E CONDIÇÕES DE USO</Text>
      </View>
      <View style={estilos.conteudoTexto}>
        {termoDeUso.paragrafos.map(paragrafo => (
          <Text key={uniqueId('paragrafo')} style={estilos.texto}>
            {paragrafo}
          </Text>
        ))}
        {termoDeUso.secoes.map(secao => (
          <View key={uniqueId('secao')}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
                color: '#000000',
              }}>
              {secao.titulo}
            </Text>
            {secao.paragrafos.map(paragrafo => (
              <Text key={uniqueId('paragrafo')} style={estilos.texto}>
                {paragrafo}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 23,
    marginTop: 30,
    textAlign: 'center',
    color: '#000000',
  },
  conteudoTexto: { marginHorizontal: 16, marginBottom: 50 },
  texto: {
    color: '#000000',
    opacity: 0.6,
    fontSize: 14,
    marginBottom: 8,
    marginTop: 8,
    textAlign: 'justify',
  },
});
