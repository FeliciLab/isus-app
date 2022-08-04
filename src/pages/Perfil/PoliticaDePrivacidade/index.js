import { useNavigation } from '@react-navigation/native';
import { uniqueId } from 'lodash';
import React, { useLayoutEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SetaEsquerda from '~/assets/icons/seta_esquerda.svg';
import { CORES } from '~/constantes/estiloBase';
import politicaPrivacidade from './politica-privacidade.json';
import estilos from './styles';

export default function PoliticaDePrivacidade() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.VERDE,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: 'Política de Privacidade',
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
    <ScrollView style={{ backgroundColor: CORES.BRANCO }}>
      <View style={estilos.conteudoTexto}>
        {politicaPrivacidade.paragrafos.map(paragrafo => (
          <Text key={uniqueId('paragrafo')} style={estilos.texto}>
            {paragrafo}
          </Text>
        ))}
        {politicaPrivacidade.secoes.map(secao => (
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
