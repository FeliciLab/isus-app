import React from 'react';
import { Title } from 'react-native-paper';
import { FlatList, StyleSheet, Linking } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import QualiQuizIcon from '../../../assets/icons/servicos/qualiquiz.svg';
import Servico1 from '../../../assets/icons/servicos/servico_1.svg';
import Servico2 from '../../../assets/icons/servicos/servico_2.svg';
import Servico3 from '../../../assets/icons/servicos/servico_3.svg';
import Servico4 from '../../../assets/icons/servicos/servico_4.svg';
import Servico5 from '../../../assets/icons/servicos/servico_5.svg';
import Servico6 from '../../../assets/icons/servicos/servico_6.svg';
import CartaoHome from '../cartaoHome';

function Servicos({ navigation }) {
  const netInfo = useNetInfo();

  const listaServicos = [
    {
      id: 'services-qualiquiz',
      titulo: 'QualiQuiz',
      ativo: true,
      icone: QualiQuizIcon,
      navegacao: {
        net: true,
        componente: 'QUALIQUIZ'
      }
    },
    {
      id: 'services-1',
      titulo: 'IntegraSUS',
      ativo: true,
      icone: Servico1,
      navegacao: {
        net: true,
        componente: 'webview',
        titulo: 'IntegraSUS',
        url: 'https://integrasus.saude.ce.gov.br'
      }
    },
    {
      id: 'services-2',
      titulo: 'SUS no Ceará',
      ativo: true,
      icone: Servico2,
      navegacao: {
        componente: 'SUS_NO_CEARA'
      }
    },
    {
      id: 'services-3',
      titulo: 'Fale Conosco',
      ativo: true,
      icone: Servico3,
      navegacao: {
        componente: 'FEEDBACK'
      }
    },
    {
      id: 'services-4',
      titulo: 'Ações do governo',
      ativo: true,
      icone: Servico4,
      navegacao: {
        net: true,
        componente: 'webview',
        titulo: 'Ações do governo',
        url: 'https://coronavirus.ceara.gov.br/isus/governo/'
      }
    },
    {
      id: 'services-5',
      titulo: 'ESP',
      icone: Servico5,
      ativo: true,
      navegacao: {
        net: true,
        componente: 'webview',
        titulo: 'ESP',
        url: 'https://www.esp.ce.gov.br/'
      }
    },
    {
      id: 'services-6',
      titulo: 'ESP Virtual',
      ativo: true,
      icone: Servico6,
      navegacao: {
        net: true,
        componente: 'browser',
        titulo: 'ESP Virtual',
        url: 'http://espvirtual.esp.ce.gov.br/'
      }
    }
  ];

  const onPress = (item) => {
    if (item.navegacao.net && !netInfo.isConnected) {
      navigation.navigate('SemConexao');
      return;
    }

    if (item.navegacao.componente === 'browser') {
      Linking.openURL(item.navegacao.url);
      return;
    }

    navigation.navigate(item.navegacao.componente, {
      title: item.navegacao.titulo,
      url: item.navegacao.url
    });
  };

  return (
    <>
      <Title style={estilos.titulo}>Serviços</Title>

      <FlatList
        horizontal
        data={listaServicos}
        keyExtractor={(item, index) => `${index}`}
        style={{
          flexDirection: 'row',
          alignSelf: 'center'
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CartaoHome
            key={item.id}
            ativo={item.ativo}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => onPress(item)}
          />
        )}
      />
    </>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    marginHorizontal: 16,
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.6)'
  }
});

export default Servicos;
