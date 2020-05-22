import * as React from 'react';
import {
  View, ScrollView, TouchableOpacity, Image, FlatList
} from 'react-native';
import {
  Title, Card, Caption, Paragraph
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import antIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Servico1 from '../../assets/icons/servicos/servico_1.png';
import Servico2 from '../../assets/icons/servicos/servico_2.svg';
import Servico3 from '../../assets/icons/servicos/servico_3.svg';
import NotasTecnicasIcon from '../../assets/icons/icon_notastecnicas.svg';
import Forca4 from '../../assets/icons/forca_4.png';
import IconPaciente from '../../assets/icons/icon_paciente.png';

import normalize from '../../utils/normalize';

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

  function Banner() {
    return (
      <Card
        onPress={() => navigation.navigate('clinical management')}
        style={{
          marginVertical: 20,
          marginHorizontal: 16,
          borderRadius: 10,
          backgroundColor: '#4054B2',
          minHeight: 130,
          alignCotent: 'stretch'
          // alignItems: 'center'
        }}
      >
        <View
          style={{
            marginHorizontal: 12,
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1
          }}
        >
          <View
            style={{
              height: 80,
              width: 80,
              borderRadius: 80
            }}
          >
            <Image source={IconPaciente} />
          </View>
          <View style={{ flex: 1, paddingHorizontal: 12 }}>
            <Paragraph style={{ fontSize: normalize(16), color: '#FFEB3B' }}>
              Manejo Clínico de Paciente com Covid-19
            </Paragraph>
          </View>
        </View>
      </Card>
    );
  }

  function HomeCard({
    onPress, FontIcon, Logo, logoSize, title, color, isImage, margin
  }) {
    margin = margin || 0;
    return (
      <Card
        style={{
          padding: 4,
          height: 135,
          width: 135,
          margin,
          justifyContent: 'center',
          borderColor: color,
          borderWidth: 0.6,
          borderRadius: 8
        }}
        onPress={onPress}
      >
        <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
          {// Provisório enquanto os svgs corretos não chegam
          // eslint-disable-next-line no-nested-ternary
          isImage ? (
            <Image source={Logo} style={{ height: 50, width: 50 }} resizeMode="contain" />
          ) : typeof Logo === 'string' ? (
            <FontIcon name={Logo} size={logoSize || 50} color={color} />
          ) : (
            <Logo color={color} width={logoSize || 50} height={logoSize || 50} />
          )}
        </View>
        <Caption style={{ textAlign: 'center', fontSize: 12, lineHeight: 16 }}>{title}</Caption>
      </Card>
    );
  }

  const services = [
    {
      id: 'services-1',
      title: 'IntegraSUS',
      logo: Servico1,
      isImage: true,
      onPress: () => navigation.navigate('webview', {
        title: 'IntegraSUS',
        url: 'https://integrasus.saude.ce.gov.br'
      })
    },
    {
      id: 'services-2',
      title: 'Central de Ventiladores',
      logo: Servico2,
      onPress: () => navigation.navigate('webview', {
        title: 'Central de Ventiladores',
        url: 'https://coronavirus.ceara.gov.br/centraldeventiladores/'
      })
    },
    {
      id: 'services-3',
      title: 'TeleMedicina',
      logo: Servico3,
      onPress: () => navigation.navigate('webview', {
        title: 'TeleMedicina',
        url: 'https://coronavirus.ceara.gov.br/isus/telemedicina'
      })
    },
    {
      id: 'services-4',
      title: 'Ações do governo',
      logo: Forca4,
      isImage: true,
      onPress: () => navigation.navigate('webview', {
        title: 'Ações do governo',
        url: 'https://coronavirus.ceara.gov.br/isus/governo/'
      })
    }
  ];

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
  console.tron.log(services);
  return (
    <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Banner />

      <Title style={{ alignSelf: 'center', color: '#FF9800' }}>Serviços</Title>

      <FlatList
        data={services}
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
            Logo={item.logo}
            margin={10}
            isImage={item.isImage || false}
            FontIcon={item.FontIcon || Icon}
            color="#FF9800"
            onPress={item.onPress}
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
  );
}
