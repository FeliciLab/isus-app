import React from 'react';
import { FlatList } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import ManejoClinico from '../../../assets/icons/linhasDeCuidado/manejoClinico.svg';
import MaternoInfantil from '../../../assets/icons/linhasDeCuidado/maternoInfantil.svg';
import Protocolos from '../../../assets/icons/linhasDeCuidado/protocolos.svg';
import StyledTitulo from './styles';
import rotas from '../../../constantes/rotas';
import CartaoHome from '../cartaoHome';

export default function LinhasDeCuidado({ navigation }) {
  const netInfo = useNetInfo();

  const listaLinhasDeCuidado = [
    {
      id: 'manejoCovid',
      titulo: 'Manejo Covid-19',
      ativo: true,
      icone: ManejoClinico,
      navegacao: {
        componente: rotas.MANEJO_CLINICO
      }
    },
    {
      id: 'maternoInfantil',
      titulo: 'Materno-Infantil',
      ativo: true,
      icone: MaternoInfantil,
      navegacao: {
        componente: 'MaternoInfantil'
      }
    },
    {
      id: 'protocolos',
      titulo: 'Protocolos',
      ativo: true,
      icone: Protocolos,
      navegacao: {
        componente: 'webview',
        titulo: 'Protocolos',
        url: 'https://coronavirus.ceara.gov.br/isus/protocolos/'
      }
    }
  ];

  return (
    <>
      <StyledTitulo>Linhas de Cuidado e Protocolos</StyledTitulo>
      <FlatList
        horizontal
        data={listaLinhasDeCuidado}
        keyExtractor={(item, index) => `${index}`}
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start'
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CartaoHome
            ativo={item.ativo}
            testID={`cartaoHome-linhasDeCuidado-${item.id}`}
            key={item.id}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => (netInfo.isConnected ? navigation.navigate(item.navegacao.componente, {
              title: item.navegacao.titulo,
              url: item.navegacao.url
            }) : navigation.navigate('SemConexao'))}
          />
        )}
      />
    </>
  );
}
