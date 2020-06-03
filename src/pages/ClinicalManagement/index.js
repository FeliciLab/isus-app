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
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Banner from '../../assets/images/banner.png';
import Estagio1 from '../../assets/icons/estagiosManejo/estagio01.svg';
import Estagio2 from '../../assets/icons/estagiosManejo/estagio02.svg';
import Estagio3 from '../../assets/icons/estagiosManejo/estagio03.svg';
import Estagio4 from '../../assets/icons/estagiosManejo/estagio04.png';
import Pulmao from '../../assets/icons/estagiosManejo/pulmao.png';
import Fisiopatologia from '../../assets/icons/estagiosManejo/fisiopatologia.svg';
import ColetarExames from '../../assets/icons/estagiosManejo/coletarexames.svg';
import initialOrientation from './text-content/orientacoes-iniciais.json';
import emergency from './text-content/emergencia.json';
import Internacao from './text-content/internacao-hospitalar.json';
import UTI from './text-content/UTI.json';
import checkPlatform from '../../utils/PDF';

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
  // Internal Components
  const ClinicalButton = ({ label, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...style.clinicalButton, marginHorizontal: 2, marginVertical: 8 }}>
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
          marginHorizontal: 1,
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
    <Text style={style.hiddenCardTitle}>{emergency.presentialEvaluation.title}</Text>
    <Text style={style.hiddenCardText}>{emergency.presentialEvaluation.description}</Text>

    <View key={emergency.presentialEvaluation.sections.severitySigns.title}>
      <Text style={{
        marginTop: 16, marginBottom: 8, fontSize: 18, color: textColor
      }}
      >
        {emergency.presentialEvaluation.sections.severitySigns.title}
      </Text>
      {emergency.presentialEvaluation.sections.severitySigns.items.map(item => (
        <Paragraph style={{ color: textColor, fontSize: 14 }}>
          {item}
        </Paragraph>
      ))}
    </View>
    <View key={emergency.presentialEvaluation.sections.hospitalizationCriteria.title}>
      <Text style={{
        marginTop: 16, marginBottom: 8, fontSize: 18, color: textColor
      }}
      >
        {emergency.presentialEvaluation.sections.hospitalizationCriteria.title}
      </Text>
      {emergency.presentialEvaluation.sections.hospitalizationCriteria.items.map(item => (
        <Paragraph style={{ color: textColor, fontSize: 14 }}>
          {item}
        </Paragraph>
      ))}
    </View>
    <View style={{
      flex: 1,
      paddingHorizontal: 6,
      paddingVertical: 3,
      marginTop: 16,
      marginBottom: 16,
      backgroundColor: '#eaf5ea',
      alignItems: 'center',
      borderRadius: 2
    }}
    >
      <Text style={{ ...style.hiddenCardText, marginBottom: 8 }}>
        {emergency.presentialEvaluation.sections.info.description}
      </Text>
      {emergency.presentialEvaluation.sections.info.items.map(item => (
        <Text style={{ alignSelf: 'flex-start', color: textColor, fontSize: 14 }}>
          {item}
        </Text>
      ))}
    </View>
    <Text style={{ ...style.hiddenCardTitle, color: '#87BA25' }} onPress={() => navigation.navigate('webview', { title: emergency.technicalNotes.title.link.title, url: emergency.technicalNotes.title.link.url })}>
      {emergency.technicalNotes.title.link.text}
    </Text>
    <View style={{ marginTop: 16, marginBottom: 8 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginRight: 8 }}>
          <FontAwesome5Icon name="pills" color="rgba(0, 0, 0, 0.54)" size={22} />
        </View>
        <Text style={{ marginBottom: 8, fontSize: 18, color: textColor }}>
          {emergency.technicalNotes.medicines.title}
        </Text>
      </View>
      <Text style={style.hiddenCardText}>
        {emergency.technicalNotes.medicines.usageCriteria.description}
      </Text>
      {emergency.technicalNotes.medicines.usageCriteria.items.map(item => (
        <View>
          <Paragraph style={style.hiddenCardText}>{item.title}</Paragraph>
          {item.subItemList && item.subItemList.map(subItem => (
            <Text style={{ color: textColor, fontSize: 14, marginHorizontal: 22 }}>{subItem}</Text>
          ))}
        </View>
      ))}
    </View>
    <View style={{
      flex: 1,
      marginTop: 16,
      backgroundColor: 'rgba(242, 69, 61, 0.12)',
      alignItems: 'flex-start',
      borderRadius: 2,
      paddingHorizontal: 7,
      paddingTop: 7,
      paddingBottom: 9,
      width: '100%'
    }}
    >
    <Text>
      <Text style={{ fontWeight: 'bold' }}>
        {` ${emergency.technicalNotes.warningLabel.title} `}
      </Text>
      <Text style={style.hiddenCardText}>{`${emergency.technicalNotes.warningLabel.text.firstPhrase} `}</Text>
      <Text style={style.hiddenCardText}>
        {emergency.technicalNotes.warningLabel.text.patientFollowingLink.text}
      </Text>
      <Text style={style.hiddenCardText}>
      {`\n${emergency.technicalNotes.warningLabel.text.secondPhrase} `}
      </Text>
      <Text
        onPress={() => Linking.openURL(
          emergency.technicalNotes.warningLabel.text.consciousnessTermLink.url
        )}
        style={{ color: '#87BA25' }}
      >
       {emergency.technicalNotes.warningLabel.text.consciousnessTermLink.text}
      </Text>
    </Text>
    </View>
    <View style={{ marginTop: 7, marginHorizontal: 8 }}>
      <Text style={style.hiddenCardText}>
        {emergency.technicalNotes.dosage.title}
      </Text>
      {emergency.technicalNotes.dosage.medicines.map(medicine => (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>
          {medicine.name}
          </Text>
          {medicine.dosages.map(dosage => (
            <Text style={style.hiddenCardText}>{dosage}</Text>
          ))}
        </View>
      ))}
    </View>
    </>
  );
  const HiddenStage3 = () => (
    <>
      <View style={{ marginTop: 20 }}>
        <Paragraph>
          {Internacao.sections.paragraphOne.firstPhrase}
          <Text style={{ fontWeight: 'bold' }}>
            {Internacao.sections.paragraphOne.bold}
          </Text>
          {Internacao.sections.paragraphOne.secondPhrase}
          <Text onPress={() => navigation.navigate('webview', { title: Internacao.sections.paragraphOne.link.title, url: Internacao.sections.paragraphOne.link.url })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{Internacao.sections.paragraphOne.link.text}</Text>
        </Paragraph>

        {Internacao.sections.paragraphOne.items.map(item => (
          <Paragraph>
            {item}
          </Paragraph>
        ))}
        <Paragraph style={{ marginVertical: 8 }}>
          <Text style={{ fontWeight: 'bold' }}>{Internacao.sections.paragraphTwo.bold}</Text>
          {Internacao.sections.paragraphTwo.secondPhrase}
          <Text onPress={() => (checkPlatform(Internacao.sections.paragraphTwo.link.url, 'Restricao do uso do oseltamivir.pdf'))} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{Internacao.sections.paragraphTwo.link.text}</Text>
          {Internacao.sections.paragraphTwo.ThirdPhrase}
        </Paragraph>
        <Paragraph>
          <Text style={{ fontWeight: 'bold' }}>{Internacao.sections.paragraphThree.bold}</Text>
          {Internacao.sections.paragraphThree.secondPhrase}
        <Text onPress={() => navigation.navigate('webview', { title: Internacao.sections.paragraphThree.link.title, url: Internacao.sections.paragraphThree.link.url })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{Internacao.sections.paragraphThree.link.text}</Text>
        </Paragraph>
        <Paragraph>
          <Text style={{ fontWeight: 'bold' }}>{Internacao.sections.paragraphFour.bold}</Text>
          {Internacao.sections.paragraphFour.secondPhrase}
          <Text onPress={() => navigation.navigate('webview', { title: Internacao.sections.paragraphFour.link.title, url: Internacao.sections.paragraphFour.link.url })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{Internacao.sections.paragraphFour.link.text}</Text>
        </Paragraph>
        <Paragraph style={{ marginVertical: 8 }}>
          {Internacao.sections.paragraphFive.firstPhrase}
          <Text style={{ fontWeight: 'bold' }}>{Internacao.sections.paragraphFive.bold}</Text>
          <Text onPress={() => navigation.navigate('webview', { title: Internacao.sections.paragraphFive.link.title, url: Internacao.sections.paragraphFive.link.url })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{Internacao.sections.paragraphFive.link.text}</Text>
        </Paragraph>

        <Paragraph>
          {Internacao.sections.paragraphSix}
        </Paragraph>
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
          <Image source={Pulmao} style={{ marginBottom: 16 }} />
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
