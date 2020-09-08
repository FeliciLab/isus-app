import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import AppTab from './appBottomTab';
import Description from '../pages/Content/Description';
import Welcome from '../pages/Welcome';
import AppDrawerScreen from './appDrawerScreen.routes';
import Buscar from '../pages/Buscar';
import ClinicalManagement from '../pages/ClinicalManagement';
import BuscarDescription from '../pages/Buscar/Description';
import WebViewPage from '../pages/WebView';
import ManejoWebViewPage from '../pages/WebView/ManejoWebView';
import TelaDeCadastro from '../pages/Cadastro';
import TelaDeLogin from '../pages/Login/index';

const RootStack = createStackNavigator();

export default function App({ navigationRef }) {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        <RootStack.Screen name="App" component={AppDrawerScreen} options={{ headerShown: false }} />
        <RootStack.Screen
          name="CADASTRO"
          component={TelaDeCadastro}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name="LOGIN"
          component={TelaDeLogin}
          options={{ headerShown: true }}
          initialParams={{ possuiIDSaude: false }}
        />
        <RootStack.Screen
          name="Descrição"
          component={Description}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name="clinical management"
          component={ClinicalManagement}
        />
        <RootStack.Screen
          name="webview"
          component={WebViewPage}
        />
        <RootStack.Screen
          name="manejoWebview"
          component={ManejoWebViewPage}
        />
        <RootStack.Screen
          name="Buscar"
          component={searchStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const searchStack = createStackNavigator();
function searchStackScreen() {
  return (
    <searchStack.Navigator>
      <searchStack.Screen name="Buscar" component={Buscar} options={{ headerShown: true }} />
      <searchStack.Screen
        name="Buscar Description"
        component={BuscarDescription}
        options={{ headerShown: true }}
      />
    </searchStack.Navigator>
  );
}
