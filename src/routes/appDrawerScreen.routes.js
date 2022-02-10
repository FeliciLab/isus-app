import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Dimensions } from 'react-native';
import ConteudoDrawer from '~/components/ConteudoDrawer';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import { FormProvider } from '~/context/FormContext';
import { SemConexaoProvider } from '~/context/SemConexaoContext';
import AboutScreen from '~/pages/About';
import Denunciar from '~/pages/Denunciar';
import FaleConoscoScreen from '~/pages/FaleConoscoScreen';
import {
  DUVIDAS_ELMO,
  RELATAR_SUGESTAO,
} from '~/pages/FaleConoscoScreen/tiposDeOcorrencia';
import Login from '~/pages/Login';
import FormLogin from '~/pages/Login/formulario';
import ContaExcluida from '~/pages/Perfil/contaExcluida';
import ExcluirPerfil from '~/pages/Perfil/excluirPerfil';
import PerfilScreen from '~/pages/Perfil/index';
import PoliticaDePrivacidadeScreen from '~/pages/Perfil/PoliticaDePrivacidade/index';
import TermoDeUsoScreen from '~/pages/Perfil/TermosDeUso/index';
import QualiQuizScreen from '~/pages/QualiQuiz';
import LoginQualiQuizScreen from '~/pages/QualiQuiz/Login/LoginQualiQuiz';
import SusNoCearaScreen from '~/pages/SusNoCeara';
import ResidenciaMedicaScreen from '~/pages/ResidenciaMedica';
import AppTab from './appBottomTab.routes';

const Drawer = createDrawerNavigator();

export default function appDrawerScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="SERVICE"
      drawerPosition="left"
      drawerStyle={{
        backgroundColor: '#fff',
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
      <Drawer.Screen name={rotas.FORM_LOGIN} component={FormLoginStackScreen} />
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
      {/* TODO: ccirar componente de tela do residencia medica */}
      <Drawer.Screen
        name={rotas.RESIDENCIA_MEDICA}
        component={ResidenciaMedicaStackScreen}
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
      <Drawer.Screen name={rotas.QUALIQUIZ} component={QualiQuizStackScreen} />
      <Drawer.Screen
        name={rotas.QUALIQUIZ_LOGIN}
        component={QualiQuizLoginStackScreen}
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

const LoginStack = createStackNavigator();
function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="ID SAÚDE"
        component={Login}
        initialParams={{ possuiIDSaude: false }}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="LOGIN"
        component={Login}
        initialParams={{ possuiIDSaude: true }}
        options={{ headerShown: true }}
      />
    </LoginStack.Navigator>
  );
}

const FormLoginStack = createStackNavigator();
function FormLoginStackScreen() {
  return (
    <FormProvider>
      <SemConexaoProvider>
        <FormLoginStack.Navigator>
          <FormLoginStack.Screen
            name="FORM_LOGIN"
            component={FormLogin}
            initialParams={{ possuiIDSaude: true }}
            options={{ headerShown: false }}
          />
        </FormLoginStack.Navigator>
      </SemConexaoProvider>
    </FormProvider>
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

const ResidenciaMedicaStack = createStackNavigator();
function ResidenciaMedicaStackScreen() {
  return (
    <ResidenciaMedicaStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: CORES.BRANCO },
      }}>
      <ResidenciaMedicaStack.Screen
        name={rotas.RESIDENCIA_MEDICA}
        component={ResidenciaMedicaScreen}
        options={{ headerShown: true }}
      />
    </ResidenciaMedicaStack.Navigator>
  );
}

const QualiQuizStack = createStackNavigator();
function QualiQuizStackScreen() {
  return (
    <QualiQuizStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: CORES.BRANCO },
      }}>
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
        cardStyle: { backgroundColor: CORES.BRANCO },
      }}>
      <QualiQuizStack.Screen
        name="QUALIQUIZ_LOGIN"
        component={LoginQualiQuizScreen}
        options={{ headerShown: true }}
      />
    </QualiQuizLoginStack.Navigator>
  );
}
