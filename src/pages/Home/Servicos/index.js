import React from 'react';
import { Title } from 'react-native-paper';
import { FlatList, StyleSheet, Linking } from 'react-native';
import Servico1 from '../../../assets/icons/servicos/servico_1.svg';
import Servico2 from '../../../assets/icons/servicos/servico_2.svg';
import Servico3 from '../../../assets/icons/servicos/servico_3.svg';
import Servico4 from '../../../assets/icons/servicos/servico_4.svg';
import Servico5 from '../../../assets/icons/servicos/servico_5.svg';
import Servico6 from '../../../assets/icons/servicos/servico_6.svg';
import CartaoHome from '../cartaoHome';
import { analyticsData } from '../../../utils/analytics';

function Servicos({ navigation }) {
  const listaServicos = [
    {
      id: 'Integra_SUS',
      titulo: 'IntegraSUS',
      ativo: true,
      icone: Servico1,
      navegacao: {
        componente: 'webview',
        titulo: 'IntegraSUS',
        url: 'https://integrasus.saude.ce.gov.br'
      }
    },
    {
      id: 'SUS_no_Ceara',
      titulo: 'SUS no Ceará',
      ativo: true,
      icone: Servico2,
      navegacao: {
        componente: 'SUS_NO_CEARA'
      }
    },
    {
      id: 'Fale_Conosco',
      titulo: 'Fale Conosco',
      ativo: true,
      icone: Servico3,
      navegacao: {
        componente: 'FEEDBACK'
      }
    },
    {
      id: 'Acoes_do_governo',
      titulo: 'Ações do governo',
      ativo: true,
      icone: Servico4,
      navegacao: {
        componente: 'webview',
        titulo: 'Ações do governo',
        url: 'https://coronavirus.ceara.gov.br/isus/governo/'
      }
    },
    {
      id: 'ESP',
      titulo: 'ESP',
      icone: Servico5,
      ativo: true,
      navegacao: {
        componente: 'webview',
        titulo: 'ESP',
        url: 'https://www.esp.ce.gov.br/'
      }
    },
    {
      id: 'ESP_Virtual',
      titulo: 'ESP Virtual',
      ativo: true,
      icone: Servico6,
      navegacao: {
        componente: 'browser',
        titulo: 'ESP Virtual',
        url: 'http://espvirtual.esp.ce.gov.br/'
      }
    }
  ];

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
            testID={`cartaoHome-servicos-${item.id}`}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => {
              analyticsData(item.id, 'Click', 'Home');
              if (item.navegacao.componente !== 'browser') {
                navigation.navigate(item.navegacao.componente, {
                  title: item.navegacao.titulo,
                  url: item.navegacao.url
                });
              } else {
                Linking.openURL(item.navegacao.url);
              }
            }
            }
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
