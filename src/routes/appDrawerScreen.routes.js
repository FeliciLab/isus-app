import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Dimensions } from 'react-native';
import ConteudoDrawer from '~/components/ConteudoDrawer';
import { CORES } from '~/constantes/estiloBase';
import { DUVIDAS_ELMO, RELATAR_SUGESTAO } from '~/constantes/ocorrencias';
import rotas from '~/constantes/rotas';
import AboutScreen from '~/pages/About';
import Denunciar from '~/pages/Denunciar';
import FaleConosco from '~/pages/FaleConosco';
import ContaExcluida from '~/pages/Perfil/ContaExcluida';
import ExcluirPerfil from '~/pages/Perfil/ExcluirPerfil';
import Perfil from '~/pages/Perfil';
import PoliticaDePrivacidadeScreen from '~/pages/Perfil/PoliticaDePrivacidade';
import TermoDeUsoScreen from '~/pages/Perfil/TermosDeUso';
import SusNoCearaScreen from '~/pages/SusNoCeara';
import AppTab from './appBottomTab.routes';

const { Navigator, Screen } = createDrawerNavigator();

export default function AppDrawerScreen() {
  return (
    <Navigator
      initialRouteName="SERVICE"
      drawerPosition="left"
      drawerStyle={{
        backgroundColor: CORES.BRANCO,
        width: Dimensions.get('screen').width / 1.5,
      }}
      drawerContent={props => (
        <ConteudoDrawer
          {...props}
          routeName={props.state.routeNames[props.state.index]}
        />
      )}>
      <Screen
        name={rotas.HOME}
        component={AppTab}
        options={{ headerShown: false }}
      />
      <Screen
        name={rotas.PERFIL}
        component={Perfil}
        options={{ headerShown: true }}
      />
      <Screen
        name={rotas.TERMOS_DE_USO}
        component={TermoDeUsoScreen}
        options={{ headerShown: true }}
      />
      <Screen
        name={rotas.POLITICA_DE_PRIVACIDADE}
        component={PoliticaDePrivacidadeScreen}
        options={{ headerShown: true }}
      />
      <Screen
        name={rotas.FALE_CONOSCO}
        component={FaleConosco}
        options={{ headerShown: true }}
        initialParams={{ ocorrencia: RELATAR_SUGESTAO }}
      />
      <Screen
        name={rotas.DUVIDAS_ELMO}
        component={FaleConosco}
        options={{ headerShown: true }}
        initialParams={{ ocorrencia: DUVIDAS_ELMO }}
      />
      <Screen
        name={rotas.SUS_NO_CEARA}
        component={SusNoCearaScreen}
        options={{ headerShown: true }}
      />
      <Screen
        name={rotas.SOBRE}
        component={AboutScreen}
        options={{ headerShown: true }}
      />
      <Screen
        name={rotas.EXCLUIR_PERFIL}
        component={ExcluirPerfil}
        options={{ headerShown: true }}
      />
      <Screen
        name={rotas.CONTA_EXCLUIDA}
        component={ContaExcluida}
        options={{ headerShown: true }}
      />
      <Screen
        name={rotas.DENUNCIAR}
        component={Denunciar}
        options={{ headerShown: true }}
      />
    </Navigator>
  );
}
