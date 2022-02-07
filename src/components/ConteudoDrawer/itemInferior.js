import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import testIDs from '~/constantes/testIDs';
import useAnalytics from '~/hooks/useAnalytics';
import useAutenticacao from '~/hooks/useAutenticacao';
import useLogoutApplication from '~/hooks/useLogoutApplication';
import packageJson from '../../../package.json';
import aoCompartilhar from './aoCompartilhar';
import ItemDrawer from './itemDrawer';
import { ConteudoVersao, ItensInferior, TextoVersao } from './styles';

const itemInferior = () => {
  const navigationTermos = useNavigation();

  const { analyticsData } = useAnalytics();

  const versaoSistema = packageJson.version;

  const { abrirCaixaDialogoSair } = useLogoutApplication();

  const { user } = useAutenticacao();

  const conteudoItem = [
    {
      icone: (
        <Icon
          testID="icon-drawer-information"
          name="information"
          size={22}
          color={CORES.PRETO54}
        />
      ),
      nome: 'Sobre o iSUS',
      testID: testIDs.DRAWER.ITEM_SOBRE_O_ISUS,
      labelDoAnalytics: 'sobre_o_isus',
      aoPressionar: () => navigationTermos.navigate(rotas.SOBRE_O_ISUS),
    },
    {
      icone: (
        <Icon
          testID="icon-drawer-clipboard-text"
          name="clipboard-text"
          size={22}
          color={CORES.PRETO54}
        />
      ),
      nome: 'Termos de Uso',
      testID: testIDs.DRAWER.ITEM_TERMOS_DE_USO,
      labelDoAnalytics: 'termos_de_uso',
      aoPressionar: () => navigationTermos.navigate(rotas.TERMOS_DE_USO),
    },
    {
      icone: (
        <Icon
          testID="icon-drawer-lock"
          name="lock"
          size={22}
          color={CORES.PRETO54}
        />
      ),
      nome: 'Política de Privacidade',
      testID: testIDs.DRAWER.ITEM_POLITA_DE_PRIVACIDADE,
      labelDoAnalytics: 'Politica_de_Privacidade',
      aoPressionar: () =>
        navigationTermos.navigate(rotas.POLITICA_DE_PRIVACIDADE),
    },
    {
      icone: (
        <Icon
          testID="icon-drawer-share-variant"
          name="share-variant"
          size={22}
          color={CORES.PRETO54}
        />
      ),
      nome: 'Compartilhar',
      testID: testIDs.DRAWER.ITEM_COMPARTILHE_O_ISUS,
      labelDoAnalytics: 'compartilhe_o_isus',
      aoPressionar: () => aoCompartilhar(),
    },
    ...(user
      ? [
        {
          icone: (
            <Icon
              testID="icon-drawer-exit-to-app"
              name="exit-to-app"
              size={22}
              color={CORES.PRETO54}
            />
          ),
          nome: 'Sair',
          testID: testIDs.DRAWER.ITEM_SAIR,
          labelDoAnalytics: 'sair',
          aoPressionar: () => abrirCaixaDialogoSair(),
        },
      ]
      : []),
  ];

  return (
    <>
      <ItensInferior>
        {conteudoItem.map(
          ({ icone, nome, testID, labelDoAnalytics, aoPressionar }) => (
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
          ),
        )}
      </ItensInferior>
      <ConteudoVersao>
        <TextoVersao>Versão {versaoSistema}</TextoVersao>
      </ConteudoVersao>
    </>
  );
};

export default itemInferior;
