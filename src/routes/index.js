import { Feature } from '@paralleldrive/react-feature-toggles';
import analytics from '@react-native-firebase/analytics';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useRef } from 'react';
import SemConexao from '~/components/semConexao';
import features from '~/constantes/features';
import rotas from '~/constantes/rotas';
import { FormProvider } from '~/context/FormContext';
import BemVindo from '~/pages/BemVindo';
import Descricao from '~/pages/Content/Descricao';
import Description from '~/pages/Content/Description';
import Elmo from '~/pages/Elmo';
import CapacitacaoElmo from '~/pages/Elmo/CapacitacaoElmo';
import NovidadesElmo from '~/pages/Elmo/NovidadesElmo';
import SobreElmo from '~/pages/Elmo/SobreElmo';
import MaternoInfantil from '~/pages/Home/LinhasDeCuidado/maternoInfantil';
import MeusConteudos from '~/pages/MeusConteudos';
import EdicaoInfoPessoal from '~/pages/Perfil/EdicaoInfoPessoal';
import EdicaoInfoProfissional from '~/pages/Perfil/EdicaoInfoProfissional';
import QualiQuiz from '~/pages/QualiQuiz';
import LoginQualiQuiz from '~/pages/QualiQuiz/Login/LoginQualiQuiz';
import Residencias from '~/pages/Residencias';
import NovoSemConexao from '~/pages/SemConexao';
import TelaDeSucesso from '~/pages/TelaDeSucesso';
import WebViewPage from '~/pages/WebView';
import ManejoWebViewPage from '~/pages/WebView/ManejoWebView';
import AppDrawerScreen from './appDrawerScreen.routes';
import CadastroRoutes from './cadastro.routes';
import FrequenciasStackScreen from './frequencias.routes';
import LoginStackScreen from './login.routes';
import NotificationsStackScreen from './notifications.routes';
import PreCadastroRoutes from './preCadastro.routes';
import SearchStackScreen from './search.routes';

const RootStack = createStackNavigator();

// TODO: crirar atividade para remover FormProvider
const ElmoFunc = props => (
  <FormProvider>
    <Elmo {...props} />
  </FormProvider>
);

// TODO: remover depois esse Feature
const SemConexaoNovo = props => (
  <Feature
    name={features.TELA_SEM_CONEXAO}
    activeComponent={() => <NovoSemConexao {...props} />}
    inactiveComponent={() => <SemConexao {...props} />}
  />
);

export default function App({ navigationRef }) {
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
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
      }}>
      <RootStack.Navigator>
        <RootStack.Screen
          name="App"
          component={AppDrawerScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={rotas.LOGIN}
          component={LoginStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="CADASTRO"
          options={{
            headerShown: false,
          }}
          component={CadastroRoutes}
        />
        <RootStack.Screen
          name={rotas.PRE_CADASTRO}
          options={{ headerShown: false }}
          component={PreCadastroRoutes}
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
          name={rotas.DESCRICAO}
          component={Descricao}
          options={{ headerShown: true, title: 'Descrição' }}
        />
        <RootStack.Screen
          name={rotas.SEM_CONEXAO}
          component={SemConexaoNovo}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name={rotas.MATERNO_INFANTIL}
          component={MaternoInfantil}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name={rotas.SEARCH_STACK_SCREEN}
          component={SearchStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="TelaDeSucesso"
          component={TelaDeSucesso}
          initialParams={{
            textoApresentacao: 'Sucesso!',
            telaDeRedirecionamento: 'HOME',
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
          component={EdicaoInfoProfissional}
        />
        <RootStack.Screen
          name={rotas.BEM_VINDO}
          component={BemVindo}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={rotas.EDICAO_INFO_PESSOAIS}
          component={EdicaoInfoPessoal}
        />
        <RootStack.Screen name={rotas.ELMO} component={ElmoFunc} />
        <RootStack.Screen
          name={rotas.RESIDENCIA_MEDICA}
          component={Residencias}
        />
        <RootStack.Screen
          name={rotas.FREQUENCIAS}
          component={FrequenciasStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name={rotas.QUALIQUIZ} component={QualiQuiz} />
        <RootStack.Screen
          name={rotas.QUALIQUIZ_LOGIN}
          component={LoginQualiQuiz}
        />
        <RootStack.Screen name={rotas.SOBRE_ELMO} component={SobreElmo} />
        <RootStack.Screen
          name={rotas.CAPACITACAO_ELMO}
          component={CapacitacaoElmo}
        />
        <RootStack.Screen
          name={rotas.NOVIDADES_ELMO}
          component={NovidadesElmo}
        />
        <RootStack.Screen
          name={rotas.NOTIFICATIONS}
          component={NotificationsStackScreen}
          options={{ headerShown: false }}
        />
        {/* WebViews */}
        <RootStack.Screen name="webview" component={WebViewPage} />
        <RootStack.Screen name="manejoWebview" component={ManejoWebViewPage} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
