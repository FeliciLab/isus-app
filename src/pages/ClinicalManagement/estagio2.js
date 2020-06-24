/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import {
  Text, View, StyleSheet
} from 'react-native';

import {
  Paragraph
} from 'react-native-paper';
import Emergecia from './json/estagio2.json';
import checkPlatform from '../../utils/PDF';

const Estagio2 = ({ navigation }) => {
  const {
    titulo, secoes
  } = Emergecia.AvalicaoPresencial;

  const RenderizarTexto = ({ secao }) => {
    if (typeof secao.descrição === 'object') {
      return (
            <Paragraph>
              <Text style={estilo.TextoCinza}>
                  {secao.descricao.trecho1}
              </Text>
              {' '}
              <Text style={estilo.Link} onPress={() => navigation.navigate('manejoWebview', { title: secao.descricao.link1.titulo, url: secao.descricao.link1.url })}>
                  {secao.descricao.link1.trecho}
              </Text>
              <Text style={estilo.TextoCinza}>
                {secao.descricao.trecho2}
              </Text>
              <Text style={estilo.Link} onPress={() => (checkPlatform(secao.descricao.link2.url, 'Restricao do uso do oseltamivir.pdf'))}>
                  {secao.descricao.link2.trecho}
              </Text>
            </Paragraph>
      );
    }
    return (
      <>
        <Text style={estilo.TextoCinza}>
            {secao.descrição}
        </Text>
        {secao.paragrafos && secao.parágrafos.map(paragrafo => (
          <Paragraph key={paragrafo.id} style={estilo.TextoCinza}>
            <RenderizarParagrafo paragrafo={paragrafo} />
          </Paragraph>
        ))}
      </>
    );
  };

  const RenderizarParagrafo = ({ paragrafo }) => {
    if (paragrafo.temURL) {
      return (
        <Paragraph>
          <Text style={estilo.TextoCinza}>{ paragrafo.trecho1 }</Text>
          <Text style={estilo.Link} onPress={() => navigation.navigate('manejoWebview', { title: paragrafo.link1.titulo, url: paragrafo.link1.url })}>
            { paragrafo.link1.trecho }
          </Text>
          <Text style={estilo.TextoCinza}>{ paragrafo.trecho2 }</Text>
        </Paragraph>
      );
    }
    return (
      <>
       {paragrafo.texto}
      </>
    );
  };

  return (
    <>
      <Text style={estilo.TituloDoCard}>{titulo}</Text>
      {secoes.map(secao => (
          <View key={secao.id} style={{ marginTop: 15 }}>
            <RenderizarTexto seção={secao} />
          </View>

      ))
    }
    </>
  );
};

const estilo = StyleSheet.create({
  Link: {
    color: '#87BA25'
  },
  TextoCinza: {
    color: 'rgba(0,0,0,0.6)'
  },
  TítuloDoCard: {
    marginVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.6)'
  },
});

export default Estagio2;
