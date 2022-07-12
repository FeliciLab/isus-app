import analytics from '@react-native-firebase/analytics';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useRef } from 'react';
import rotas from '~/constantes/rotas';
import BemVindo from '~/pages/BemVindo';
import Descricao from '~/pages/Content/Descricao';
import Elmo from '~/pages/Elmo';
import CapacitacaoElmo from '~/pages/Elmo/CapacitacaoElmo';
import NovidadesElmo from '~/pages/Elmo/NovidadesElmo';
import SobreElmo from '~/pages/Elmo/SobreElmo';
import MaternoInfantil from '~/pages/Home/LinhasDeCuidado/MaternoInfantil';
import MeusConteudos from '~/pages/MeusConteudos';
import EdicaoInfoPessoal from '~/pages/Perfil/EdicaoInfoPessoal';
import EdicaoInfoProfissional from '~/pages/Perfil/EdicaoInfoProfissional';
import Residencias from '~/pages/Residencias';
import SemConexao from '~/pages/SemConexao';
import TelaDeSucesso from '~/pages/TelaDeSucesso';
import WebViewPage from '~/pages/WebViewPage';
import AppDrawerScreen from './appDrawerScreen.routes';
import CadastroRoutes from './cadastro.routes';
import FrequenciasStackScreen from './frequencias.routes';
import LoginStackScreen from './login.routes';
import OficinaDesignStackScreen from './oficinaDesign.routes';
import PreCadastroRoutes from './preCadastro.routes';
import QualiquizRoutes from './qualiquiz.routes';
import SearchStackScreen from './search.routes';

const { Screen, Navigator } = createStackNavigator();

const Routes = ({ navigationRef }) => {
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
      <Navigator>
        <Screen
          name="App"
          component={AppDrawerScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name={rotas.LOGIN}
          component={LoginStackScreen}
          options={{ headerShown: false }}
          initialParams={{ redirectRoute: rotas.HOME }}
        />
        <Screen
          name="CADASTRO"
          options={{
            headerShown: false,
          }}
          component={CadastroRoutes}
        />
        <Screen
          name={rotas.PRE_CADASTRO}
          options={{ headerShown: false }}
          component={PreCadastroRoutes}
        />
        <Screen
          name="LOGIN_WELCOME"
          component={AppDrawerScreen}
          options={{ headerShown: false }}
          initialParams={{ possuiIDSaude: false }}
        />
        <Screen
          name={rotas.DESCRICAO}
          component={Descricao}
          options={{ headerShown: true, title: 'Descrição' }}
        />
        <Screen
          name={rotas.SEM_CONEXAO}
          component={SemConexao}
          options={{ headerShown: true }}
        />
        <Screen
          name={rotas.MATERNO_INFANTIL}
          component={MaternoInfantil}
          options={{ headerShown: true }}
        />
        <Screen
          name={rotas.SEARCH_STACK_SCREEN}
          component={SearchStackScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name={rotas.TELA_SUCESSO}
          component={TelaDeSucesso}
          initialParams={{
            textoApresentacao: 'Sucesso!',
            telaDeRedirecionamento: rotas.HOME,
          }}
          options={{ headerShown: false }}
        />
        <Screen
          name="MeusConteudos"
          component={MeusConteudos}
          initialParams={{ conteudos: [] }}
        />
        <Screen
          name={rotas.EDICAO_PROFISSIONAL}
          component={EdicaoInfoProfissional}
        />
        <Screen
          name={rotas.BEM_VINDO}
          component={BemVindo}
          options={{ headerShown: false }}
        />
        <Screen
          name={rotas.EDICAO_INFO_PESSOAIS}
          component={EdicaoInfoPessoal}
        />
        <Screen name={rotas.ELMO} component={Elmo} />
        <Screen name={rotas.RESIDENCIA_MEDICA} component={Residencias} />
        <Screen
          name={rotas.FREQUENCIAS}
          component={FrequenciasStackScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name={rotas.OFICINA_DESIGN}
          component={OficinaDesignStackScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name={rotas.QUALIQUIZ}
          component={QualiquizRoutes}
          options={{ headerShown: false }}
        />
        <Screen name={rotas.SOBRE_ELMO} component={SobreElmo} />
        <Screen name={rotas.CAPACITACAO_ELMO} component={CapacitacaoElmo} />
        <Screen name={rotas.NOVIDADES_ELMO} component={NovidadesElmo} />
        <Screen name={rotas.WEBVIEW_PAGE} component={WebViewPage} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
