import { useNavigation } from '@react-navigation/native';
import React from 'react';
import rotas from '~/constantes/rotas';
import { TESTIDS } from '~/constantes/testIDs';
import useAnalytics from '~/hooks/useAnalytics';
import { ConteudoTermo, TextoLink, TextoTermo } from './styles';

const Termos = () => {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  return (
    <ConteudoTermo>
      <TextoTermo>
        Ao continuar, você concorda com nossos{' '}
        <TextoLink
          testID={TESTIDS.HYPERLINK_TERMOS_USO}
          onPress={() => {
            analyticsData('termos_uso', 'Click', 'Perfil');
            navigation.navigate(rotas.TERMOS_DE_USO);
          }}>
          Termos de Uso
        </TextoLink>{' '}
        e{' '}
        <TextoLink
          onPress={() => {
            analyticsData('politica_de_privacidade', 'Click', 'Perfil');
            navigation.navigate(rotas.POLITICA_DE_PRIVACIDADE);
          }}>
          Política de privacidade
        </TextoLink>
      </TextoTermo>
    </ConteudoTermo>
  );
};

export default Termos;
