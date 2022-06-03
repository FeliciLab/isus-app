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
import PerfilScreen from '~/pages/Perfil';
import ContaExcluida from '~/pages/Perfil/ContaExcluida';
import ExcluirPerfil from '~/pages/Perfil/ExcluirPerfil';
import PoliticaDePrivacidadeScreen from '~/pages/Perfil/PoliticaDePrivacidade';
import TermoDeUsoScreen from '~/pages/Perfil/TermosDeUso';
import SusNoCearaScreen from '~/pages/SusNoCeara';
import AppTab from './appBottomTab.routes';
import LoginStackScreen from './login.routes';

const Drawer = createDrawerNavigator();

export default function AppDrawerScreen() {
  return (
    <Drawer.Navigator
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
      <Drawer.Screen name={rotas.HOME} component={AppTab} />
      <Drawer.Screen name={rotas.LOGIN} component={LoginStackScreen} />
      <Drawer.Screen
        name={rotas.PERFIL}
        component={PerfilScreen}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name={rotas.TERMOS_DE_USO}
        component={TermoDeUsoScreen}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name={rotas.POLITICA_DE_PRIVACIDADE}
        component={PoliticaDePrivacidadeScreen}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name={rotas.FALE_CONOSCO}
        component={FaleConosco}
        options={{ headerShown: true }}
        initialParams={{ ocorrencia: RELATAR_SUGESTAO }}
      />
      <Drawer.Screen
        name={rotas.DUVIDAS_ELMO}
        component={FaleConosco}
        options={{ headerShown: true }}
        initialParams={{ ocorrencia: DUVIDAS_ELMO }}
      />
      <Drawer.Screen
        name={rotas.SUS_NO_CEARA}
        component={SusNoCearaScreen}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name={rotas.SOBRE}
        component={AboutScreen}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name={rotas.EXCLUIR_PERFIL}
        component={ExcluirPerfil}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name={rotas.CONTA_EXCLUIDA}
        component={ContaExcluida}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name={rotas.DENUNCIAR}
        component={Denunciar}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
}
