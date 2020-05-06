import * as React from 'react';
import {
  View, ScrollView, Linking, Dimensions
} from 'react-native';
import {
  Title, Card, Caption, Paragraph
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

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

  function HomeCard({ onPress, icon, title }) {
    return (
      <Card
        style={{
          // marginVertical: 10,
          padding: 4,
          height: Dimensions.get('window').width / 4.3,
          width: Dimensions.get('window').width / 4.3,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#111',
          borderWidth: 0.2
        }}
        onPress={onPress}
      >
        <Icon style={{ alignSelf: 'center' }} name={icon} size={40} color="#111" />
        <Caption style={{ textAlign: 'center', fontSize: 8 }}>{title}</Caption>
      </Card>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Title style={{ margin: 15 }}>Serviços</Title>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 20
        }}
      >
        <HomeCard
          title="IntegraSUS"
          icon="map-marker"
          onPress={() => Linking.openURL('https://integrasus.saude.ce.gov.br')}
        />
        <HomeCard
          title="Central de Ventiladores"
          icon="clipboard-plus"
          onPress={() => Linking.openURL('https://gestao-ventiladores.dev.org.br/')}
        />

        <HomeCard
          title="TeleMedicina"
          icon="wechat"
          onPress={() => Linking.openURL('https://coronavirus.ceara.gov.br/isus/telemedicina')}
        />
        <HomeCard
          title="Mapa da saúde"
          icon="map-search"
          onPress={() => Linking.openURL('https://mapas.esp.ce.gov.br')}
        />
      </View>

      <Title style={{ margin: 15 }}>Força-tarefa Anticorona</Title>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 20
        }}
      >
        <HomeCard
          title="Boletins"
          icon="newspaper"
          onPress={() => Linking.openURL('https://coronavirus.ceara.gov.br/isus/boletins/')}
        />
        <HomeCard
          title="Notificações de casos"
          icon="page-next-outline"
          onPress={() => Linking.openURL('https://notifica.saude.gov.br/login')}
        />

        <HomeCard
          title="Farmaco-vigilância"
          icon="pill"
          onPress={() => Linking.openURL('https://coronavirus.ceara.gov.br/isus/farmacovigilancia/')
          }
        />
        <HomeCard
          title="Açoes do governo"
          icon="calendar-month"
          onPress={() => Linking.openURL('https://coronavirus.ceara.gov.br/isus/governo/')}
        />
      </View>

      <Card
        onPress={() => Linking.openURL('https://coronavirus.ceara.gov.br/profissional/manejoclinico/')
        }
        style={{
          margin: 20,
          borderRadius: 10,
          backgroundColor: '#4054B2',
          height: 130,
          padding: 10
          // alignItems: 'center'
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              height: 80,
              width: 80,
              backgroundColor: '#fff',
              borderRadius: 80,
              alignSelf: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon style={{ alignSelf: 'center' }} name="doctor" size={40} color="#111" />
          </View>
          <View style={{ marginHorizontal: 15, alignSelf: 'center' }}>
            <Paragraph style={{ maxWidth: 200, color: '#FFEB3B' }}>
              Manejo Clínico de Paciente com Covid-19
            </Paragraph>
            <Caption style={{ textAlign: 'center', maxWidth: 200, color: '#F2F2F2' }}>
              Orientações sobre cada estágio de atendimento a pacientes com Covid-19
            </Caption>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

