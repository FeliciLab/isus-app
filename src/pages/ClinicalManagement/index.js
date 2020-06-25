/* eslint-disable react/jsx-pascal-case */
import React, { useState, useLayoutEffect } from 'react';
import {
  Text, ScrollView, View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import CartaoDeEstagio from './cartaodeEstagio';

import Estagio1SVG from '../../assets/icons/estagiosManejo/estagio01.svg';
import Estagio2SVG from '../../assets/icons/estagiosManejo/estagio02.svg';
import Estagio3SVG from '../../assets/icons/estagiosManejo/estagio03.svg';
import Estagio4SVG from '../../assets/icons/estagiosManejo/estagio04.png';
import Fisiopatologia from '../../assets/icons/estagiosManejo/fisiopatologia.svg';
import ColetarExames from '../../assets/icons/estagiosManejo/coletarexames.svg';
import Estagio1 from './estagio1';
import Estagio2 from './estagio2';
import Estagio3 from './estagio3';
import Estagio4 from './estagio4';
import BotaoBaixarPDF from './botaoBaixarPDF';
import CasosSuspeitos from './casosSuspeitos';
import ParamentacaoEPI from './paramentacaoEPI';

export default function ClinicalManagement({ navigation }) {
  const [cartaoEstagio1Aberto, alternarAberturaCartaoEstagio1] = useState(false);
  const [cartaoEstagio2Aberto, alternarAberturaCartaoEstagio2] = useState(false);
  const [cartaoEstagio3Aberto, alternarAberturaCartaoEstagio3] = useState(false);
  const [cartaoEstagio4Aberto, alternarAberturaCartaoEstagio4] = useState(false);
  const navigator = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50'
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Manejo Clínico Covid-19',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}
        >
          <Icon name="magnify" size={28} color="#FFF" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigator.navigate('Home');
          }}
        >
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  const cardItems = [
    {
      id: 1,
      tituloEstagio: 'Estágio 01 (2-5 dias)',
      titulo: 'Orientações iniciais',
      subtitulo: 'Sintomas e sinais',
      Logo: Estagio1SVG,
      cor: '#4054B2',
      estaAberto: cartaoEstagio1Aberto,
      metodoDeAbertura: alternarAberturaCartaoEstagio1,
      alturaCard: 10000,
      conteudoOculto: Estagio1
    },
    {
      id: 2,
      tituloEstagio: 'Estágio 02 (5-7 dias)',
      titulo: 'UAPS/UPA/EMERGÊNCIA',
      subtitulo: 'Atendimento médico',
      Logo: Estagio2SVG,
      cor: '#87BA25',
      estaAberto: cartaoEstagio2Aberto,
      metodoDeAbertura: alternarAberturaCartaoEstagio2,
      alturaCard: 801,
      conteudoOculto: Estagio2
    },
    {
      id: 3,
      tituloEstagio: 'Estágio 03 (7-10 dias)',
      titulo: 'Internação Hospitalar',
      Logo: Estagio3SVG,
      cor: '#FF9800',
      estaAberto: cartaoEstagio3Aberto,
      metodoDeAbertura: alternarAberturaCartaoEstagio3,
      alturaCard: 738,
      conteudoOculto: Estagio3
    },
    {
      id: 4,
      tituloEstagio: 'Estágio 04 (11-20 dias)',
      titulo: 'UTI',
      subtitulo: 'Ventilação mecânica',
      Logo: Estagio4SVG,
      cor: '#F2453D',
      estaAberto: cartaoEstagio4Aberto,
      metodoDeAbertura: alternarAberturaCartaoEstagio4,
      alturaCard: 665,
      conteudoOculto: Estagio4
    }
  ];


  return (
    <ScrollView style={{ paddingHorizontal: 16, backgroundColor: '#fff' }}>
      <View style={{ marginTop: 26, flex: 1 }}>
        <Text style={{ fontSize: 26, color: '#4054B2' }}>Manejo clínico dos pacientes com Covid-19</Text>

        {/* DownloadPDF goes Here */}
        { BotaoBaixarPDF() }

        {/* Paramentação EPI */}
        <ParamentacaoEPI />

        {/* Card goes here */}
        <View style={{ marginVertical: 16 }}>
          {
            cardItems.map(item => CartaoDeEstagio(item, navigation))
          }
        </View>

        <View style={{ justifyContent: 'center' }}>
          <Divider style={{ marginVertical: 15, backgroundColor: 'rgba(0, 0, 0, 0.32)' }} />
          <Fisiopatologia />
          <ColetarExames style={{ marginVertical: 15 }} />
          <Text style={{ color: '#4054B2' }}>Hemograma, PCR, TAP, TPTA, D-dímero, Desidrogenase lática (LDH), Enzimas hepáticas (AST/TGO e ALT/TGP), Creatinina e Ureia, CPK e troponina, pro-calcitonina, ferritina, conforme julgamento clínico e disponibilidade.</Text>
          <Divider style={{ marginVertical: 15, backgroundColor: 'rgba(0, 0, 0, 0.32)' }} />
        </View>

        {/* casosSuspeitos */}
        { CasosSuspeitos(navigator) }
      </View>
    </ScrollView>
  );
}
