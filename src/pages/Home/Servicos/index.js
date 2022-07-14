import { useNetInfo } from '@react-native-community/netinfo';
import React, { useCallback } from 'react';
import { Linking, View } from 'react-native';
import ListServices from '~/components/ListServices';
import NewServiceButton from '~/components/NewServiceButton';
import { CORES } from '~/constantes/estiloBase';
import ROTAS from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import { Titulo } from '../styles';
import listaServicos from './listaServicos';

function Servicos({ navigation }) {
  const { analyticsData } = useAnalytics();

  const { isConnected } = useNetInfo();

  const iconBackgroundColor = CORES.LARANJA;

  // Exclui componentes que possuem dados no próprio iSUS-APP
  const excludeComponents = [ROTAS.ELMO, ROTAS.RESIDENCIA_MEDICA];

  const handleOnPressServiceButton = useCallback(
    item => {
      analyticsData(item.id, 'Click', 'Home');

      if (
        item.navegacao.net &&
        !excludeComponents.includes(item.navegacao?.componente) &&
        !isConnected
      ) {
        navigation.navigate(ROTAS.SEM_CONEXAO, {
          componente: item.navegacao.componente,
          title: item.navegacao.titulo,
          url: item.navegacao.url,
        });
        return;
      }

      if (item.navegacao.componente === 'browser') {
        Linking.openURL(item.navegacao.url);
        return;
      }

      navigation.navigate(item.navegacao.componente, {
        title: item.navegacao.titulo,
        url: item.navegacao.url,
      });
    },
    [isConnected, analyticsData],
  );

  return (
    <View>
      <Titulo>Serviços SUS Ceará</Titulo>
      <ListServices
        dados={listaServicos.filter(item => item.ativo)}
        renderItem={({ item }) => (
          <NewServiceButton
            testID={`cartaoHome-servicos-${item.id}`}
            key={`cartaoHome-servicos-${item.id}`}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => handleOnPressServiceButton(item)}
            iconBackgroundColor={iconBackgroundColor}
          />
        )}
      />
    </View>
  );
}

export default Servicos;
