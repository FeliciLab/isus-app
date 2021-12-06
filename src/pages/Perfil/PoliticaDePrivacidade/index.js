import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SetaEsquerda from '../../../assets/icons/seta_esquerda.svg';
import politicaPrivacidade from './politica-privacidade.json';
import { uniqueId } from 'lodash';
import estilos from './styles';


export default function PoliticaDePrivacidadeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Política de Privacidade',
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
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
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
                color: '#000000'
              }}
            >
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

