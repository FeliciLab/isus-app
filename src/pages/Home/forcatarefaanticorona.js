import React from 'react';
import { Title } from 'react-native-paper';
import { FlatList } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import antIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeCard from './homeCard';
import IconeCentralDeVentiladores from '../../assets/icons/central_ventiladores.svg';
import NotasTecnicasIcon from '../../assets/icons/icon_notastecnicas.svg';

function ForcaTarefaAntiCorona({ navigation }) {
  const ListaForcaTarefaAntiCorona = [
    {
      id: 'action-1',
      title: 'Boletins',
      logo: 'bulletin-board',
      FontIcon: Icon,
      onPress: () => navigation.navigate('webview', {
        title: 'Boletins',
        url: 'https://coronavirus.ceara.gov.br/boletins/'
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
      onPress: () => navigation.navigate('webview', { title: 'Notas Técnicas', url: 'https://coronavirus.ceara.gov.br/profissional/documentos/notas-tecnicas/' })
    },
    {
      id: 'services-2',
      title: 'Central de Ventiladores',
      logo: IconeCentralDeVentiladores,
      onPress: () => navigation.navigate('webview', { title: 'Central de Ventiladores', url: 'https://coronavirus.ceara.gov.br/centraldeventiladores/' })

    },
  ];

  return (
    <>
            <Title style={{ marginHorizontal: 16, color: 'rgba(0, 0, 0, 0.6)' }}>Força-tarefa Anticorona</Title>

            <FlatList
              data={ListaForcaTarefaAntiCorona}
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
    </>
  );
}

export default ForcaTarefaAntiCorona;
