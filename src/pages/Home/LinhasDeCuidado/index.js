import { useNetInfo } from '@react-native-community/netinfo';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import ListServices from '~/components/ListServices';
import NewServiceButton from '~/components/NewServiceButton';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import { Titulo } from '../styles';
import listaLinhasDeCuidado from './listaLinhasDeCuidado';

const LinhasDeCuidado = ({ navigation }) => {
  const { analyticsData } = useAnalytics();

  const { isConnected } = useNetInfo();

  const iconBackgroundColor = CORES.ROXO;

  const handleOnPressServiceButton = useCallback(
    item => {
      analyticsData(item.labelDoAnalytics, 'Click', 'Home');

      if (isConnected) {
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
    },
    [analyticsData],
  );

  return (
    <View>
      <Titulo>Linhas de Cuidado e Protocolos</Titulo>
      <ListServices
        dados={listaLinhasDeCuidado.filter(item => item.ativo)}
        renderItem={({ item }) => (
          <NewServiceButton
            testID={`cartaoHome-linhasDeCuidado-${item.id}`}
            key={`cartaoHome-linhasDeCuidado-${item.id}`}
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

export default LinhasDeCuidado;
