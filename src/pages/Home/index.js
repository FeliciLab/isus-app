import * as React from 'react';
import {
  View, ScrollView, Linking, Dimensions
} from 'react-native';
import {
  Title, Card, Caption, Headline
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
          marginVertical: 10,
          padding: 6,
          height: Dimensions.get('window').width / 3.3,
          width: Dimensions.get('window').width / 3.3,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={onPress}
      >
        <Icon style={{ alignSelf: 'center' }} name={icon} size={40} color="#111" />
        <Caption style={{ textAlign: 'center', fontSize: 10 }}>{title}</Caption>
      </Card>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
      <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-evenly' }}>
        <HomeCard
          title="Visite o site do Profissional de Saúde"
          icon="stethoscope"
          onPress={() => Linking.openURL('https://coronavirus.ceara.gov.br/profissional/')}
        />
        <HomeCard
          title="Visite o nosso Sistema Central de Ventiladores"
          icon="clipboard-plus"
          onPress={() => Linking.openURL('https://gestao-ventiladores.dev.org.br/')}
        />

        <HomeCard
          title="Visite o nosso Sistema Central de Ventiladores"
          icon="clipboard-plus"
          onPress={() => Linking.openURL('https://gestao-ventiladores.dev.org.br/')}
        />
      </View>

      <Title>Sistema</Title>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-evenly',
          flexWrap: 'wrap'
        }}
      >
        <HomeCard
          title="Visite o site do Profissional de Saúde"
          icon="stethoscope"
          onPress={() => Linking.openURL('https://coronavirus.ceara.gov.br/profissional/')}
        />
        <HomeCard
          title="Visite o nosso Sistema Central de Ventiladores"
          icon="clipboard-plus"
          onPress={() => Linking.openURL('https://gestao-ventiladores.dev.org.br/')}
        />

        <HomeCard
          title="Visite o nosso Sistema Central de Ventiladores"
          icon="clipboard-plus"
          onPress={() => Linking.openURL('https://gestao-ventiladores.dev.org.br/')}
        />
        <HomeCard
          title="Visite o site do Profissional de Saúde"
          icon="stethoscope"
          onPress={() => Linking.openURL('https://coronavirus.ceara.gov.br/profissional/')}
        />
        <HomeCard
          title="Visite o nosso Sistema Central de Ventiladores"
          icon="clipboard-plus"
          onPress={() => Linking.openURL('https://gestao-ventiladores.dev.org.br/')}
        />

        <HomeCard
          title="Visite o nosso Sistema Central de Ventiladores"
          icon="clipboard-plus"
          onPress={() => Linking.openURL('https://gestao-ventiladores.dev.org.br/')}
        />
      </View>

      <Card onPress={() => navigation.navigate('teste')} style={{ margin: 30 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ height: 120, width: 120, backgroundColor: '#cccccc' }} />
          <View style={{ marginHorizontal: 15 }}>
            <Headline>COVID-19</Headline>
            <Caption style={{ maxWidth: 200 }}>Encontre informações do COVID-19 aqui!</Caption>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}
