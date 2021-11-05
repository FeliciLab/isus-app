import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Educacao from '../assets/icons/educacao.svg';
import Pesquisa from '../assets/icons/pesquisa.svg';
import rotas from '../constantes/rotas';
import { ConteudoProvider } from '../context/ConteudoContext';
import useAnalytics from '../hooks/Analytics';
import EstruturaConteudo from '../pages/Content/EstruturaConteudo';
import Home from '../pages/Home';

const HomeStack = createStackNavigator();

let title = '';
let categoria = '';

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={rotas.HOME}
        component={Home}
        options={{ headerShown: true }}
      />
    </HomeStack.Navigator>
  );
}

const MinhaSaudeStack = createStackNavigator();

function MinhaSaudeStackScreen() {
  categoria = 'minhaSaude';
  title = 'Minha Saúde';
  return (
    <ConteudoProvider categoria={categoria} titulo={title}>
      <MinhaSaudeStack.Navigator>
        <MinhaSaudeStack.Screen
          name="minhaSaude"
          component={EstruturaConteudo}
          options={{ headerShown: true, title }}
        />
      </MinhaSaudeStack.Navigator>
    </ConteudoProvider>
  );
}

const EducationStack = createStackNavigator();

function EducationStackScreen() {
  categoria = 'educacao';
  title = 'Educação Permanente';
  return (
    <ConteudoProvider categoria={categoria} titulo={title}>
      <EducationStack.Navigator>
        <EducationStack.Screen
          name={categoria}
          component={EstruturaConteudo}
          options={{ headerShown: true, title }}
        />
      </EducationStack.Navigator>
    </ConteudoProvider>
  );
}

const SearchesStack = createStackNavigator();

function SearchesStackScreen() {
  categoria = 'pesquisaCientifica';
  title = 'Pesquisa Científica';
  return (
    <ConteudoProvider categoria={categoria} titulo={title}>
      <SearchesStack.Navigator>
        <SearchesStack.Screen
          name={categoria}
          component={EstruturaConteudo}
          options={{ headerShown: true, title }}
        />
      </SearchesStack.Navigator>
    </ConteudoProvider>
  );
}

const AppTab = createMaterialBottomTabNavigator();

export default function AppTabScreen() {
  const { analyticsData } = useAnalytics();
  return (
    <AppTab.Navigator
      backBehavior="history"
      initialRouteName={rotas.HOME}
      activeColor="#4CAF50"
      inactiveColor="#828282"
      barStyle={{ backgroundColor: '#fff' }}
    >
      <AppTab.Screen
        name="HOME_SCREEN_HOME"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={20} />
          )
        }}
        listeners={() => ({
          tabPress: () => {
            analyticsData('Home', 'Click', 'Home');
          }
        })}
      />

      {
        <AppTab.Screen
          name="HOME_SCREEN_HEALTH"
          component={MinhaSaudeStackScreen} // Teste
          options={{
            tabBarLabel: 'Minha Saúde',
            tabBarIcon: ({ color }) => (
              <Icon name="heart" color={color} size={20} />
            )
          }}
        />
      }

      <AppTab.Screen
        name="HOME_SCREEN_EDUCATION"
        component={EducationStackScreen}
        options={{
          tabBarLabel: 'Educação',
          tabBarIcon: ({ color }) => <Educacao color={color} size={20} />
        }}
      />
      <AppTab.Screen
        name="HOME_SCREEN_SEARCH"
        component={SearchesStackScreen}
        options={{
          tabBarLabel: 'Pesquisa',
          tabBarIcon: ({ color }) => <Pesquisa color={color} size={20} />
        }}
      />
    </AppTab.Navigator>
  );
}
