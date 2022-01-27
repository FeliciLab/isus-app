import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useAnalytics from '~/hooks/useAnalytics';
import IconeSus30Anos from '../../assets/images/sus_30_anos.png';
import { labelsAnalytics } from '../../constantes/labelsAnalytics';
import { TESTIDS } from '../../constantes/testIDs';
import {
  TextoSobreESP,
  TextoSobreSESA,
  TextoSobreSUS,
  TextoSobreSUSCeara,
} from './textos';

const informacoes = {
  InstagramESP: {
    tituloCompleto: 'Instagram do ESP/CE',
    url: 'https://www.instagram.com/espceara/',
    urlLinking: 'instagram://user?username=espceara',
    urlLinkingAndroid: 'instagram://user?username=espceara',
  },
  FacebookESP: {
    tituloCompleto: 'Facebook do ESP/CE',
    url: 'https://www.facebook.com/espceara/',
    urlLinking: 'fb://profile/210165089080732',
    urlLinkingAndroid: 'fb://page/210165089080732',
  },
  LinkedinESP: {
    tituloCompleto: 'Linkedin do ESP/CE',
    url: 'https://www.linkedin.com/in/espceara/',
    urlLinking: 'linkedin://in/espceara/',
    urlLinkingAndroid: 'linkedin://profile/in/espceara/',
  },
  YoutubeESP: {
    tituloCompleto: 'Youtube do ESP/CE',
    url: 'https://www.youtube.com/channel/UC_G1Zak1oxOctqap579R9cA',
    urlLinking: 'vnd.youtube://channel/UC_G1Zak1oxOctqap579R9cA',
    urlLinkingAndroid: 'youtube://channel/UC_G1Zak1oxOctqap579R9cA',
  },
  SiteESP: {
    tituloCompleto: 'Site da ESP/CE',
    url: 'https://www.esp.ce.gov.br/',
  },
  InstagramSaude: {
    tituloCompleto: 'Instagram da Saúde do Ceará',
    url: 'https://www.instagram.com/saudeceara/',
    urlLinking: 'instagram://user?username=saudeceara',
    urlLinkingAndroid: 'instagram://user?username=saudeceara',
  },
  FacebookSaude: {
    tituloCompleto: 'Facebook da Saúde do Ceará',
    url: 'https://www.facebook.com/SaudeCeara/',
    urlLinking: 'fb://profile/273289709468123',
    urlLinkingAndroid: 'fb://page/273289709468123',
  },
  SiteSaude: {
    tituloCompleto: 'Site da Saúde do Ceará',
    url: 'https://www.saude.ce.gov.br/',
  },
  Plano: {
    tituloCompleto: 'Plano de Modernização da Saúde',
    url:
      'https://www.saude.ce.gov.br/wp-content/uploads/sites/9/2019/09/plataforma_de_modernizacao_da_saude_13_08_2019.pdf',
  },
};

export default function SusNoCearaScreen() {
  const { analyticsData } = useAnalytics();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'SUS no Ceará',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}>
          <Icon name="magnify" size={28} color="#FFF" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Icon name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
        padding: 15,
        marginBottom: 20,
      }}>
      <View
        style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Image
          source={IconeSus30Anos}
          style={{
            marginTop: 15,
            marginBottom: 15,
          }}
          resizeMode="contain"
        />
      </View>
      <TextoSobreSUS />
      <List.Accordion
        testID={TESTIDS.ACORDEON_SUS_NO_CEARA}
        onPress={() =>
          analyticsData(labelsAnalytics.SUS_NO_CEARA, 'Click', 'SUS no Ceará')
        }
        titleStyle={{ color: 'black' }}
        title={<Text style={estilos.titulo}>SUS no Ceará</Text>}>
        <List.Item titleNumberOfLines={80} title={<TextoSobreSUSCeara />} />
        <List.Item
          left={() => <List.Icon icon="file-document" color="#808080" />}
          title="Plano de Modernização da Saúde"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => linkingURLouApp('Plano', 'site')}
        />
      </List.Accordion>
      <List.Accordion
        testID={TESTIDS.ACORDEON_ISUS_ESP}
        onPress={() =>
          analyticsData(labelsAnalytics.ISUS_ESP, 'Click', 'SUS no Ceará')
        }
        titleStyle={{ color: 'black' }}
        title={<Text style={estilos.titulo}>O iSUS é ESP</Text>}>
        <List.Item titleNumberOfLines={80} title={<TextoSobreSESA />} />
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
          onPress={() => linkingURLouApp('SiteESP', 'site')}
        />
        <Divider style={estilos.borda} />
      </List.Accordion>
      <List.Accordion
        testID={TESTIDS.ACORDEON_ESP_SESA}
        onPress={() =>
          analyticsData(labelsAnalytics.ESP_SESA, 'Click', 'SUS no Ceará')
        }
        titleStyle={{ color: 'black' }}
        title={<Text style={estilos.titulo}>A ESP é SESA</Text>}>
        <List.Item titleNumberOfLines={80} title={<TextoSobreESP />} />
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
          onPress={() =>
            Linking.openURL('http://api.whatsapp.com/send?phone=5585984394810')
          }
        />
        <Divider style={estilos.borda} />
        <List.Item
          left={() => <List.Icon icon="web" color="#808080" />}
          title="Site"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => linkingURLouApp('SiteSaude', 'site')}
        />
        <Divider style={estilos.borda} />
      </List.Accordion>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 18,
  },
  borda: {
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    marginBottom: 5,
  },
});

const linkingURLouApp = (titulo, tipo) => {
  if (tipo !== 'site') {
    let pegarUrlouApp = '';
    if (Platform.OS === 'ios') {
      pegarUrlouApp = `${informacoes[titulo].urlLinking}`;
    } else {
      pegarUrlouApp = `${informacoes[titulo].urlLinkingAndroid}`;
    }

    Linking.canOpenURL(pegarUrlouApp)
      .then(suportado => {
        if (!suportado) {
          Linking.openURL(`${informacoes[titulo].url}`);
          return;
        }
        Linking.openURL(pegarUrlouApp);
      })
      .catch(err => {
        console.error('Ocorreu um erro', err);
        Linking.openURL(`${informacoes[titulo].url}`);
      });
  } else {
    Linking.openURL(`${informacoes[titulo].url}`);
  }
};
