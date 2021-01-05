import * as React from 'react';
import {
  createDrawerNavigator
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Dimensions
} from 'react-native';
import { CORES } from '../constantes/estiloBase';
import AboutScreen from '../pages/About';
import Login from '../pages/Login';
import PerfilScreen from '../pages/Perfil/index';
import TermoDeUsoScreen from '../pages/Perfil/TermosDeUso/index';
import AppTab from './appBottomTab.routes';
import ConteudoDrawer from '../components/ConteudoDrawer';
import FaleConoscoScreen from '../pages/FaleConoscoScreen';
import SusNoCearaScreen from '../pages/SusNoCeara';
import ExcluirPerfil from '../pages/Perfil/excluirPerfil';
import ContaExcluida from '../pages/Perfil/contaExcluida';
import Denunciar from '../pages/Denunciar';
import QualiQuizScreen from '../pages/QualiQuiz';
import LoginQualiQuizScreen from '../pages/QualiQuiz/Login/LoginQualiQuiz';

import { ALERTA_FALTA_EPI, RELATAR_SUGESTAO } from '../pages/FaleConoscoScreen/tiposDeOcorrencia';
import rotas from '../constantes/rotas';

const Drawer = createDrawerNavigator();
export default function appDrawerScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="SERVICE"
      drawerPosition="left"
      drawerStyle={{
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width / 1.5
      }}
      drawerContent={props => (
        <ConteudoDrawer {...props} routeName={props.state.routeNames[props.state.index]} />
      )}
    >
      <Drawer.Screen name="HOME" component={AppTab} />
      <Drawer.Screen name="LOGIN" component={LoginStackScreen} />
      <Drawer.Screen name="PERFIL" component={PerfilStackScreen} />
      <Drawer.Screen name="TERMOS_DE_USO" component={TermosDeUsoStackScreen} />
      <Drawer.Screen name="FEEDBACK" component={FeedbackStackScreen} />
      <Drawer.Screen name="ALERTA_EPI" component={AlertaEpiStackScreen} />
      <Drawer.Screen name="SUS_NO_CEARA" component={SusNoCearaStackScreen} />
      <Drawer.Screen name="SOBRE" component={AboutStackScreen} />
      <Drawer.Screen name="EXCLUIR_PERFIL" component={DeleteProfileScreen} />
      <Drawer.Screen name="CONTA_EXCLUIDA" component={DeleteAccountScreen} />
      <Drawer.Screen name="DENUNCIAR" component={DenunciarAccountScreen} />
      <Drawer.Screen name="QUALIQUIZ" component={QualiQuizStackScreen} />
      <Drawer.Screen name="QUALIQUIZ_LOGIN" component={QualiQuizLoginStackScreen} />
    </Drawer.Navigator>
  );
}

const DenunciarAccountStack = createStackNavigator();
function DenunciarAccountScreen() {
  return (
    <DenunciarAccountStack.Navigator>
      <DenunciarAccountStack.Screen name="DENUNCIAR" component={Denunciar} options={{ headerShown: true }} />
    </DenunciarAccountStack.Navigator>
  );
}

const DeleteAccountStack = createStackNavigator();
function DeleteAccountScreen() {
  return (
    <DeleteAccountStack.Navigator>
      <DeleteAccountStack.Screen name="CONTA_EXCLUIDA" component={ContaExcluida} options={{ headerShown: true }} />
    </DeleteAccountStack.Navigator>
  );
}

const DeleteProfileStack = createStackNavigator();
function DeleteProfileScreen() {
  return (
    <DeleteProfileStack.Navigator>
      <DeleteProfileStack.Screen name="EXCLUIR_PERFIL" component={ExcluirPerfil} options={{ headerShown: true }} />
    </DeleteProfileStack.Navigator>
  );
}
const AboutStack = createStackNavigator();
function AboutStackScreen() {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen name="SOBRE" component={AboutScreen} options={{ headerShown: true }} />
    </AboutStack.Navigator>
  );
}

const LoginStack = createStackNavigator();
function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="ID SAÚDE" component={Login} initialParams={{ possuiIDSaude: false }} options={{ headerShown: true }} />
      <LoginStack.Screen name="LOGIN" component={Login} initialParams={{ possuiIDSaude: true }} options={{ headerShown: true }} />
    </LoginStack.Navigator>
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
      <TermosDeUsoStack.Screen name="TERMOS_DE_USO" component={TermoDeUsoScreen} options={{ headerShown: true }} />
    </TermosDeUsoStack.Navigator>
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

const AlertaEpiStack = createStackNavigator();
function AlertaEpiStackScreen() {
  return (
    <AlertaEpiStack.Navigator>
      <AlertaEpiStack.Screen
        name="ALERTA_EPI"
        component={FaleConoscoScreen}
        options={{ headerShown: true }}
        initialParams={{ ocorrencia: ALERTA_FALTA_EPI }}
      />
    </AlertaEpiStack.Navigator>
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

const QualiQuizStack = createStackNavigator();
function QualiQuizStackScreen() {
  return (
    <QualiQuizStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: CORES.BRANCO }
      }}
    >
      <QualiQuizStack.Screen
        name="QUALIQUIZ"
        component={QualiQuizScreen}
        options={{ headerShown: true }}
      />
    </QualiQuizStack.Navigator>
  );
}
const QualiQuizLoginStack = createStackNavigator();
function QualiQuizLoginStackScreen() {
  return (
    <QualiQuizLoginStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: CORES.BRANCO }
      }}
    >
      <QualiQuizStack.Screen
        name="QUALIQUIZ_LOGIN"
        component={LoginQualiQuizScreen}
        options={{ headerShown: true }}
      />
    </QualiQuizLoginStack.Navigator>
  );
}
