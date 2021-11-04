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
  });

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View>
        <Text style={estilos.titulo}>POLÍTICA DE PRIVACIDADE</Text>
      </View>
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
                textAlign: 'center'
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
      <TouchableOpacity
        style={estilos.button}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={estilos.texto_button}>LI E ACEITO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// const estilos = StyleSheet.create({
//   titulo: { fontSize: 23, marginTop: 30, textAlign: 'center' },
//   conteudoTexto: { marginHorizontal: 16, marginBottom: 50 },
//   texto: {
//     color: '#000000',
//     opacity: 0.6,
//     fontSize: 14,
//     marginBottom: 8,
//     marginTop: 8,
//     textAlign: 'justify'
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     marginBottom: 28,
//     marginHorizontal: 16
//   },
//   texto_button: {
//     color: '#FFFFFF',
//     fontSize: 14
//   }
// });
