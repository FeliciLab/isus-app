import { useNetInfo } from '@react-native-community/netinfo';
import { uniqueId } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import Carrossel from '~/components/Carrossel';
import rotas from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import CartaoHome from '../CartaoHome';
import { Titulo } from '../styles';
import listaForcaTarefaAntiCorona from './listaForcaTarefaAntiCorona';

function ForcaTarefa({ navigation }) {
  const { analyticsData } = useAnalytics();

  const { isConnected } = useNetInfo();

  return (
    <View>
      <Titulo>Enfrentamento às Pandemias e Epidemias</Titulo>
      <Carrossel
        dados={listaForcaTarefaAntiCorona}
        aoRenderizarItem={({ item }) => (
          <CartaoHome
            testID={`cartaoHome-forcaTarefa-${item.id}`}
            key={uniqueId()}
            ativo={item.ativo}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => {
              const { navegacao } = item;
              analyticsData(item.labelDoAnalytics, 'Click', 'Home');
              if (navegacao.url && isConnected) {
                return navigation.navigate(navegacao.componente, {
                  title: navegacao.titulo,
                  url: navegacao.url,
                });
              }
              if (!navegacao.url) {
                return navigation.navigate(navegacao.componente, {
                  title: navegacao.titulo,
                });
              }

              return navigation.navigate(rotas.SEM_CONEXAO, {
                componente: navegacao.componente,
                title: navegacao.titulo,
                url: navegacao.url,
              });
            }}
          />
        )}
      />
    </View>
  );
}

export default ForcaTarefa;
