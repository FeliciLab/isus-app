import { useNetInfo } from '@react-native-community/netinfo';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import ListServices from '~/components/ListServices';
import ServiceButton from '~/components/ServiceButton';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import { Titulo } from '../styles';
import listaForcaTarefa from './listaForcaTarefa';

const ForcaTarefa = ({ navigation }) => {
  const { analyticsData } = useAnalytics();

  const { isConnected } = useNetInfo();

  const iconBackgroundColor = CORES.VERDE;

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
        dados={listaForcaTarefa.filter(item => item.ativo)}
        renderItem={({ item }) => (
          <ServiceButton
            testID={`cartaoHome-forcaTarefa-${item.id}`}
            key={`cartaoHome-forcaTarefa-${item.id}`}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => handleOnPressServiceButton(item)}
            iconBackgroundColor={iconBackgroundColor}
          />
        )}
      />
    </View>
  );
};

export default ForcaTarefa;
