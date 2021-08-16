import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import AppDrawerScreen from './appDrawerScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Educacao from '../assets/icons/educacao.svg';
import Pesquisa from '../assets/icons/pesquisa.svg';
// import SettingsStackScreen from '../pages/Settings';
import HomeScreen from '../pages/Home';
import useAnalytics from '../hooks/Analytics';
import rotas from '../constantes/rotas';
import { ConteudoProvider } from '../context/ConteudoContext';
import EstruturaConteudo from '../pages/Content/EstruturaConteudo';

const HomeStack = createStackNavigator();
let title = '';
let categoria = '';

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={rotas.HOME}
        component={HomeScreen}
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
    <ConteudoProvider
      categoria={categoria}
      titulo={title}
    >
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
    <ConteudoProvider
      categoria={categoria}
      titulo={title}
    >
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
    <ConteudoProvider
      categoria={categoria}
      titulo={title}
    >
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
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home" color={color} size={20} />
        }}
        listeners={() => ({
          tabPress: () => {
            analyticsData('Home', 'Click', 'Home');
          }
        })}
      />

      {<AppTab.Screen
        name="Health"
        component={MinhaSaudeStackScreen} // Teste
        options={{
          tabBarLabel: 'Minha Saúde',
          tabBarIcon: ({ color }) => <Icon name="heart" color={color} size={20} />
        }}
      />}

      <AppTab.Screen
        name="Education"
        component={EducationStackScreen}
        options={{
          tabBarLabel: 'Educação',
          tabBarIcon: ({ color }) => <Educacao color={color} size={20} />
        }}
      />
      <AppTab.Screen
        name="Search"
        component={SearchesStackScreen}
        options={{
          tabBarLabel: 'Pesquisa',
          tabBarIcon: ({ color }) => <Pesquisa color={color} size={20} />
        }}
      />
    </AppTab.Navigator>
  );
}
