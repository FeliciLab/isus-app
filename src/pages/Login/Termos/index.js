import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ConteudoTermo, TextoTermo, TextoLink } from './styles';
import useAnalytics from '../../../hooks/Analytics';
import { TESTIDS } from '../../../constantes/testIDs';
import rotas from '../../../constantes/rotas';

const Termos = () => {
  const { analyticsData } = useAnalytics();
  const navigation = useNavigation();

  return (
    <ConteudoTermo>
      <TextoTermo>
        Ao continuar,
        você concorda com nossos
        {' '}
        <TextoLink
          testID={TESTIDS.HYPERLINK_TERMOS_USO}
          onPress={() => {
            analyticsData('termos_uso', 'Click', 'Perfil');
            navigation.navigate(rotas.TERMOS_DE_USO);
          }}
        >
          Termos de Uso
        </TextoLink>
        .
      </TextoTermo>
    </ConteudoTermo>
  );
};

export default Termos;
