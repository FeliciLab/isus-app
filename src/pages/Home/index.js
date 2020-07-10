import React from 'react';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import antIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import NotasTecnicasIcon from '../../assets/icons/icon_notastecnicas.svg';

import ProviderDeVersaoDoManejo from '../ClinicalManagement/contexto/contextoVersaoManejo';
import Banner from './banner';
import HomeCard from './homeCard';
import servicos from './servicos';

const notasTecnicasLink = 'https://coronavirus.ceara.gov.br/profissional/documentos/notas-tecnicas/';

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'iSUS',
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
            navigation.toggleDrawer();
          }}
        >
          <Icon name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  const anticoronaActions = [
    {
      id: 'action-1',
      title: 'Boletins',
      logo: 'bulletin-board',
      FontIcon: Icon,
      onPress: () => navigation.navigate('webview', {
        title: 'Boletins',
        url: 'https://coronavirus.ceara.gov.br/isus/boletins/'
      })
    },
    {
      id: 'action-2',
      title: 'Notificações de casos',
      logo: 'form',
      FontIcon: antIcon,
      onPress: () => navigation.navigate('webview', {
        title: 'Notificações de casos',
        url: 'https://notifica.saude.gov.br/login'
      })
    },
    {
      id: 'action-3',
      title: 'Farmaco-vigilância',
      logo: 'pills',
      FontIcon: FontAwesome5Icon,
      onPress: () => navigation.navigate('webview', {
        title: 'Farmaco-vigilância',
        url: 'https://coronavirus.ceara.gov.br/isus/farmacovigilancia/'
      })
    },
    {
      id: 'action-4',
      title: 'Notas Técnicas',
      logo: NotasTecnicasIcon,
      onPress: () => navigation.navigate('webview', { title: 'Notas Técnicas', url: notasTecnicasLink })
    }
  ];
  console.tron.log(servicos);
  return (
    <ProviderDeVersaoDoManejo>
    <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Banner />

      <Title style={{ alignSelf: 'center', color: '#FF9800' }}>Serviços</Title>

      <FlatList
        data={servicos}
        numColumns={2}
        keyExtractor={(item, index) => `${index}`}
        style={{
          flexDirection: 'row',
          alignSelf: 'center'
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <HomeCard
            key={item.id}
            title={item.titulo}
            Logo={item.logo}
            margin={10}
            isImage={item.isImage || false}
            FontIcon={item.FontIcon || Icon}
            color="#FF9800"
            onPress={() => navigation.navigate(item.navegacao.componente, {
              title: item.navegacao.titulo,
              url: item.navegacao.url
            })}
          />
        )}
      />

      <Title style={{ alignSelf: 'center' }}>Força-tarefa Anticorona</Title>

      <FlatList
        data={anticoronaActions}
        numColumns={2}
        keyExtractor={(item, index) => `${index}`}
        style={{
          flexDirection: 'row',
          alignSelf: 'center'
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <HomeCard
            key={item.id}
            title={item.title}
            margin={10}
            Logo={item.logo}
            isImage={item.isImage || false}
            FontIcon={item.FontIcon || Icon}
            color="rgba(0, 0, 0, 0.6)"
            onPress={item.onPress}
          />
        )}
      />
    </ScrollView>
    </ProviderDeVersaoDoManejo>
  );
}
