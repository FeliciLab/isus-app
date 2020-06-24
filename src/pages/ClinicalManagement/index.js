/* eslint-disable react/jsx-pascal-case */
import React, { useState, useLayoutEffect } from 'react';
import {
  Text, ScrollView, View, Linking, Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import CartãoDeEstágio from './cartãodeEstágio';
import Banner from '../../assets/images/banner.png';
import Estagio1SVG from '../../assets/icons/estagiosManejo/estagio01.svg';
import Estagio2SVG from '../../assets/icons/estagiosManejo/estagio02.svg';
import Estagio3SVG from '../../assets/icons/estagiosManejo/estagio03.svg';
import Estagio4SVG from '../../assets/icons/estagiosManejo/estagio04.png';
import Fisiopatologia from '../../assets/icons/estagiosManejo/fisiopatologia.svg';
import ColetarExames from '../../assets/icons/estagiosManejo/coletarexames.svg';
import Estágio1 from './estágio1';
import Estágio2 from './estágio2';
import Estágio3 from './estágio3';
import Estágio4 from './estágio4';
import BotãoBaixarPDF from './botãoBaixarPDF';
import BotãoManejoClinico from './botãoManejoClinico';
import CasosSuspeitos from './casosSuspeitos';

const textColor = 'rgba(0,0,0,0.6)';

export default function ClinicalManagement({ navigation }) {
  const [cartãoEstágio1Aberto, alternarAberturaCartãoEstágio1] = useState(false);
  const [cartãoEstágio2Aberto, alternarAberturaCartãoEstágio2] = useState(false);
  const [cartãoEstágio3Aberto, alternarAberturaCartãoEstágio3] = useState(false);
  const [cartãoEstágio4Aberto, alternarAberturaCartãoEstágio4] = useState(false);
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
      títuloEstágio: 'Estágio 01 (2-5 dias)',
      título: 'Orientações iniciais',
      subtítulo: 'Sintomas e sinais',
      Logo: Estagio1SVG,
      cor: '#4054B2',
      estáAberto: cartãoEstágio1Aberto,
      métodoDeAbertura: alternarAberturaCartãoEstágio1,
      alturaCard: 10000,
      conteúdoOculto: Estágio1
    },
    {
      id: 2,
      títuloEstágio: 'Estágio 02 (5-7 dias)',
      título: 'UAPS/UPA/EMERGÊNCIA',
      subtítulo: 'Atendimento médico',
      Logo: Estagio2SVG,
      cor: '#87BA25',
      estáAberto: cartãoEstágio2Aberto,
      métodoDeAbertura: alternarAberturaCartãoEstágio2,
      alturaCard: 801,
      conteúdoOculto: Estágio2
    },
    {
      id: 3,
      títuloEstágio: 'Estágio 03 (7-10 dias)',
      título: 'Internação Hospitalar',
      Logo: Estagio3SVG,
      cor: '#FF9800',
      estáAberto: cartãoEstágio3Aberto,
      métodoDeAbertura: alternarAberturaCartãoEstágio3,
      alturaCard: 738,
      conteúdoOculto: Estágio3
    },
    {
      id: 4,
      títuloEstágio: 'Estágio 04 (11-20 dias)',
      título: 'UTI',
      subtítulo: 'Ventilação mecânica',
      Logo: Estagio4SVG,
      cor: '#F2453D',
      estáAberto: cartãoEstágio4Aberto,
      métodoDeAbertura: alternarAberturaCartãoEstágio4,
      alturaCard: 665,
      conteúdoOculto: Estágio4
    }
  ];


  return (
    <ScrollView style={{ paddingHorizontal: 16, backgroundColor: '#fff' }}>
      <View style={{ marginTop: 26, flex: 1 }}>
        <Text style={{ fontSize: 26, color: '#4054B2' }}>Manejo clínico dos pacientes com Covid-19</Text>

        {/* DownloadPDF goes Here */}
        { BotãoBaixarPDF() }

        <Text style={{ color: 'rgba(0, 0, 0, 0.6)', marginVertical: 16 }}>Adotar todas as medidas para prevenção de contágio pela COVID-19 por ocasião de atendimento, incluindo o uso correto dos EPIs disponibilizados.</Text>

        <View>
          <Image
            source={Banner}
            style={{
              width: '100%', height: '100%', minHeight: 168, flex: 1, resizeMode: 'contain', marginVertical: 5
            }}
          />
          <BotãoManejoClinico label="confira orientações de paramentação" onPress={() => Linking.openURL('https://coronavirus.ceara.gov.br/profissional/medidas-de-protecao/')} />
          <BotãoManejoClinico label="consulte especialistas no tele-UTI" onPress={() => Linking.openURL('https://wa.me/5585984390220')} />
          <Text style={{ color: textColor, marginVertical: 16 }}>
            Discussão de casos de pacientes críticos (UTI e emergências) com intensivistas e
            pneumologistas:
            {'\n'}
            <Text style={{ fontWeight: 'bold' }}>seg a sex - 24h / sab e dom - 8h às 17h</Text>
          </Text>
        </View>

        {/* Card goes here */}
        <View style={{ marginVertical: 16 }}>
          {
            cardItems.map(item => CartãoDeEstágio(item))
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
