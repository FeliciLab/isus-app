import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Dimensions } from 'react-native';
import ConteudoDrawer from '~/components/ConteudoDrawer';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import AboutScreen from '~/pages/About';
import Denunciar from '~/pages/Denunciar';
import FaleConoscoScreen from '~/pages/FaleConoscoScreen';
import {
  DUVIDAS_ELMO,
  RELATAR_SUGESTAO,
} from '~/pages/FaleConoscoScreen/tiposDeOcorrencia';
import PerfilScreen from '~/pages/Perfil';
import ContaExcluida from '~/pages/Perfil/contaExcluida';
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
      <Drawer.Screen name={rotas.PERFIL} component={PerfilStackScreen} />
      <Drawer.Screen
        name={rotas.TERMOS_DE_USO}
        component={TermosDeUsoStackScreen}
      />
      <Drawer.Screen
        name={rotas.POLITICA_DE_PRIVACIDADE}
        component={PoliticaDePrivacidadeStackScreen}
      />
      <Drawer.Screen
        name={rotas.FALE_CONOSCO}
        component={FeedbackStackScreen}
      />
      <Drawer.Screen
        name={rotas.DUVIDAS_ELMO}
        component={DuvidasElmoStackScreen}
      />
      <Drawer.Screen
        name={rotas.SUS_NO_CEARA}
        component={SusNoCearaStackScreen}
      />
      <Drawer.Screen name={rotas.SOBRE} component={AboutStackScreen} />
      <Drawer.Screen
        name={rotas.EXCLUIR_PERFIL}
        component={DeleteProfileScreen}
      />
      <Drawer.Screen
        name={rotas.CONTA_EXCLUIDA}
        component={DeleteAccountScreen}
      />
      <Drawer.Screen
        name={rotas.DENUNCIAR}
        component={DenunciarAccountScreen}
      />
    </Drawer.Navigator>
  );
}

const DenunciarAccountStack = createStackNavigator();
function DenunciarAccountScreen() {
  return (
    <DenunciarAccountStack.Navigator>
      <DenunciarAccountStack.Screen
        name="DENUNCIAR"
        component={Denunciar}
        options={{ headerShown: true }}
      />
    </DenunciarAccountStack.Navigator>
  );
}

const DeleteAccountStack = createStackNavigator();
function DeleteAccountScreen() {
  return (
    <DeleteAccountStack.Navigator>
      <DeleteAccountStack.Screen
        name="CONTA_EXCLUIDA"
        component={ContaExcluida}
        options={{ headerShown: true }}
      />
    </DeleteAccountStack.Navigator>
  );
}

const DeleteProfileStack = createStackNavigator();
function DeleteProfileScreen() {
  return (
    <DeleteProfileStack.Navigator>
      <DeleteProfileStack.Screen
        name="EXCLUIR_PERFIL"
        component={ExcluirPerfil}
        options={{ headerShown: true }}
      />
    </DeleteProfileStack.Navigator>
  );
}
const AboutStack = createStackNavigator();

function AboutStackScreen() {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen
        name="SOBRE"
        component={AboutScreen}
        options={{ headerShown: true }}
      />
    </AboutStack.Navigator>
  );
}

const PerfilStack = createStackNavigator();

function PerfilStackScreen() {
  return (
    <PerfilStack.Navigator>
      <PerfilStack.Screen
        name={rotas.PERFIL}
        component={PerfilScreen}
        options={{ headerShown: true }}
      />
    </PerfilStack.Navigator>
  );
}

const TermosDeUsoStack = createStackNavigator();

function TermosDeUsoStackScreen() {
  return (
    <TermosDeUsoStack.Navigator>
      <TermosDeUsoStack.Screen
        name="TERMOS_DE_USO"
        component={TermoDeUsoScreen}
        options={{ headerShown: true }}
      />
    </TermosDeUsoStack.Navigator>
  );
}

const PoliticaDePrivacidadeStack = createStackNavigator();

function PoliticaDePrivacidadeStackScreen() {
  return (
    <PoliticaDePrivacidadeStack.Navigator>
      <PoliticaDePrivacidadeStack.Screen
        name="POLITICA_DE_PRIVACIDADE"
        component={PoliticaDePrivacidadeScreen}
        options={{ headerShown: true }}
      />
    </PoliticaDePrivacidadeStack.Navigator>
  );
}

const FeedbackStack = createStackNavigator();

function FeedbackStackScreen() {
  return (
    <FeedbackStack.Navigator>
      <FeedbackStack.Screen
        name="FEEDBACK"
        component={FaleConoscoScreen}
        options={{ headerShown: true }}
        initialParams={{ ocorrencia: RELATAR_SUGESTAO }}
      />
    </FeedbackStack.Navigator>
  );
}

const DuvidasElmoStack = createStackNavigator();

function DuvidasElmoStackScreen() {
  return (
    <DuvidasElmoStack.Navigator>
      <DuvidasElmoStack.Screen
        name={rotas.DUVIDAS_ELMO}
        component={FaleConoscoScreen}
        options={{ headerShown: true }}
        initialParams={{ ocorrencia: DUVIDAS_ELMO }}
      />
    </DuvidasElmoStack.Navigator>
  );
}

const SusNoCearaStack = createStackNavigator();

function SusNoCearaStackScreen() {
  return (
    <SusNoCearaStack.Navigator>
      <SusNoCearaStack.Screen
        name="SUS_NO_CEARA"
        component={SusNoCearaScreen}
        options={{ headerShown: true }}
      />
    </SusNoCearaStack.Navigator>
  );
}
