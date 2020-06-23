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
import checkPlatform from '../../utils/PDF';
import Estágio1 from './estágio1';
import Estágio2 from './estágio2';
import Estágio3 from './estágio3';
import Estágio4 from './estágio4';

import ClinicalButton from './ClinicalButton';

const textColor = 'rgba(0,0,0,0.6)';

export default function ClinicalManagement({ navigation }) {
  const [stage1Collapse, setStage1Collapse] = useState(false);
  const [stage2Collapse, setStage2Collapse] = useState(false);
  const [stage3Collapse, setStage3Collapse] = useState(false);
  const [stage4Collapse, setStage4Collapse] = useState(false);
  const navigator = useNavigation();

  const manejoOriginUrl = 'https://coronavirus.ceara.gov.br/wp-content/uploads/2020/05/11.05-Manejo-Cl%C3%ADnico-Mobile-1.pdf';
  const manejoDestPath = 'Manejo Clinico.pdf';

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
      estáAberto: stage1Collapse,
      métodoDeAbertura: setStage1Collapse,
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
      estáAberto: stage2Collapse,
      métodoDeAbertura: setStage2Collapse,
      alturaCard: 801,
      conteúdoOculto: Estágio2
    },
    {
      id: 3,
      títuloEstágio: 'Estágio 03 (7-10 dias)',
      título: 'Internação Hospitalar',
      Logo: Estagio3SVG,
      cor: '#FF9800',
      estáAberto: stage3Collapse,
      métodoDeAbertura: setStage3Collapse,
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
      estáAberto: stage4Collapse,
      métodoDeAbertura: setStage4Collapse,
      alturaCard: 665,
      conteúdoOculto: Estágio4
    }
  ];


  return (
    <ScrollView style={{ paddingHorizontal: 16, backgroundColor: '#fff' }}>
      <View style={{ marginTop: 26, flex: 1 }}>
        <Text style={{ fontSize: 26, color: '#4054B2' }}>Manejo clínico dos pacientes com Covid-19</Text>

        <View>
            <TouchableOpacity
              onPress={() => (checkPlatform(manejoOriginUrl, manejoDestPath))}
              style={{ justifyContent: 'space-between', flexDirection: 'row' }}
            >
            <Text style={{ marginTop: 12, fontSize: 14, color: '#BDBDBD' }}>Realize o download em PDF</Text>
            <Icon name="download" size={28} color="#BDBDBD" />
            </TouchableOpacity>

        </View>

        <Text style={{ color: 'rgba(0, 0, 0, 0.6)', marginVertical: 16 }}>Adotar todas as medidas para prevenção de contágio pela COVID-19 por ocasião de atendimento, incluindo o uso correto dos EPIs disponibilizados.</Text>

        <View>
          <Image
            source={Banner}
            style={{
              width: '100%', height: '100%', minHeight: 168, flex: 1, resizeMode: 'contain', marginVertical: 5
            }}
          />
          <ClinicalButton label="confira orientações de paramentação" onPress={() => Linking.openURL('https://coronavirus.ceara.gov.br/profissional/medidas-de-protecao/')} />
          <ClinicalButton label="consulte especialistas no tele-UTI" onPress={() => Linking.openURL('https://wa.me/5585984390220')} />
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
            // eslint-disable-next-line max-len
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
        <View>
          <Text style={{
            fontSize: 20, color: '#4054B2', fontWeight: '500', marginVertical: 8
          }}
          >
            Notifique casos suspeitos de covid-19
          </Text>
          <Text style={{ color: '#4054B2' }}>Assegurar a notificação do caso, sua confirmação e inclusão em base de dados da vigilância epdemiológica e do registro eletrônico dos pacientes.</Text>
          <ClinicalButton label="acesse a plataforma de notificação" onPress={() => navigation.navigate('manejoWebview', { title: 'Plataforma de notificação', url: 'https://coronavirus.ceara.gov.br/project/fichas-de-notificacao/' })} />
          <Text
            onPress={() => navigation.navigate('manejoWebview', { title: 'Diretrizes', url: 'https://coronavirus.ceara.gov.br/project/diretrizes-para-diagnostico-e-tratamento-da-covid-19/' })}
            style={{
              textAlign: 'center', color: '#4054B2', textDecorationLine: 'underline', marginVertical: 30
            }}
          >
            {' '}
              Diretrizes para diagnóstico e tratamento da COVID-19
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
