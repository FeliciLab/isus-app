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

  function HomeCard({
    onPress, icon, iconSize, title, width, height
  }) {
    return (
      <Card
        style={{
          // marginVertical: 10,
          marginHorizontal: 5,
          padding: 4,
          height: Dimensions.get('window').width / (width || 4.5),
          width: Dimensions.get('window').width / (height || 4.5),
          justifyContent: 'center',
          borderColor: '#111',
          borderWidth: 0.2
        }}
        onPress={onPress}
      >
        <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={iconSize || 40} color="#111" />
        </View>
        <Caption style={{ textAlign: 'center', fontSize: 11, lineHeight: 10 }}>{title}</Caption>
      </Card>
    );
  }

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
        <HomeCard
          title="Minha Saúde"
          icon="heart"
          width={3.3}
          height={3.3}
          iconSize={60}
          onPress={() => Linking.openURL('https://integrasus.saude.ce.gov.br')}
        />
        <HomeCard
          title="Central de Ventiladores"
          icon="clipboard-plus"
          width={3.3}
          height={3.3}
          iconSize={60}
          onPress={() => Linking.openURL('https://gestao-ventiladores.dev.org.br/')}
        />

        <HomeCard
          title="TeleMedicina"
          icon="wechat"
          width={3.3}
          height={3.3}
          iconSize={60}
          onPress={() => Linking.openURL('https://coronavirus.ceara.gov.br/isus/telemedicina')}
        />

       </View>
      <Title style={{ margin: 15 }}>Serviços</Title>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 20,
          marginHorizontal: 11
        }}
      >
        <HomeCard
          title="IntegraSUS"
          icon="heart"
          iconSize={40}
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
          marginVertical: 20,
          marginHorizontal: 16
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
