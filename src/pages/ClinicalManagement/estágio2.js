/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import {
  Text, View, StyleSheet
} from 'react-native';

import {
  Paragraph
} from 'react-native-paper';
import Emergecia from './text-content/emergencia.json';
import checkPlatform from '../../utils/PDF';

const Estágio2 = ({ navigation }) => {
  const {
    título, seções
  } = Emergecia.AvaliçãoPresencial;


  const RenderizarTexto = ({ seção }) => {
    if (typeof seção.descrição === 'object') {
      return (
            <Paragraph>
              <Text style={estilo.TextoCinza}>
                  {seção.descrição.trecho1}
              </Text>
              {' '}
              <Text style={estilo.Link} onPress={() => navigation.navigate('manejoWebview', { title: seção.descrição.link1.título, url: seção.descrição.link1.url })}>
                  {seção.descrição.link1.trecho}
              </Text>
              <Text style={estilo.TextoCinza}>
                {seção.descrição.trecho2}
              </Text>
              <Text style={estilo.Link} onPress={() => (checkPlatform(seção.descrição.link2.url, 'Restricao do uso do oseltamivir.pdf'))}>
                  {seção.descrição.link2.trecho}
              </Text>
            </Paragraph>
      );
    }
    return (
      <>
        <Text style={estilo.TextoCinza}>
            {seção.descrição}
        </Text>
        {seção.parágrafos && seção.parágrafos.map(parágrafo => (
          <Paragraph key={parágrafo} style={estilo.TextoCinza}>
            <RenderizarParágrafo parágrafo={parágrafo} />
          </Paragraph>
        ))}
      </>
    );
  };

  const RenderizarParágrafo = ({ parágrafo }) => {
    if (typeof parágrafo === 'object') {
      return (
        <Paragraph>
          <Text style={estilo.TextoCinza}>{ parágrafo.trecho1 }</Text>
          <Text style={estilo.Link} onPress={() => navigation.navigate('manejoWebview', { title: parágrafo.link1.título, url: parágrafo.link1.url })}>
            { parágrafo.link1.trecho }
          </Text>
          <Text style={estilo.TextoCinza}>{ parágrafo.trecho2 }</Text>
        </Paragraph>
      );
    }
    return (
      <>
       {parágrafo}
      </>
    );
  };

  return (
    <>
      <Text style={estilo.TítuloDoCard}>{título}</Text>
      {seções.map(seção => (
        <View key={seção} style={{ marginTop: 15 }}>
            <RenderizarTexto seção={seção} />
        </View>
      ))}
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

export default Estágio2;
