/* eslint-disable react/jsx-pascal-case */
import React, { useState, useLayoutEffect } from 'react';
import {
  Text, ScrollView, View, StyleSheet, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartaoDeEstagio from './cartaodeEstagio';
import ExamesLaboratoriais from './examesLaboratoriais';
import checkPlatform from '../../utils/PDF';
import CasosSuspeitos from './casosSuspeitos';
import ParamentacaoEPI from './paramentacaoEPI';
import pegarItensDoCartao from './itensDoCartao';
import BarraInferior from '../../components/barraInferior';
import header from './header';
import versaoManejo from './json/versao_manejo.json';

export default function ClinicalManagement({ navigation }) {
  const [cartaoEstagio1Aberto, alternarAberturaCartaoEstagio1] = useState(false);
  const [cartaoEstagio2Aberto, alternarAberturaCartaoEstagio2] = useState(false);
  const [cartaoEstagio3Aberto, alternarAberturaCartaoEstagio3] = useState(false);
  const [cartaoEstagio4Aberto, alternarAberturaCartaoEstagio4] = useState(false);
  const [barraVisivel, alterarBarraVisivel] = useState(true);


  const itensDoCartao = pegarItensDoCartao({
    cartaoEstagio1Aberto,
    alternarAberturaCartaoEstagio1,
    cartaoEstagio2Aberto,
    alternarAberturaCartaoEstagio2,
    cartaoEstagio3Aberto,
    alternarAberturaCartaoEstagio3,
    cartaoEstagio4Aberto,
    alternarAberturaCartaoEstagio4,
  });

  useLayoutEffect(() => header(navigation));
  const informacaoLateral = () => (
    <>
      <Text style={estilos.informacaoLateral}>
        VERSÃO
{' '}
{versaoManejo.versao}
      </Text>
      <Text style={estilos.informacaoLateral}>
        {versaoManejo.data}
      </Text>
    </>
  );

  const escondeBarra = () => {
    alterarBarraVisivel(false);
  };

  const mostraBarra = () => {
    alterarBarraVisivel(true);
  };

  const aoClicarEmBaixar = () => {
    const UrlOrigemManejo = 'https://coronavirus.ceara.gov.br/wp-content/uploads/2020/07/Manejo-Cl%C3%ADnico-dos-pacientes-com-Covid-19.pdf';
    const CaminhoDestino = 'Manejo Clinico.pdf';
    return checkPlatform(UrlOrigemManejo, CaminhoDestino);
  };

  return (
    <SafeAreaView style={estilos.safeiOS}>
    <ScrollView
      onScrollBeginDrag={escondeBarra}
      onScrollEndDrag={mostraBarra}
      style={estilos.background}
    >
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>Manejo clínico dos pacientes com Covid-19</Text>
        <ParamentacaoEPI />
        <View style={estilos.margemVertical}>
          {
            itensDoCartao.map(item => CartaoDeEstagio(item, navigation))
          }
        </View>
        <ExamesLaboratoriais />
        { CasosSuspeitos(navigation) }
      </View>
    </ScrollView>
    <BarraInferior
      barraVisivel={barraVisivel}
      telaDeOrigem="manejo"
      informacaoLateral={informacaoLateral}
      aoClicarEmBaixar={aoClicarEmBaixar}
    />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  informacaoLateral: {
    color: 'rgba(0, 0, 0, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  safeiOS: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  background: { paddingHorizontal: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 26, color: '#4054B2' },
  margemVertical: { marginVertical: 16 },
  conteudo: { marginTop: 26, flex: 1 }
});
