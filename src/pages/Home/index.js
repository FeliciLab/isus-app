import * as React from 'react';
import {
  View, ScrollView, Linking, Dimensions
} from 'react-native';
import {
  Title, Card, Caption, Paragraph
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import antIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Educacao from '../../assets/icons/educacao.svg';
import Pesquisa from '../../assets/icons/pesquisa.svg';
import Servico1 from '../../assets/icons/servicos/servico_1.svg';
import Servico2 from '../../assets/icons/servicos/servico_2.svg';
import Servico3 from '../../assets/icons/servicos/servico_3.svg';
import Servico4 from '../../assets/icons/servicos/servico_4.svg';
import Forca4 from '../../assets/icons/forca_4.svg';
import IconPaciente from '../../assets/icons/icon_paciente.svg';

import normalize from '../../utils/normalize';

export default function HomeScreen() {
  const navigation = useNavigation();

  async function redirectToWelcome() {
    const item = await AsyncStorage.getItem('@show-tutorial');
    const resp = JSON.parse(item);
    if (resp !== false) {
      return navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }]
      });
    }
    return null;
  }

  redirectToWelcome();

  function HomeCard({
    onPress, FontIcon, Logo, logoSize, title, width, height, color
  }) {
    return (
      <Card
        style={{
          padding: 4,
          height: Dimensions.get('window').width / (width || 4.5),
          width: Dimensions.get('window').width / (height || 4.5),
          justifyContent: 'center',
          borderColor: color,
          borderWidth: 1
        }}
        onPress={onPress}
      >
        <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
          {
            typeof Logo === 'string' ? <FontIcon name={Logo} size={logoSize || 40} color={color} /> : <Logo color={color} width={logoSize || 40} height={logoSize || 40} />

          }
        </View>
        <Caption style={{ textAlign: 'center', fontSize: 11, lineHeight: 10 }}>{title}</Caption>
      </Card>
    );
  }

  const sections = [
    {
      id: 'section-1',
      title: 'Minha Saúde',
      logo: 'heart',
      color: '#F2453D',
      FontIcon: Icon,
      onPress: () => navigation.navigate('Health')
    },
    {
      id: 'section-2',
      title: 'Educação',
      logo: Educacao,
      color: '#4CAF50',
      onPress: () => navigation.navigate('Education')
    },
    {
      id: 'section-3',
      title: 'Pesquisa',
      logo: Pesquisa,
      color: '#4054B2',
      onPress: () => navigation.navigate('Search')
    }
  ];

  const services = [
    {
      id: 'services-1',
      title: 'IntegraSUS',
      logo: Servico1,
      onPress: () => Linking.openURL('https://integrasus.saude.ce.gov.br')
    },
    {
      id: 'services-2',
      title: 'Central de Ventiladores',
      logo: Servico2,
      onPress: () => Linking.openURL('https://gestao-ventiladores.dev.org.br/')
    },
    {
      id: 'services-3',
      title: 'TeleMedicina',
      logo: Servico3,
      onPress: () => Linking.openURL('https://coronavirus.ceara.gov.br/isus/telemedicina')
    },
    {
      id: 'services-4',
      title: 'Mapa da saúde',
      logo: Servico4,
      onPress: () => Linking.openURL('https://mapas.esp.ce.gov.br')
    },
  ];

  const anticoronaActions = [
    {
      id: 'action-1',
      title: 'Boletins',
      logo: 'bulletin-board',
      FontIcon: Icon,
      onPress: () => Linking.openURL('https://coronavirus.ceara.gov.br/isus/boletins/')
    },
    {
      id: 'action-2',
      title: 'Notificações de casos',
      logo: 'form',
      FontIcon: antIcon,
      onPress: () => Linking.openURL('https://notifica.saude.gov.br/login')
    },
    {
      id: 'action-3',
      title: 'Farmaco-vigilância',
      logo: 'pills',
      FontIcon: FontAwesome5Icon,
      onPress: () => Linking.openURL('https://coronavirus.ceara.gov.br/isus/farmacovigilancia/')
    },
    {
      id: 'action-4',
      title: 'Ações do governo',
      logo: Forca4,
      onPress: () => Linking.openURL('https://coronavirus.ceara.gov.br/isus/governo/')
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
       <View
         style={{
           flexDirection: 'row',
           justifyContent: 'space-evenly',
           marginVertical: 20,
           marginHorizontal: 11
         }}
       >
         {
           sections.map(section => (
            <HomeCard
              key={section.id}
              title={section.title}
              Logo={section.logo}
              width={3.3}
              height={3.3}
              logoSize={60}
              FontIcon={section.FontIcon || Icon}
              color={section.color}
              onPress={section.onPress}
            />
           ))
         }
       </View>
      <Title style={{ margin: 15, color: '#FF9800', fontSize: 20 }}>Serviços</Title>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 20,
          marginHorizontal: 11
        }}
      >
        {
          services.map(service => (
            <HomeCard
              key={service.id}
              title={service.title}
              Logo={service.logo}
              FontIcon={service.FontIcon || Icon}
              color="#FF9800"
              onPress={service.onPress}
            />
          ))
        }
      </View>

      <Title style={{ margin: 15, fontSize: 20 }}>Força-tarefa Anticorona</Title>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 20,
          marginHorizontal: 16
        }}
      >
        {
          anticoronaActions.map(actions => (
            <HomeCard
              key={actions.id}
              title={actions.title}
              Logo={actions.logo}
              FontIcon={actions.FontIcon || Icon}
              color="rgba(0, 0, 0, 0.6)"
              onPress={actions.onPress}
            />
          ))
        }
      </View>

      <Card
        onPress={() => navigation.navigate('clinical management')
        }
        style={{
          marginVertical: 20,
          marginHorizontal: 16,
          borderRadius: 10,
          backgroundColor: '#4054B2',
          height: 130,
          // alignItems: 'center'
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View
            style={{
              height: 80,
              width: 80,
              borderRadius: 80,
              marginHorizontal: 24
            }}
          >
            <IconPaciente />
          </View>
          <View style={{
            flex: 2
          }}
          >
            <Paragraph style={{ fontSize: normalize(16), color: '#FFEB3B' }}>
              Manejo Clínico de Paciente com Covid-19
            </Paragraph>
            <Caption style={{ color: '#F2F2F2' }}>
              Orientações sobre cada estágio de atendimento a pacientes com Covid-19
            </Caption>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}
