import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { uniqueId } from 'lodash';
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Heart from '~/assets/icons/isus_hor.svg';
import rotas from '~/constantes/rotas';
import testIDs from '~/constantes/testIDs';
import { AutenticacaoContext } from '~/context/AutenticacaoContext';
import useAnalytics from '~/hooks/useAnalytics';
import {
  pegarEstadoLogadoArmazenado,
  pegarTokenDoUsuarioNoStorage,
} from '~/services/autenticacao';
import ItemDrawer from './itemDrawer';
import { CORES } from '~/constantes/estiloBase';
import ItemInferior from './itemInferior';
import { DroidSafeArea } from './styles';

function conteudoDoDrawer(props) {
  const {
    estaLogado,
    tokenUsuario,
    alterarTokenUsuario,
    alterarEstaLogado,
  } = useContext(AutenticacaoContext);

  const { analyticsData } = useAnalytics();
  const { navigate } = useNavigation();
  const { routeName } = props;

  useEffect(() => {
    Promise.all([
      pegarTokenDoUsuarioNoStorage().then(token => alterarTokenUsuario(token)),
      pegarEstadoLogadoArmazenado().then(estado => alterarEstaLogado(estado)),
    ]);
  }, [alterarTokenUsuario, alterarEstaLogado]);

  const ItensDoDrawer = [
    {
      testID: testIDs.DRAWER.ITEM_HOME,
      nome: 'Home',
      icone: (
        <Icon
          testID="icon-drawer-home"
          name="home"
          size={22}
          color={CORES.PRETO54}
        />
      ),
      labelDoAnalytics: 'home',
      rota: rotas.HOME_SCREEN_HOME,
    },
    {
      testID: testIDs.DRAWER.ITEM_PERFIL,
      nome: 'Meu perfil',
      icone: (
        <Icon
          testID="icon-drawer-account"
          name="account"
          size={22}
          color={CORES.PRETO54}
        />
      ),
      labelDoAnalytics: 'meu_perfil',
      rota: tokenUsuario && estaLogado ? rotas.PERFIL : rotas.LOGIN,
    },
    {
      testID: testIDs.DRAWER.ITEM_FALECONOSCO,
      nome: 'Fale conosco',
      icone: (
        <MaterialIcon
          testID="icon-drawer-feedback"
          name="feedback"
          size={22}
          color={CORES.PRETO54}
        />
      ),
      labelDoAnalytics: 'fale_conosco',
      rota: rotas.FALE_CONOSCO,
    },
    {
      testID: testIDs.DRAWER.ITEM_SUSNOCEARA,
      nome: 'SUS no Ceará',
      icone: (
        <Icon
          testID="icon-drawer-susnoceara"
          name="help-circle"
          size={22}
          color={CORES.PRETO54}
        />
      ),
      labelDoAnalytics: 'sus_no_ceara',
      rota: rotas.SUS_NO_CEARA,
    },
  ];

  const RenderizaItensDoDrawer = () =>
    ItensDoDrawer.map(({ testID, nome, icone, rota, labelDoAnalytics }) => (
      <ItemDrawer
        key={uniqueId(nome)}
        testID={testID}
        nome={nome}
        icone={icone}
        isFocado={routeName === rota}
        onPress={() => {
          analyticsData(labelDoAnalytics, 'click', 'Home');
          navigate(rota);
        }}
      />
    ));

  return (
    <>
      <DroidSafeArea>
        <View>
          <Heart testID="svg-heart" size={40} style={{ margin: 10 }} />
        </View>
        <View
          style={{
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
          <ScrollView {...props}>{RenderizaItensDoDrawer()}</ScrollView>
          <ItemInferior />
        </View>
      </DroidSafeArea>
    </>
  );
}

export default conteudoDoDrawer;
