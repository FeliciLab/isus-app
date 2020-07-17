import React from 'react';
import { Title } from 'react-native-paper';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Servico1 from '../../assets/icons/servicos/integrasus_icon.svg';
import Servico2 from '../../assets/icons/servicos/servico_2.svg';
import IconeFeedback from '../../assets/icons/feedback_icon.svg';
import Forca4 from '../../assets/icons/ceara_icon.svg';
import HomeCard from './homeCard';

function Servicos({ navigation }) {
  const listaServicos = [
    {
      id: 'services-1',
      titulo: 'IntegraSUS',
      logo: Servico1,
      navegacao: {
        componente: 'webview',
        titulo: 'IntegraSUS',
        url: 'https://integrasus.saude.ce.gov.br'
      }
    },
    {
      id: 'services-2',
      titulo: 'Central de Ventiladores',
      logo: Servico2,
      navegacao: {
        componente: 'webview',
        titulo: 'Central de Ventiladores',
        url: 'https://coronavirus.ceara.gov.br/centraldeventiladores/'
      }
    },
    {
      id: 'services-3',
      titulo: 'Feedback',
      logo: IconeFeedback,
      navegacao: {
        componente: 'FEEDBACK'
      }
    },
    {
      id: 'services-4',
      titulo: 'Ações do governo',
      logo: Forca4,
      navegacao: {
        componente: 'webview',
        titulo: 'Ações do governo',
        url: 'https://coronavirus.ceara.gov.br/isus/governo/'
      }
    }
  ];

  return (
    <>
      <Title style={{ alignSelf: 'center', color: '#FF9800' }}>Serviços</Title>

      <FlatList
        data={listaServicos}
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
    </>
  );
}


export default Servicos;
