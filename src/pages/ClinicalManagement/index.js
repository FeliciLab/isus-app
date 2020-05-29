
import React, { useState, useLayoutEffect } from 'react';
import {
  Text, ScrollView, View, Linking, StyleSheet, Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Card, Button, Paragraph, Divider
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Banner from '../../assets/images/banner.png';
// import Termometro from '../../assets/icons/estagiosManejo/termometro.svg';
import Estagio1 from '../../assets/icons/estagiosManejo/estagio01.svg';
import Estagio2 from '../../assets/icons/estagiosManejo/estagio02.svg';
import Estagio3 from '../../assets/icons/estagiosManejo/estagio03.svg';
import Estagio4 from '../../assets/icons/estagiosManejo/estagio04.png';
import Raiox1 from '../../assets/icons/estagiosManejo/raiox1.png';
import Raiox2 from '../../assets/icons/estagiosManejo/raiox2.png';
import Grafico from '../../assets/icons/estagiosManejo/grafico.svg';
import Pulmao from '../../assets/icons/estagiosManejo/pulmao.png';
import Fisiopatologia from '../../assets/icons/estagiosManejo/fisiopatologia.svg';
import ColetarExames from '../../assets/icons/estagiosManejo/coletarexames.svg';
import initialOrientation from './text-content/orientacoes-iniciais.json';
import UTI from './text-content/UTI.json';

const textColor = 'rgba(0,0,0,0.6)';

export default function ClinicalManagement({ navigation }) {
  const [stage1Collapse, setStage1Collapse] = useState(false);
  const [stage2Collapse, setStage2Collapse] = useState(false);
  const [stage3Collapse, setStage3Collapse] = useState(false);
  const [stage4Collapse, setStage4Collapse] = useState(false);
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
  // Internal Components
  const ClinicalButton = ({ label, onPress }) => (
    <TouchableOpacity style={{ marginVertical: 8 }} onPress={onPress}>
      <View style={style.clinicalButton}>
        <Text style={style.textButton}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const CardStage = ({
    id,
    isCollapsed,
    collapsedMethod,
    cardHeight,
    stageTitle,
    title,
    subtitle,
    Logo,
    HideContent,
    color
  }) => (
      <Card
        elevation={4}
        style={{
          marginVertical: 8,
          MaxHeight: isCollapsed ? (cardHeight) : (172)
        }}
      >
        <Card.Content style={{ flexDirection: 'column' }}>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between'
          }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{
                marginVertical: 7, letterSpacing: 1.5, color: 'rgba(0, 0, 0, 0.87)', fontSize: 10
              }}
              >
                {stageTitle}
              </Text>
              <Text style={{ color, fontSize: 24 }}>{title}</Text>
              {
                subtitle && !isCollapsed && (
                <Text style={{
                  color: textColor,
                  fontSize: 14,
                  marginVertical: 15
                }}
                >
                {subtitle}
                </Text>
                )
              }
            </View>
            <View>
              {
                id === 4 ? <Image source={Logo} /> : <Logo />
              }
            </View>
          </View>
          <View>
            {
              isCollapsed && <HideContent />
            }
          </View>
        </Card.Content>
        <Card.Actions>
          <Button
            color={color}
            style={{ color: '#4054B2', letterSpacing: 0.75 }}
            onPress={() => collapsedMethod(!isCollapsed)}
          >
            {isCollapsed ? 'fechar' : 'Saiba mais'}
          </Button>
        </Card.Actions>
      </Card>
  );

  const HiddenStage1 = () => (
    <>
    <Text style={style.hiddenCardTitle}>{initialOrientation.title}</Text>
    <Text style={style.hiddenCardText}>{initialOrientation.description}</Text>

    {initialOrientation.sections.symptoms.map((symptom => (
    <View key={symptom.title}>
      <Text style={{ marginTop: 16, fontSize: 18, color: textColor }}>
        {symptom.title}
      </Text>
      {symptom.items.map(item => (
        <Paragraph style={{ color: textColor, fontSize: 14 }}>
          {item}
        </Paragraph>
      ))}
    </View>
    )))}
    <View style={{
      flex: 1, marginTop: 16, backgroundColor: 'rgba(242, 69, 61, 0.12)', alignItems: 'center', borderRadius: 2
    }}
    >
      <Text style={{
        marginTop: 2, marginBottom: 3, marginHorizontal: 7, color: textColor
      }}
      >
        <Text style={{ fontWeight: 'bold' }}>{`${initialOrientation.sections.warningLabel.title} `}</Text>
        <Text>{initialOrientation.sections.warningLabel.text}</Text>
      </Text>
    </View>
    <View key={initialOrientation.sections.riskGroup.title}>
      <Text style={{
        fontWeight: 'bold', marginTop: 16, fontSize: 18, color: textColor
      }}
      >
        {initialOrientation.sections.riskGroup.title}
      </Text>
      {initialOrientation.sections.riskGroup.items.map(item => (
        <Paragraph style={{ color: textColor, fontSize: 14 }}>{item}</Paragraph>
      ))}
    </View>
    <View style={{
      flex: 1,
      marginVertical: 8,
      alignItems: 'center',
      borderRadius: 2
    }}
    >
      <Text style={{ color: textColor }}>
        <Text style={{ fontWeight: 'bold' }}>{`${initialOrientation.sections.observation.title} `}</Text>
        <Text>{initialOrientation.sections.observation.text}</Text>
      </Text>
    </View>
    <View key={initialOrientation.sections.alerts.title}>
      <Text style={{
        fontWeight: 'bold', marginTop: 16, fontSize: 18, color: textColor
      }}
      >
        {initialOrientation.sections.alerts.title}
      </Text>
      {initialOrientation.sections.alerts.items.map(item => (
        <Paragraph style={{ color: textColor, fontSize: 14 }}>{item}</Paragraph>
      ))}
    </View>
    <View style={{
      marginVertical: 20, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'
    }}
    >
      <View style={{ width: '30%' }}>
        <ClinicalButton onPress={() => Linking.openURL('tel: 08002751475')} label="TELE-UTI" />
      </View>
      <View style={{ width: '60%' }}>
        <ClinicalButton onPress={() => navigation.navigate('webview', { title: 'Plantão Corona Vírus', url: 'https://coronavirus.ceara.gov.br/' })} label="PLANTÃO CORONAVÍRUS" />
      </View>
    </View>
    </>
  );

  const HiddenStage2 = () => (
    <>
      <Paragraph>
        • Avaliar os fatores de risco, gravidade e necessidade de internação hospitalar.
      </Paragraph>
      <Paragraph>
        • Mais de 5 dias de evolução com piora dos sintomas indicam o maior risco de complicações.
      </Paragraph>
      <Text style={{
        marginVertical: 8, fontSize: 20, fontWeight: 'bold', color: textColor
      }}
      >
        Sinais de gravidade
      </Text>
      <Paragraph>
        {'- SpO₂  < 95% em ar ambiente'}
      </Paragraph>
      <Paragraph>
        {'- Sinais de desconforto respiratório ou aumento da frequência respiratória (f < 28irpm)'}
      </Paragraph>
      <Paragraph>- Cianose (central e de extremidades)</Paragraph>
      <Paragraph>{'- Hipotensão (PAS < 90mmHg em relação a PA habitual dos pacientes).'}</Paragraph>
      <Paragraph>- Alteração do estado mental ou do nível de consciência.</Paragraph>
      <Paragraph>- Piora nas condições clínicas de doença de base.</Paragraph>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View>
          <Image source={Raiox1} style={{ marginHorizontal: 5 }} />
        </View>
        <View>
          <Image source={Raiox2} style={{ marginHorizontal: 5 }} />
        </View>
      </View>
      <Paragraph style={{ marginTop: 15 }}>
        ‎• Realizar TC de torax, e se não acessível, realizar Raio-X.
      </Paragraph>
      <Text>
        ‎• Ofertar
        <Text style={style.bold}> tratamento ambulatorial e monitoramento clínico remoto </Text>
        por profissional da saúde se indicada quarentena domiciliar,
        {' '}
        <Text style={{ textDecorationLine: 'underline', color: '#87BA25' }} onPress={() => navigation.navigate('webview', { title: 'Notas Técnicas', url: 'https://coronavirus.ceara.gov.br/project/nt-tratamento-farmaco-amb/' })}>
          conforme protocolo.
        </Text>
      </Text>
      <Paragraph>
        - Indicar internação após análise da gravidade e
        conforme necessidades de tratamento do paciente.
      </Paragraph>
    </>
  );

  const HiddenStage3 = () => (
    <>
      <View style={{ marginTop: 20 }}>
        <Paragraph>
          {'‎• Ofertar'}
          <Text style={{ fontWeight: 'bold' }}> oxigenoterapia </Text>
          {'se SpO₂ < 93%.'}
          <Text onPress={() => navigation.navigate('webview', { title: 'Protocolo', url: 'https://coronavirus.ceara.gov.br/project/saude-publica-versao-atualizada-de-seu-protocolo-de-insuficiencia-respiratoria-2/' })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>conforme protocolo.</Text>
        </Paragraph>
        <Paragraph>- Colher gasométrica arterial em uso de oxigênio.</Paragraph>
        <Paragraph>
          - Em caso de má resposta ou piora indicar intubação orotraquel
          eletiva e transferência para UTI.
        </Paragraph>
        <Paragraph style={{ marginVertical: 8 }}>
          •
          {' '}
          <Text style={{ fontWeight: 'bold' }}>Administrar ATB</Text>
          {' '}
          para
          {' '}
          <Text style={{ fontWeight: 'bold' }}>infecção bacteriana</Text>
          {' '}
          2ª (azitromicina +/- amoxacilina clavulananto) e
          {' '}
          <Text style={{ fontWeight: 'bold' }}>
            terapia antiviral para Influenza
          </Text>
          {' '}
          (oseltamivir) em casos suspeitos dessas condições
        </Paragraph>
        <Paragraph>
          •
        {' '}
          <Text style={{ fontWeight: 'bold' }}>Considerar corticoterapia</Text>
        ,  em caso de resposta inflamatória associada à disfução orgânica mantida ou progressiva
        {' '}
          <Text onPress={() => navigation.navigate('webview', { title: 'Nota Técnica', url: 'https://coronavirus.ceara.gov.br/project/nota-tecnica-orienta-sobre-uso-de-corticoesteroides-para-pacientes-internados-em-servicos-de-saude-publicos-e-privados-no-estado-do-ceara/' })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>conforme protocolo.</Text>
          {' '}
        </Paragraph>
        <Paragraph>
          •
          {' '}
          <Text style={{ fontWeight: 'bold' }}>Assegurar</Text>
          {' '}
          profilaxia de Trombose Venosa Profunda.
        </Paragraph>
        <Paragraph style={{ marginVertical: 8 }}>
          •
          {' '}
          <Text style={{ fontWeight: 'bold' }}>Considerar  hidroxicloroquina ou cloroquina</Text>
          {' '}
          <Text onPress={() => navigation.navigate('webview', { title: 'Nota Técnica', url: 'https://coronavirus.ceara.gov.br/project/nota-tecnica-traz-esclarecimentos-sobre-uso-da-hidroxicloroquina-e-cloroquina-como-drogas-experimentais/' })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>conforme protocolo.</Text>
          Checar ECG/Intervalo QT:
        </Paragraph>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Grafico />
        </View>
        <Paragraph>‎• Tranferir para UTI em caso de disfunções orgânicas em evolução.</Paragraph>
      </View>
    </>
  );

  const HiddenStage4 = () => (
    <>
      <View style={{ marginTop: 8 }}>
        <Paragraph>
          {UTI.sections.paragraphOne.firstPhrase}
          <Text onPress={() => navigation.navigate('webview', { title: UTI.sections.paragraphOne.link.title, url: UTI.sections.paragraphOne.link.url })} style={{ color: '#F2453D', textDecorationLine: 'underline' }}>{UTI.sections.paragraphOne.link.text}</Text>
          {UTI.sections.paragraphOne.secondPhrase}
        </Paragraph>
        <Paragraph>
          {UTI.sections.paragraphOne.item.firstPhrase}
          <Text onPress={() => navigation.navigate('webview', { title: UTI.sections.paragraphOne.item.link.title, url: UTI.sections.paragraphOne.item.link.url })} style={{ color: '#F2453D', textDecorationLine: 'underline' }}>{UTI.sections.paragraphOne.item.link.text}</Text>
        </Paragraph>
        <Paragraph>
          <Text style={{ fontWeight: 'bold' }}>{UTI.sections.paragraphTwo.bold}</Text>
          {UTI.sections.paragraphTwo.secondPhrase}
          <Text
            onPress={() => navigation.navigate('webview', { title: UTI.sections.paragraphTwo.link.title, url: UTI.sections.paragraphTwo.link.url })}
            style={{ color: '#F2453D', textDecorationLine: 'underline' }}
          >
            {UTI.sections.paragraphTwo.link.text}
          </Text>
        </Paragraph>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image source={Pulmao} />
        </View>
        <Paragraph>
          <Text style={{ fontWeight: 'bold' }}>
            {UTI.sections.paragraphThree.bold}
          </Text>
          {UTI.sections.paragraphThree.secondPhrase}
          <Text onPress={() => navigation.navigate('webview', { title: UTI.sections.paragraphThree.link.title, url: UTI.sections.paragraphThree.link.url })} style={{ color: '#F2453D', textDecorationLine: 'underline' }}>
          {UTI.sections.paragraphThree.link.text}
          </Text>
        </Paragraph>
        <Text>
          {UTI.sections.paragraphFour}
        </Text>
      </View>
    </>
  );
  const cardItems = [
    {
      id: 1,
      stageTitle: 'Estágio 01 (2-5 dias)',
      title: 'Orientações iniciais',
      subtitle: 'Sintomas e sinais',
      Logo: Estagio1,
      color: '#4054B2',
      isCollapsed: stage1Collapse,
      collapsedMethod: setStage1Collapse,
      cardHeight: 10000,
      HideContent: HiddenStage1
    },
    {
      id: 2,
      stageTitle: 'Estágio 02 (5-7 dias)',
      title: 'UAPS/UPA/EMERGÊNCIA',
      subtitle: 'Atendimento médico',
      Logo: Estagio2,
      color: '#87BA25',
      isCollapsed: stage2Collapse,
      collapsedMethod: setStage2Collapse,
      cardHeight: 801,
      HideContent: HiddenStage2
    },
    {
      id: 3,
      stageTitle: 'Estágio 03 (7-10 dias)',
      title: 'Internação Hospitalar',
      Logo: Estagio3,
      color: '#FF9800',
      isCollapsed: stage3Collapse,
      collapsedMethod: setStage3Collapse,
      cardHeight: 738,
      HideContent: HiddenStage3
    },
    {
      id: 4,
      stageTitle: 'Estágio 04 (11-20 dias)',
      title: 'UTI',
      subtitle: 'Ventilação mecânica',
      Logo: Estagio4,
      color: '#F2453D',
      isCollapsed: stage4Collapse,
      collapsedMethod: setStage4Collapse,
      cardHeight: 665,
      HideContent: HiddenStage4
    }
  ];
  return (
    <ScrollView style={{ paddingHorizontal: 16, backgroundColor: '#fff' }}>
      <View style={{
        marginTop: 26, flex: 1
      }}
      >
        <Text style={{ fontSize: 24, color: '#4054B2' }}>Manejo clínico dos pacientes com Covid-19</Text>
        <Text style={{ color: textColor, marginVertical: 16 }}>
          Adotar todas as medidas para prevenção de contágio pela Covid-19 por ocasião do
          atendimento, incluindo o uso correto dos EPIs disponibilizados:
        </Text>
        <View>
          <Image source={Banner} style={{ marginVertical: 10, width: 378, height: 185 }} resizeMode="contain" />
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
            cardItems.map(item => (
            <CardStage
              key={item.id}
              id={item.id}
              cardHeight={item.cardHeight}
              collapsedMethod={item.collapsedMethod}
              color={item.color}
              isCollapsed={item.isCollapsed}
              stage-title={item.title}
              HideContent={item.HideContent}
              stageTitle={item.stageTitle}
              title={item.title}
              subtitle={item.subtitle}
              content={item.content}
              Logo={item.Logo}
            />
            ))
          }
        </View>

        <View style={{ justifyContent: 'center' }}>
          <Divider style={{ marginVertical: 15, backgroundColor: 'rgba(0, 0, 0, 0.32)' }} />
          <Fisiopatologia />
          <ColetarExames style={{ marginVertical: 15 }} />
          <Text style={{ color: '#4054B2' }}>Hemograma, PCR, TAP, TPTA, D-dímero, Desidrogenase lática (LDH), Enzimas hepáticas (AST/TGO e ALT/TGP), Creatinina e Ureia, CPK e troponina, pro-calcitonina, ferritina, conforme julgamento clínica e disponibilidade.</Text>
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
          <ClinicalButton label="acesse a plataforma de notificação" onPress={() => navigation.navigate('webview', { title: 'Plataforma de notificação', url: 'https://coronavirus.ceara.gov.br/project/fichas-de-notificacao/' })} />
          <Text
            onPress={() => navigation.navigate('webview', { title: 'Diretrizes', url: 'https://coronavirus.ceara.gov.br/project/diretrizes-para-diagnostico-e-tratamento-da-covid-19/' })}
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

const style = StyleSheet.create({
  clinicalButton: {
    backgroundColor: '#F2C94C',
    padding: 10,
    borderRadius: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
  },
  textButton: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#4054B2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold'
  },
  hiddenCardTitle: {
    marginVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: textColor
  },
  hiddenCardText: {
    color: textColor,
    fontSize: 14
  }
});
