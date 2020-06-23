import React from 'react';
import {
  Text, View,
  StyleSheet
} from 'react-native';

import { Paragraph } from 'react-native-paper';
import checkPlatform from '../../utils/PDF';
import Internação from './json/estágio3.json';

const Estágio3 = ({ navigation }) => {
  const seções = [
    seção1 => (
      <>
        <Paragraph>
          {seção1.texto1}
          <Text style={estilo.destaque}>
            {seção1.destaque}
          </Text>
          {seção1.texto2}
          <Text onPress={() => navigation.navigate('webview', { title: seção1.link.título, url: seção1.link.url })} style={estilo.link}>{seção1.link.texto}</Text>
        </Paragraph>
        {seção1.itens.map(item => (
            <Paragraph key={item.id}>
              {item.descrição}
            </Paragraph>
        ))}
      </>
    ),
    seção2 => (
      <Paragraph style={estilo.margin8}>
      <Text style={estilo.destaque}>{seção2.destaque}</Text>
      {seção2.texto1}
      <Text onPress={() => (checkPlatform(seção2.link.url, 'Restricao do uso do oseltamivir.pdf'))} style={estilo.link}>{seção2.link.texto}</Text>
      {seção2.texto2}
      </Paragraph>
    ),
    seção3 => (
      <Paragraph>
        <Text style={estilo.destaque}>{seção3.destaque}</Text>
        {seção3.texto1}
      <Text onPress={() => navigation.navigate('webview', { title: seção3.link.título, url: seção3.link.url })} style={estilo.link}>{seção3.link.texto}</Text>
      </Paragraph>
    ),
    seção4 => (
      <Paragraph>
        <Text style={estilo.destaque}>{seção4.destaque}</Text>
        {seção4.texto1}
        <Text onPress={() => navigation.navigate('webview', { title: seção4.link.título, url: seção4.link.url })} style={estilo.link}>{seção4.link.texto}</Text>
      </Paragraph>
    ),
    seção5 => (
      <Paragraph style={estilo.margin8}>
        {seção5.texto1}
        <Text style={estilo.destaque}>{seção5.destaque}</Text>
        <Text onPress={() => navigation.navigate('webview', { title: seção5.link.título, url: seção5.link.url })} style={estilo.link}>{ seção5.link.text }</Text>
      </Paragraph>
    ),
    seção6 => (
      <Paragraph>
        {seção6.texto}
      </Paragraph>
    )
  ];

  return (
    <>
    <View style={estilo.margin20}>
      { seções.map((gerarSeção, index) => gerarSeção(Internação.seções[index]))}
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

export default Estágio3;
