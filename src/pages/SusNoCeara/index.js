import React, { useLayoutEffect } from 'react';
import {
  Text, TouchableOpacity, StyleSheet, Linking, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { List, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import {
  TextoSobreSUS, TextoSobreSESA, TextoSobreESP
} from './textos';
import { navigate } from '../../routes/rootNavigation';

const informacoes = {
  InstagramESP: {
    tituloCompleto: 'Instagram do ESP/CE',
    tituloNavegar: 'InstagramESP',
    url: 'https://www.instagram.com/espceara/',
    urlLinking: 'instagram://user?username=espceara',
    urlLinkingAndroid: 'instagram://user?username=espceara'
  },
  FacebookESP: {
    tituloCompleto: 'Facebook do ESP/CE',
    tituloNavegar: 'FacebookESP',
    url: 'https://www.facebook.com/espceara/',
    urlLinking: 'fb://profile/210165089080732',
    urlLinkingAndroid: 'fb://page/210165089080732'
  },
  LinkedinESP: {
    tituloCompleto: 'Linkedin do ESP/CE',
    tituloNavegar: 'LinkedinESP',
    url: 'https://www.linkedin.com/in/espceara/',
    urlLinking: 'linkedin://in/espceara/',
    urlLinkingAndroid: 'linkedin://profile/in/espceara/'
  },
  YoutubeESP: {
    tituloCompleto: 'Youtube do ESP/CE',
    tituloNavegar: 'YoutubeESP',
    url: 'https://www.youtube.com/channel/UC_G1Zak1oxOctqap579R9cA',
    urlLinking: 'vnd.youtube://channel/UC_G1Zak1oxOctqap579R9cA',
    urlLinkingAndroid: 'vnd.youtube://channel/UC_G1Zak1oxOctqap579R9cA'
  },
  SiteESP: {
    tituloCompleto: 'Site do ESP/CE',
    url: 'https://www.esp.ce.gov.br/'
  },
  InstagramSaude: {
    tituloCompleto: 'Instagram da Saúde do Ceará',
    tituloNavegar: 'InstagramSaude',
    url: 'https://www.instagram.com/saudeceara/',
    urlLinking: 'instagram://user?username=saudeceara',
    urlLinkingAndroid: 'instagram://user?username=saudeceara'
  },
  FacebookSaude: {
    tituloCompleto: 'Facebook da Saúde do Ceará',
    tituloNavegar: 'FacebookSaude',
    url: 'https://www.facebook.com/SaudeCeara/',
    urlLinking: 'fb://profile/273289709468123',
    urlLinkingAndroid: 'fb://page/273289709468123'
  },
  SiteSaude: {
    tituloCompleto: 'Site da Saúde do Ceará',
    url: 'https://www.saude.ce.gov.br/'
  }
};

export default function SusNoCearaScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'SUS no Ceará',
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

  return (
    <ScrollView style={{
      backgroundColor: '#ffffff', flex: 1, padding: 15, marginBottom: 20
    }}
    >

      <List.Accordion titleStyle={{ color: 'black' }} title={<Text style={estilos.titulo}>SUS no Ceará</Text>}>
        <List.Item
          titleNumberOfLines={80}
          title={<TextoSobreSUS />}
        />
      </List.Accordion>
      <List.Accordion titleStyle={{ color: 'black' }} title={<Text style={estilos.titulo}>O iSUS é ESP</Text>}>
        <List.Item
          titleNumberOfLines={80}
          title={<TextoSobreSESA />}
        />
        <List.Item
          left={() => <List.Icon icon="instagram" color="#808080" />}
          title="Instagram"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => linkingURLouApp('InstagramESP')}
        />
        <Divider style={estilos.borda} />
        <List.Item
          left={() => <List.Icon icon="facebook" color="#808080" />}
          title="Facebook"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => linkingURLouApp('FacebookESP')}
        />
        <Divider style={estilos.borda} />
        <List.Item
          left={() => <List.Icon icon="linkedin" color="#808080" />}
          title="Linkedin"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => linkingURLouApp('LinkedinESP')}
        />
        <Divider style={estilos.borda} />
        <List.Item
          left={() => <List.Icon icon="youtube" color="#808080" />}
          title="Youtube"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => linkingURLouApp('YoutubeESP')}
        />
        <Divider style={estilos.borda} />
        <List.Item
          left={() => <List.Icon icon="web" color="#808080" />}
          title="Site"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navegar('SiteESP')}
        />
        <Divider style={estilos.borda} />
      </List.Accordion>
      <List.Accordion titleStyle={{ color: 'black' }} title={<Text style={estilos.titulo}>A ESP é SESA</Text>}>
        <List.Item
          titleNumberOfLines={80}
          title={<TextoSobreESP />}
        />
        <List.Item
          left={() => <List.Icon icon="instagram" color="#808080" />}
          title="Instagram"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => linkingURLouApp('InstagramSaude')}
        />
        <Divider style={estilos.borda} />
        <List.Item
          left={() => <List.Icon icon="facebook" color="#808080" />}
          title="Facebook"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => linkingURLouApp('FacebookSaude')}
        />
        <Divider style={estilos.borda} />
        <List.Item
          left={() => <List.Icon icon="whatsapp" color="#808080" />}
          title="WhatsApp"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => Linking.openURL('http://api.whatsapp.com/send?phone=5585984394810')}
        />
        <Divider style={estilos.borda} />
        <List.Item
          left={() => <List.Icon icon="web" color="#808080" />}
          title="Site"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navegar('SiteSaude')}
        />
        <Divider style={estilos.borda} />
      </List.Accordion>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 18
  },
  borda: {
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    marginBottom: 5
  }
});

const navegar = (titulo) => {
  navigate('webview', { title: informacoes[titulo].tituloCompleto, url: informacoes[titulo].url });
};

const linkingURLouApp = (titulo) => {
  let pegarUrlouApp = '';
  if (Platform.OS === 'ios') {
    pegarUrlouApp = `${informacoes[titulo].urlLinking}`;
  } else {
    pegarUrlouApp = `${informacoes[titulo].urlLinkingAndroid}`;
  }

  Linking.canOpenURL(pegarUrlouApp)
    .then((suportado) => {
      if (!suportado) {
        // console.log('URL não suportada');
        navegar(`${informacoes[titulo].tituloNavegar}`);
        return;
      }
      Linking.openURL(pegarUrlouApp);
    }).catch(err => console.error('Ocorreu um erro', err));
};
