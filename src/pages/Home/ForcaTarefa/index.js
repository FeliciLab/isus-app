
import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { Titulo } from '../styles';
import { analyticsData } from '../../../utils/analytics';
import listaForcaTarefaAntiCorona from './listaForcaTarefaAntiCorona';
import CartaoHome from '../cartaoHome';
import Carrossel from '../../../components/Carrossel';
import rotas from '../../../constantes/rotas';

function ForcaTarefa({ navigation }) {
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
                  title: navegacao.titulo,
                });
              }

              return navigation.navigate(rotas.SEM_CONEXAO);
            }}
          />
        )}
      />
    </>
  );
}

export default ForcaTarefa;
