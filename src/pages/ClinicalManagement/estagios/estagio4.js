import React from 'react';
import {
  Text, View, Image, StyleSheet
} from 'react-native';

import {
  Paragraph
} from 'react-native-paper';
import estagio4 from '../json/estagio4.json';
import Pulmao from '../../../assets/icons/estagiosManejo/pulmao.png';

const Estagio4 = ({ navigation }) => {
  const secoes = [
    secao1 => (
      <View key="1">
        <Paragraph style={estilo.corDoTexto}>
          {secao1.texto1}
          <Text onPress={() => navigation.navigate('manejoWebview', { title: secao1.link.titulo, url: secao1.link.url })} style={estilo.link}>{secao1.link.texto}</Text>
          {secao1.texto}
          {secao1.iconeAtualizacao}
        </Paragraph>
      </View>
    ),
    secao2 => (
      <View key="2">
        <Paragraph style={{ ...estilo.corDoTexto, ...estilo.margin12 }}>
          {secao2.texto1}
          <Text onPress={() => navigation.navigate('manejoWebview', { title: secao2.link.titulo, url: secao2.link.url })} style={estilo.link}>{secao2.link.texto}</Text>
          {secao2.texto2}
        </Paragraph>
        {
          secao2.paragrafos.map((paragrafo, index) => {
            if (index === 0) {
              return (
                <Paragraph key={paragrafo.texto} style={estilo.corDoTexto}>
                  {paragrafo.texto}
                  <Text style={estilo.destaque}>{paragrafo.destaque ? paragrafo.destaque : ''}</Text>
                  <Text onPress={() => navigation.navigate('manejoWebview', { title: paragrafo.link.titulo, url: paragrafo.link.url })} style={estilo.link}>{paragrafo.link.texto}</Text>
                  {paragrafo.iconeAtualizacao}
                </Paragraph>
              );
            }
            return (
              <Paragraph key={paragrafo.texto} style={estilo.corDoTexto}>
                {paragrafo.texto}
                <Text style={estilo.destaque}>{paragrafo.destaque ? paragrafo.destaque : ''}</Text>
                <Text onPress={() => navigation.navigate('manejoWebview', { title: paragrafo.link.titulo, url: paragrafo.link.url })} style={estilo.link}>{paragrafo.link.texto}</Text>
              </Paragraph>
            );
          })
        }
      </View>
    ),
    secao3 => (
      <View key="3">
        <Paragraph style={{ ...estilo.margin12, ...estilo.corDoTexto }}>
          <Text style={estilo.destaque}>{secao3.destaque}</Text>
          {secao3.texto1}
          <Text
            onPress={() => navigation.navigate('manejoWebview', { title: secao3.link.titulo, url: secao3.link.url })}
            style={estilo.link}
          >
            {secao3.link.texto}
          </Text>
        </Paragraph>
        <View style={estilo.containerImagem}>
            <Image source={Pulmao} />
        </View>
      </View>
    ),
    secao4 => (
      <Paragraph key="4" style={{ ...estilo.margin12, ...estilo.corDoTexto }}>
        <Text style={estilo.destaque}>
          {secao4.destaque}
        </Text>
        {secao4.texto1}
        <Text onPress={() => navigation.navigate('manejoWebview', { title: secao4.link.titulo, url: secao4.link.url })} style={estilo.link}>
        {secao4.link.texto}
        </Text>
      </Paragraph>
    ),
    secao5 => (
      <Text key="5" style={{ ...estilo.margin12, ...estilo.corDoTexto }}>
        {secao5.texto}
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
