/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import {
  Text, View, StyleSheet
} from 'react-native';
import {
  Paragraph
} from 'react-native-paper';

import orientacaoInicial from '../json/estagio1.json';
import BotaoManejoClinico from '../botaoManejoClinico';
import ReferenciaMedica from './referenciaMedica';

const corDoTextoPadrao = 'rgba(0,0,0,0.6)';

const Estagio1 = ({ navigation }) => {
  const {
    containerDoAviso, negrito, containerDeTextoDoAviso,
    itemDeTopico, tituloDeTopico,
    containerDaObservacao, containerDoBotao, largura60, CorDoTexto
  } = styles;

  const {
    titulo, descricao, secoes, botaoPlantaoCoronavirus
  } = orientacaoInicial;

  // sintomas
  const mostrarSintomas = sintomas => (
    sintomas.map(sintoma => mostrarTituloEConteudo(sintoma, true))
  );

  // sintoma + itens
  const mostrarTituloEConteudo = (topico, eUmSintoma = false) => (
    <View key={topico.titulo}>
      <Text style={eUmSintoma ? { ...tituloDeTopico } : { ...tituloDeTopico, ...negrito }}>
        {topico.titulo}
      </Text>
      <View style={styles.margin8}>
        {topico.itens.map(item => (
          <Paragraph key={item} style={itemDeTopico}>{item}</Paragraph>
        ))}
      </View>
    </View>
  );

  return (
    <>
  <Text style={{ ...tituloDeTopico, ...negrito }}>{titulo}</Text>
  <Text style={itemDeTopico}>{descricao}</Text>

  { mostrarSintomas(secoes.sintomas) }

  <View style={containerDoAviso}>
    <Text style={containerDeTextoDoAviso}>
      <Text style={negrito}>{`${secoes.atencao.titulo} `}</Text>
      <Text style={CorDoTexto}>{secoes.atencao.texto1}</Text>
    </Text>
    <Text style={CorDoTexto}>{secoes.atencao.texto2}</Text>
  </View>

 { mostrarTituloEConteudo(secoes.grupoDeRisco) }

  <View style={containerDaObservacao}>
    <Text style={CorDoTexto}>
      <Text style={negrito}>{`${secoes.observacao.titulo}`}</Text>
      <Text style={CorDoTexto}>{secoes.observacao.texto}</Text>
    </Text>
  </View>

  { mostrarTituloEConteudo(secoes.alertas) }

  { mostrarTituloEConteudo(secoes.sinaisDeGravidade) }

  <View style={containerDoBotao}>
    <View style={largura60}>
      <BotaoManejoClinico onPress={() => navigation.navigate('webview', { title: botaoPlantaoCoronavirus.tituloWebview, url: botaoPlantaoCoronavirus.url })} label={botaoPlantaoCoronavirus.titulo} />
    </View>
  </View>
  <ReferenciaMedica />
    </>
  );
};

const styles = StyleSheet.create({
  tituloDeTopico: {
    fontSize: 18,
    marginTop: 16,
    color: corDoTextoPadrao
  },
  containerDoItem: {
    marginTop: 8
  },
  itemDeTopico: {
    color: corDoTextoPadrao,
    fontSize: 14
  },
  containerDeTextoDoAviso: {
    marginTop: 2,
    marginBottom: 3,
    marginHorizontal: 7,
    color: corDoTextoPadrao
  },
  margin8: {
    marginTop: 8
  },
  containerDoAviso: {
    flex: 1,
    marginTop: 16,
    backgroundColor: 'rgba(242, 69, 61, 0.12)',
    alignItems: 'center',
    borderRadius: 2
  },
  containerDaObservacao: {
    flex: 1,
    marginTop: 16,
    alignItems: 'center',
    borderRadius: 2
  },
  containerDoBotao: {
    marginVertical: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  Link: {
    color: '#87BA25'
  },
  CorDoTexto: {
    color: corDoTextoPadrao
  },
  negrito: {
    fontWeight: 'bold'
  },
  TituloDoCard: {
    marginVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: corDoTextoPadrao
  },
  largura30: { width: '30%' },
  largura60: { width: '60%' }
});

export default Estagio1;
