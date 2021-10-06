import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Carrossel from '../../../components/Carrossel';
import rotas from '../../../constantes/rotas';
import useAnalytics from '../../../hooks/Analytics';
import CartaoHome from '../cartaoHome';
import { Titulo } from '../styles';
import listaForcaTarefaAntiCorona from './listaForcaTarefaAntiCorona';

function ForcaTarefa() {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  const netInfo = useNetInfo();

  return (
    <>
      <Titulo>Força-tarefa Anticorona</Titulo>
      <Carrossel
        dados={listaForcaTarefaAntiCorona}
        aoRenderizarItem={({ item }) => (
          <CartaoHome
            testID={`cartaoHome-forcaTarefa-${item.id}`}
            key={item.id}
            ativo={item.ativo}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => {
              const { navegacao } = item;
              analyticsData(item.labelDoAnalytics, 'Click', 'Home');
              if (navegacao.url && netInfo.isConnected) {
                return navigation.navigate(navegacao.componente, {
                  title: navegacao.titulo,
                  url: navegacao.url
                });
              }
              if (!navegacao.url) {
                return navigation.navigate(navegacao.componente, {
                  title: navegacao.titulo
                });
              }

              return navigation.navigate(rotas.SEM_CONEXAO, {
                componente: navegacao.componente,
                title: navegacao.titulo,
                url: navegacao.url
              });
            }}
          />
        )}
      />
    </>
  );
}

export default ForcaTarefa;
