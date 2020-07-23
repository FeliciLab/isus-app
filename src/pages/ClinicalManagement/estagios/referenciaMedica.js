import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';

export default function ReferenciaMedica({ navigation }) {
  return (
    <View style={estilos.espacamentoRodape}>
      <Paragraph style={estilos.textoDaReferencia}>
        Todas as informações disponíveis
        neste aplicativo foram cuidadosamentes selecionadas e verificadas pela
        {' '}
        <Text style={estilos.textoLink} onPress={() => navigation.navigate('manejoWebview', { title: 'Secretaria de Saúde', url: 'https://www.saude.ce.gov.br/' })}> Secretaria Estadual de Saúde</Text>
        {' '}
        e
        {' '}
        <Text style={estilos.textoLink} onPress={() => navigation.navigate('manejoWebview', { title: 'Escola de saúde', url: 'https://www.esp.ce.gov.br/' })}>Escola de Saúde Pública do Ceará.</Text>
      </Paragraph>
    </View>
  );
}

const estilos = StyleSheet.create({
  espacamentoRodape: {
    paddingTop: 30,
    paddingBottom: 20
  },
  textoDaReferencia: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 11,
  },
  textoLink: {
    color: '#4CAF50',
    textDecorationLine: 'underline'
  }
});
