/* eslint-disable max-len */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feature } from '@paralleldrive/react-feature-toggles';
import Description from '../pages/Content/Description';
import Welcome from '../pages/Welcome';
import AppDrawerScreen from './appDrawerScreen.routes';
import Buscar from '../pages/Buscar';
import ClinicalManagement from '../pages/ClinicalManagement';
import BuscarDescription from '../pages/Buscar/Description';
import WebViewPage from '../pages/WebView';
import ManejoWebViewPage from '../pages/WebView/ManejoWebView';
import TelaDeCadastro from '../pages/Cadastro';
import EdicaoInfoProfissional from '../pages/Perfil/EdicaoInfoProfissional/index';
import NovoEdicaoInfoProfissional from '../pages/Perfil/EdicaoInfoProfissional/novoIndex';
import SemConexao from '../components/semConexao';
import MaternoInfantil from '../pages/Home/LinhasDeCuidado/maternoInfantil';

import { FormProvider } from '../context/FormContext';
import TelaDeSucesso from '../pages/TelaDeSucesso';
import MeusConteudos from '../pages/MeusConteudos';
import CadastroRoutes from './cadastro.routes';
import features from '../constantes/features';
import constantes from '../constantes/rotas';
import estaAtiva from '../utils/estaAtiva';

const RootStack = createStackNavigator();

function EdicaoProfissional(props) {
  return (
    <FormProvider>
      <Feature
        name={features.EDICAO_DE_INFORMACOES_PROFISSIONAIS}
        activeComponent={() => <NovoEdicaoInfoProfissional {...props} />}
        inactiveComponent={() => <EdicaoInfoProfissional {...props} />}
      />

    </FormProvider>
  );
}

function Cadastro() {
  return (
    <Feature
      name="316"
      inactiveComponent={() => <TelaDeCadastro />}
      activeComponent={CadastroRoutes}
    />
  );
}

export default function App({ navigationRef }) {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        <RootStack.Screen
          name="App"
          component={AppDrawerScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="CADASTRO"
          options={{ headerShown: !estaAtiva(features.CRIAR_PERSISTENCIA_DE_DADOS_NO_CADASTRO) }}
          component={Cadastro}
        />
        <RootStack.Screen
          name="LOGIN_WELCOME"
          component={AppDrawerScreen}
          options={{ headerShown: false }}
          initialParams={{ possuiIDSaude: false }}
        />
        <RootStack.Screen
          name="Descrição"
          component={Description}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name="SemConexao"
          component={SemConexao}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name="MaternoInfantil"
          component={MaternoInfantil}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name={constantes.MANEJO_CLINICO}
          component={ClinicalManagement}
        />
        <RootStack.Screen name="webview" component={WebViewPage} />
        <RootStack.Screen name="manejoWebview" component={ManejoWebViewPage} />
        <RootStack.Screen
          name="Buscar"
          component={searchStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="TelaDeSucesso"
          component={TelaDeSucesso}
          initialParams={{
            textoApresentacao: 'Sucesso!',
            telaDeRedirecionamento: 'HOME'
          }}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="MeusConteudos"
          component={MeusConteudos}
          initialParams={{ conteudos: [] }}
        />
        <RootStack.Screen
          name="EdicaoDadosProfissionais"
          component={EdicaoProfissional}
        />
        <RootStack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const searchStack = createStackNavigator();
function searchStackScreen() {
  return (
    <searchStack.Navigator>
      <searchStack.Screen
        name="Buscar"
        component={Buscar}
        options={{ headerShown: true }}
      />
      <searchStack.Screen
        name="Buscar Description"
        component={BuscarDescription}
        options={{ headerShown: true }}
      />
    </searchStack.Navigator>
  );
}
