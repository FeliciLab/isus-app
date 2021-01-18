import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import ManejoClinico from '../../../assets/icons/linhasDeCuidado/manejoClinico.svg';
import MaternoInfantil from '../../../assets/icons/linhasDeCuidado/maternoInfantil.svg';
import Protocolos from '../../../assets/icons/linhasDeCuidado/protocolos.svg';
import CartaoHome from '../cartaoHome';
import rotas from '../../../constantes/rotas';
import { Titulo } from '../styles';
import Carrossel from '../../../components/Carrossel';

export default function LinhasDeCuidado({ navigation }) {
  const netInfo = useNetInfo();

  const listaLinhasDeCuidado = [
    {
      id: 'manejoCovid',
      titulo: 'Manejo Covid-19',
      ativo: true,
      icone: ManejoClinico,
      navegacao: {
        componente: 'webview',
        titulo: 'Manejo Clínico',
        url: 'https://coronavirus.ceara.gov.br/profissional/manejoclinico/'
      }
    },
    {
      id: 'maternoInfantil',
      titulo: 'Materno-Infantil',
      ativo: true,
      icone: MaternoInfantil,
      navegacao: {
        componente: rotas.MATERNO_INFANTIL
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
            onPress={() => (netInfo.isConnected ? navigation.navigate(item.navegacao.componente, {
              title: item.navegacao.titulo,
              url: item.navegacao.url
            }) : navigation.navigate(rotas.SEM_CONEXAO))}
          />
        )}
      />
    </>
  );
}
