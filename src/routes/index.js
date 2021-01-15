/* eslint-disable max-len */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feature } from '@paralleldrive/react-feature-toggles';
import analytics from '@react-native-firebase/analytics';
import Description from '../pages/Content/Description';
import BemVindo from '../pages/BemVindo';
import AppDrawerScreen from './appDrawerScreen.routes';
import Buscar from '../pages/Buscar';
import BuscarDescription from '../pages/Buscar/Description';
import WebViewPage from '../pages/WebView';
import ManejoWebViewPage from '../pages/WebView/ManejoWebView';
import TelaDeCadastro from '../pages/Cadastro';
import EdicaoInfoProfissional from '../pages/Perfil/EdicaoInfoProfissional/index';
import EdicaoInfoPessoal from '../pages/Perfil/EdicaoInfoPessoal/index';
import NovoEdicaoInfoProfissional from '../pages/Perfil/EdicaoInfoProfissional/novoIndex';
import SemConexao from '../components/semConexao';
import MaternoInfantil from '../pages/Home/LinhasDeCuidado/maternoInfantil';
import { FormProvider } from '../context/FormContext';
import TelaDeSucesso from '../pages/TelaDeSucesso';
import MeusConteudos from '../pages/MeusConteudos';
import CadastroRoutes from './cadastro.routes';
import features from '../constantes/features';
import rotas from '../constantes/rotas';
import estaAtiva from '../utils/estaAtiva';
import Elmo from '../pages/Elmo';
import SobreElmo from '../pages/Elmo/sobreElmo';
import CapacitacaoElmo from '../pages/Elmo/capacitacaoElmo';
import NovidadesElmo from '../pages/Elmo/novidadesElmo';

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

function EdicaoPessoal(props) {
  return (
    <FormProvider>
      <EdicaoInfoPessoal {...props} />
    </FormProvider>
  );
}

function ElmoFunc(props) {
  return (
    <FormProvider>
      <Elmo {...props} />
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
  const routeNameRef = React.useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => { routeNameRef.current = navigationRef.current.getCurrentRoute().name; }}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
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
          name={rotas.SEM_CONEXAO}
          component={SemConexao}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name={rotas.MATERNO_INFANTIL}
          component={MaternoInfantil}
          options={{ headerShown: true }}
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
          name={rotas.EDICAO_PROFISSIONAL}
          component={EdicaoProfissional}
        />
        <RootStack.Screen
          name="BemVindo"
          component={BemVindo}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={rotas.EDICAO_INFO_PESSOAIS}
          component={EdicaoPessoal}
        />
        <RootStack.Screen
          name={rotas.ELMO}
          component={ElmoFunc}
        />
        <RootStack.Screen
          name={rotas.SOBRE_ELMO}
          component={SobreElmo}
        />
        <RootStack.Screen
          name={rotas.CAPACITACAO_ELMO}
          component={CapacitacaoElmo}
        />
        <RootStack.Screen
          name={rotas.NOVIDADES_ELMO}
          component={NovidadesElmo}
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
