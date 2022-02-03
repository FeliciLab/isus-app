import { useNetInfo } from '@react-native-community/netinfo';
import { uniqueId } from 'lodash';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import ListServices from '~/components/ListServices';
import ServiceButton from '~/components/ServiceButton/index';
import rotas from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import { Titulo } from '../styles';
import listaForcaTarefaAntiCorona from './listaForcaTarefaAntiCorona';

const ForcaTarefa = ({ navigation }) => {
  const { analyticsData } = useAnalytics();

  const { isConnected } = useNetInfo();

  const handleOnPressServiceButton = useCallback(
    item => {
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
    },
    [isConnected, analyticsData],
  );

  return (
    <View>
      <Titulo>Enfrentamento às Pandemias e Epidemias</Titulo>
      <ListServices
        dados={listaForcaTarefaAntiCorona}
        renderItem={({ item }) => (
          <ServiceButton
            testID={`cartaoHome-forcaTarefa-${item.id}`}
            key={uniqueId()}
            ativo={item.ativo}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => handleOnPressServiceButton(item)}
          />
        )}
      />
    </View>
  );
};

export default ForcaTarefa;
