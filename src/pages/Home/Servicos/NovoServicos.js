import React from 'react';
import { Title } from 'react-native-paper';
import { FlatList, StyleSheet } from 'react-native';
import Servico1 from '../../../assets/icons/servicos/novo_servico_1.svg';
import Servico2 from '../../../assets/icons/servicos/novo_servico_2.svg';
import Servico3 from '../../../assets/icons/servicos/novo_servico_3.svg';
import Servico4 from '../../../assets/icons/servicos/novo_servico_4.svg';


import CartaoDeServico from './CartaoDeServico';

function Servicos({ navigation }) {
  const listaServicos = [
    {
      id: 'services-1',
      titulo: 'IntegraSUS',
      icone: Servico1,
      navegacao: {
        componente: 'webview',
        titulo: 'IntegraSUS',
        url: 'https://integrasus.saude.ce.gov.br'
      }
    },
    {
      id: 'services-2',
      titulo: 'SUS no Ceará',
      icone: Servico2,
      navegacao: {
        componente: 'SUS_NO_CEARA'
      }
    },
    {
      id: 'services-3',
      titulo: 'Fale Conosco',
      icone: Servico3,
      navegacao: {
        componente: 'FEEDBACK'
      }
    },
    {
      id: 'services-4',
      titulo: 'Ações do governo',
      icone: Servico4,
      navegacao: {
        componente: 'webview',
        titulo: 'Ações do governo',
        url: 'https://coronavirus.ceara.gov.br/isus/governo/'
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
          <CartaoDeServico
            key={item.id}
            titulo={item.titulo}
            Icone={item.icone}
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

const estilos = StyleSheet.create({
  titulo: { marginHorizontal: 16, fontSize: 20 }
});

export default Servicos;
