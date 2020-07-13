/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import {
  Text, View, StyleSheet
} from 'react-native';
import {
  Paragraph
} from 'react-native-paper';
import emergecia from '../json/estagio2.json';
import checkPlatform from '../../../utils/PDF';

const Estagio2 = ({ navigation }) => {
  const {
    titulo, secoes
  } = emergecia;

  const RenderizarTexto = ({ secao }) => {
    if (typeof secao.descricao === 'object') {
      return (
            <Paragraph>
              <Text style={estilos.TextoCinza}>
                  {secao.descricao.trecho1}
              </Text>
              {' '}
              <Text style={estilos.Link} onPress={() => navigation.navigate('manejoWebview', { title: secao.descricao.link1.titulo, url: secao.descricao.link1.url })}>
                  {secao.descricao.link1.trecho}
              </Text>
              <Text style={estilos.TextoCinza}>
                {secao.descricao.trecho2}
              </Text>
              <Text style={estilos.Link} onPress={() => (checkPlatform(secao.descricao.link2.url, 'Restricao do uso do oseltamivir.pdf'))}>
                  {secao.descricao.link2.trecho}
              </Text>
            </Paragraph>
      );
    }
    return (
      <>
        <Text style={estilos.TextoCinza}>
            {secao.descricao}
        </Text>
        {secao.paragrafos && secao.paragrafos.map(paragrafo => (
          <Paragraph key={paragrafo.id} style={estilos.TextoCinza}>
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
          <Text style={estilos.TextoCinza}>{ paragrafo.trecho1 }</Text>
          <Text style={estilos.Link} onPress={() => navigation.navigate('manejoWebview', { title: paragrafo.link1.titulo, url: paragrafo.link1.url })}>
            { paragrafo.link1.trecho }
          </Text>
          <Text style={estilos.TextoCinza}>{ paragrafo.trecho2 }</Text>
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
      <Text style={estilos.TituloDoCard}>{titulo}</Text>
      {secoes.map(secao => (
        <View key={secao.id} style={estilos.margin15}>
          <RenderizarTexto secao={secao} />
        </View>
      ))
    }
    </>
  );
};

const estilos = StyleSheet.create({
  Link: {
    color: '#87BA25'
  },
  TextoCinza: {
    color: 'rgba(0,0,0,0.6)'
  },
  TituloDoCard: {
    marginVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.6)'
  },
  margin15: { marginTop: 15 }
});

export default Estagio2;
