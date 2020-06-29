import React from 'react';
import {
  Text, View,
  StyleSheet
} from 'react-native';

import { Paragraph } from 'react-native-paper';
import checkPlatform from '../../utils/PDF';
import iternacao from './json/estagio3.json';

const Estagio3 = ({ navigation }) => {
  const secoes = [
    secao1 => (
      <View key="1">
        <Paragraph>
          {secao1.texto1}
          <Text style={estilo.destaque}>
            {secao1.destaque}
          </Text>
          {secao1.texto2}
          <Text onPress={() => navigation.navigate('webview', { title: secao1.link.titulo, url: secao1.link.url })} style={estilo.link}>{secao1.link.texto}</Text>
        </Paragraph>
        {secao1.itens.map(item => (
            <Paragraph key={item.id}>
              {item.descricao}
            </Paragraph>
        ))}
      </View>
    ),
    secao2 => (
      <Paragraph key="2" style={estilo.margin8}>
      <Text style={estilo.destaque}>{secao2.destaque}</Text>
      {secao2.texto1}
      <Text onPress={() => (checkPlatform(secao2.link.url, 'Restricao do uso do oseltamivir.pdf'))} style={estilo.link}>{secao2.link.texto}</Text>
      {secao2.texto2}
      </Paragraph>
    ),
    secao3 => (
      <Paragraph key="3">
        <Text style={estilo.destaque}>{secao3.destaque}</Text>
        {secao3.texto1}
      <Text onPress={() => navigation.navigate('webview', { title: secao3.link.titulo, url: secao3.link.url })} style={estilo.link}>{secao3.link.texto}</Text>
      </Paragraph>
    ),
    secao4 => (
      <Paragraph key="4">
        <Text style={estilo.destaque}>{secao4.destaque}</Text>
        {secao4.texto1}
        <Text onPress={() => navigation.navigate('webview', { title: secao4.link.titulo, url: secao4.link.url })} style={estilo.link}>{secao4.link.texto}</Text>
      </Paragraph>
    ),
    secao5 => (
      <Paragraph key="5" style={estilo.margin8}>
        {secao5.texto1}
        <Text style={estilo.destaque}>{secao5.destaque}</Text>
        <Text onPress={() => navigation.navigate('webview', { title: secao5.link.titulo, url: secao5.link.url })} style={estilo.link}>{ secao5.link.texto }</Text>
      </Paragraph>
    ),
    secao6 => (
      <Paragraph key="6">
        {secao6.texto}
      </Paragraph>
    )
  ];

  return (
    <>
    <View style={estilo.margin20}>
      { secoes.map((gerarSecao, index) => gerarSecao(iternacao.secoes[index]))}
    </View>
    </>
  );
};

const estilo = StyleSheet.create({
  destaque: { fontWeight: 'bold' },
  link: { textDecorationLine: 'underline', color: '#FF9800' },
  margin8: { marginVertical: 8 },
  margin20: { marginTop: 20 }
});

export default Estagio3;
