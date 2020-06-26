import React from 'react';
import {
  Text, View, Image, StyleSheet
} from 'react-native';

import {
  Paragraph
} from 'react-native-paper';
import estagio4 from './json/estagio4.json';
import Pulmao from '../../assets/icons/estagiosManejo/pulmao.png';

const Estagio4 = ({ navigation }) => {
  const secoes = [
    secao1 => (
      <View key="1">
        <Paragraph style={estilo.corDoTexto}>
          {secao1.texto1}
          <Text onPress={() => navigation.navigate('webview', { title: secao1.link.titulo, url: secao1.link.url })} style={estilo.link}>{secao1.link.text}</Text>
          {secao1.texto2}
        </Paragraph>
        <Paragraph style={estilo.corDoTexto}>
            {secao1.item.texto}
            <Text onPress={() => navigation.navigate('webview', { title: secao1.item.link.titulo, url: secao1.item.link.url })} style={estilo.link}>{secao1.item.link.texto}</Text>
        </Paragraph>
      </View>
    ),
    secao2 => (
      <View key="2">
        <Paragraph style={{ ...estilo.margin12, ...estilo.corDoTexto }}>
          <Text style={estilo.destaque}>{secao2.destaque}</Text>
          {secao2.texto1}
          <Text
            onPress={() => navigation.navigate('webview', { title: secao2.link.titulo, url: secao2.link.url })}
            style={estilo.link}
          >
            {secao2.link.texto}
          </Text>
        </Paragraph>
        <View style={estilo.containerImagem}>
            <Image source={Pulmao} />
        </View>
      </View>
    ),
    secao3 => (
      <Paragraph key="3" style={{ ...estilo.margin12, ...estilo.corDoTexto }}>
        <Text style={estilo.destaque}>
          {secao3.destaque}
        </Text>
        {secao3.texto1}
        <Text onPress={() => navigation.navigate('webview', { title: secao3.link.titulo, url: secao3.link.url })} style={estilo.link}>
        {secao3.link.texto}
        </Text>
      </Paragraph>
    ),
    secao4 => (
      <Text key="4" style={{ ...estilo.margin12, ...estilo.corDoTexto }}>
        {secao4.texto}
      </Text>
    )
  ];

  return (
    <>
      <View style={estilo.margin12}>
        { secoes.map((gerarSecao, index) => gerarSecao(estagio4.secoes[index])) }
      </View>
    </>
  );
};

const estilo = StyleSheet.create({
  corDoTexto: { color: 'rgba(0, 0, 0, 0.6)' },
  margin12: { marginTop: 12 },
  destaque: { fontWeight: 'bold' },
  link: { color: '#F2453D', textDecorationLine: 'underline' },
  containerImagem: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }
});

export default Estagio4;
