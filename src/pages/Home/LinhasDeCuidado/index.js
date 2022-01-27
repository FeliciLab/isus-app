import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import ManejoClinico from '~/assets/icons/linhasDeCuidado/manejoClinico.svg';
import MaternoInfantil from '~/assets/icons/linhasDeCuidado/maternoInfantil.svg';
import Protocolos from '~/assets/icons/linhasDeCuidado/protocolos.svg';
import Carrossel from '~/components/Carrossel';
import rotas from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import CartaoHome from '../cartaoHome';
import { Titulo } from '../styles';

export default function LinhasDeCuidado({ navigation }) {
  const { analyticsData } = useAnalytics();

  const netInfo = useNetInfo();

  const listaLinhasDeCuidado = [
    {
      id: 'manejoCovid',
      titulo: 'Manejo Covid-19',
      ativo: true,
      icone: ManejoClinico,
      labelDoAnalytics: 'manejo_covid',
      navegacao: {
        componente: 'webview',
        titulo: 'Manejo Clínico',
        url: 'https://coronavirus.ceara.gov.br/profissional/manejoclinico/',
      },
    },
    {
      id: 'maternoInfantil',
      titulo: 'Materno-Infantil',
      ativo: true,
      icone: MaternoInfantil,
      labelDoAnalytics: 'materno_infantil',
      navegacao: {
        componente: rotas.MATERNO_INFANTIL,
      },
    },
    {
      id: 'protocolos',
      titulo: 'Protocolos',
      ativo: true,
      icone: Protocolos,
      labelDoAnalytics: 'protocolos',
      navegacao: {
        componente: 'webview',
        titulo: 'Protocolos',
        url: 'https://coronavirus.ceara.gov.br/isus/protocolos/',
      },
    },
  ];

  return (
    <>
      <Titulo>Linhas de Cuidado e Protocolos</Titulo>
      <Carrossel
        dados={listaLinhasDeCuidado}
        aoRenderizarItem={({ item }) => (
          <CartaoHome
            ativo={item.ativo}
            testID={`cartaoHome-linhasDeCuidado-${item.id}`}
            key={item.id}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => {
              analyticsData(item.labelDoAnalytics, 'Click', 'Home');
              if (netInfo.isConnected) {
                return navigation.navigate(item.navegacao.componente, {
                  title: item.navegacao.titulo,
                  url: item.navegacao.url,
                  expanded: true,
                });
              }
              return navigation.navigate(rotas.SEM_CONEXAO, {
                componente: item.navegacao.componente,
                title: item.navegacao.titulo,
                url: item.navegacao.url,
                expanded: true,
              });
            }}
          />
        )}
      />
    </>
  );
}
