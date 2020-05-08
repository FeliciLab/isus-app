import React, { useState } from 'react';
import {
  Text, ScrollView, View, StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Button } from 'react-native-paper';
import Estagio1 from '../../assets/icons/estagiosManejo/estagio01.svg';

export default function ClinicalManagement() {
  const [stage1Collapse, setStage1Collapse] = useState(false);
  //   const { stage2Collapse, setStage2Collapse } = useState(false);
  //   const { stage3Collapse, setStage3Collapse } = useState(false);
  //   const { stage4Collapse, setStage4Collapse } = useState(false);
  //   const { stage5Collapse, setStage5Collapse } = useState(false);

  const ClinicalButton = ({ label }) => (
    <TouchableOpacity style={{ marginVertical: 8 }}>
        <View style={style.clinicalButton}>
            <Text style={style.textButton}>
                {label}
            </Text>
        </View>
    </TouchableOpacity>
  );

  const CardStage = ({
    isCollapsed, collapsedMethod, cardHeight, stageTitle, title, subtitle, Logo, HideContent
  }) => (
    <Card style={{ height: isCollapsed ? cardHeight : 172 }}>
        <View style={{ flexDirection: 'row', flex: 1, padding: 18 }}>
            <View style={{ flex: 1 }}>
                <Text style={{
                  marginVertical: 7, letterSpacing: 1.5, color: 'rgba(0, 0, 0, 0.87)', fontSize: 10
                }}
                >
                   { stageTitle }
                </Text>
                <Text style={{ color: '#4054B2', fontSize: 24 }}>{ title }</Text>
                <Text style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: 14, marginVertical: 15 }}>{ subtitle }</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Logo width="160" height="140" />
            </View>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
            {
                isCollapsed && <HideContent />
            }
        </View>
        <Card.Actions>
            <Button style={{ color: '#4054B2', letterSpacing: 0.75 }} onPress={() => collapsedMethod(!isCollapsed)}>
                { isCollapsed ? 'fechar' : 'Saiba mais' }
            </Button>
        </Card.Actions>
    </Card>
  );

  const cardItems = [
    {
      id: 1,
      stageTitle: 'Estágio 01 (2-5 dias)',
      title: 'Casa',
      subtitle: 'Auto-avaliação',
      Logo: Estagio1,
      isCollapsed: stage1Collapse,
      collapsedMethod: setStage1Collapse,
      cardHeight: 436,
      HideContent: (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text>Telesaúde</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text>Plantão Corona Vírus</Text>
            </View>
        </View>
      )
    }
  ];

  return (
      <ScrollView style={{ paddingHorizontal: 16, backgroundColor: '#fff' }}>
        <View style={{
          marginTop: 26, flex: 1
        }}
        >
            <Text style={{ fontSize: 24, color: '#4054B2' }}>Manejo clínico dos pacientes com Covid-19</Text>
            <Text style={{ color: 'rgba(0, 0, 0, 0.6)', marginVertical: 16 }}>Adotar todas as medidas para prevenção de contágio pela COVID-19 por ocasião de atendimento, incluindo o uso correto dos EPIs disponibilizados.</Text>
            <View>
                <ClinicalButton label="CONFIRA VÍDEOS DE PARAMENTAÇÃO" />
                <ClinicalButton label="consulte especialistas! telemedicina" />
            </View>
            {/* Card goes here */}
            <View style={{ marginVertical: 16 }}>
            {
                // eslint-disable-next-line max-len
                cardItems.map(item => <CardStage key={item.id} cardHeight={item.cardHeight} collapsedMethod={item.collapsedMethod} is-collapsed={item.isCollapsed} stage-title={item.title} stageTitle={item.stageTitle} title={item.title} subtitle={item.subtitle} Logo={item.Logo} />)
            }
            </View>
            <View>
                <Text style={{ fontSize: 20, color: '#4054B2' }}>
                    Notifique casos suspeitos de covid-19
                </Text>
                <Text style={{ color: '#4054B2' }}>Assegurar a notificação do caso, sua confirmação e inclusão em base de dados da vigilância epdemiológica e do registro eletrônico dos pacientes.</Text>
                <ClinicalButton label="acesse a plataforma de notificação" />
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
  }
});
