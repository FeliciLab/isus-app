import React from 'react';
import {
  Share
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ItemDrawer from './itemDrawer';
import { analyticsData } from '../../utils/analytics';
import packageJson from '../../../package.json';
import {
  ItensInferior, ConteudoVersao, TextoVersao
} from './styles';
import { CORES } from '../../constantes/estiloBase';
import testIDs from '../../constantes/testIDs';
import rotas from '../../constantes/rotas';


const itemInferior = () => {
  const navigationTermos = useNavigation();
  const versaoSistema = packageJson.version;

  const conteudoItem = [
    {
      icone: <Icon name="information" size={22} color={CORES.PRETO54} />,
      nome: 'Sobre o iSUS',
      testID: testIDs.DRAWER.ITEM_SOBRE_O_ISUS,
      labelDoAnalytics: 'sobre_o_isus',
      aoPressionar: () => navigationTermos.navigate(rotas.SOBRE_O_ISUS)
    },
    {
      icone: <Icon name="clipboard-text" size={22} color={CORES.PRETO54} />,
      nome: 'Termos de Uso',
      testID: testIDs.DRAWER.ITEM_TERMOS_DE_USO,
      labelDoAnalytics: 'termos_de_uso',
      aoPressionar: () => navigationTermos.navigate(rotas.TERMOS_DE_USO)
    },
    {
      icone: <Icon name="share-variant" size={22} color={CORES.PRETO54} />,
      nome: 'Compartilhar',
      testID: testIDs.DRAWER.ITEM_COMPARTILHE_O_ISUS,
      labelDoAnalytics: 'compartilhe_o_isus',
      aoPressionar: () => aoCompartilhar()
    }
  ];

  const aoCompartilhar = async () => {
    const messagLink = 'Conhece o app iSUS? Um produto digital do governo do Ceará de apoio a profissionais de saúde, com informações, serviços e oportunidades na palma da mão! Saiba mais: https://coronavirus.ceara.gov.br/isus/';
    try {
      await Share.share({
        message: messagLink
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <ItensInferior>
        {
          conteudoItem.map(({
            icone, nome, testID, labelDoAnalytics, aoPressionar
          }) => (
            <ItemDrawer
              key={nome}
              testID={testID}
              icone={icone}
              nome={nome}
              onPress={() => {
                analyticsData(labelDoAnalytics, 'click', 'Home');
                aoPressionar();
              }}
            />
          ))
        }
      </ItensInferior>
      <ConteudoVersao>
        <TextoVersao>
          Versão
          {' '}
          {versaoSistema}
        </TextoVersao>
      </ConteudoVersao>
    </>
  );
};

export default itemInferior;
