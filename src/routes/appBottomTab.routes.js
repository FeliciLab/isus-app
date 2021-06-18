import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import AppDrawerScreen from './appDrawerScreen';
import { createStackNavigator } from '@react-navigation/stack';
import TopTab from './appTopTab.routes';
import Educacao from '../assets/icons/educacao.svg';
import Pesquisa from '../assets/icons/pesquisa.svg';
// import SettingsStackScreen from '../pages/Settings';
import ContentScreen from '../pages/Content';
import HomeScreen from '../pages/Home';
import { analyticsData } from '../utils/analytics';
import rotas from '../constantes/rotas';
import { ConteudoProvider } from '../context/ConteudoContext';
import EstruturaConteudo from '../pages/Content/EstruturaConteudo';

const HomeStack = createStackNavigator();
let title = '';

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
  return (
    <ConteudoProvider
      categoria="minhaSaude"
      titulo="Minha Saúde"
    >
      <MinhaSaudeStack.Navigator>
        <MinhaSaudeStack.Screen
          name="minhaSaude"
          component={EstruturaConteudo}
          options={{ headerShown: true, title: 'Minha Saúde' }}
        />
      </MinhaSaudeStack.Navigator>
    </ConteudoProvider>
  );
}

const EducationStack = createStackNavigator();
function EducationStackScreen() {
  title = 'Educação Permanente';
  return (
    <EducationStack.Navigator>
      <EducationStack.Screen
        name="Educação"
        initialParams={[<ContentScreen />, title]}
        component={TopTab}
        options={{ headerShown: true }}
      />
    </EducationStack.Navigator>
  );
}
const SearchesStack = createStackNavigator();
function SearchesStackScreen() {
  title = 'Pesquisa Científica';
  return (
    <SearchesStack.Navigator>
      <SearchesStack.Screen
        name={title}
        initialParams={[<ContentScreen />, title]}
        component={TopTab}
        options={{ headerShown: true }}
      />
    </SearchesStack.Navigator>
  );
}

const AppTab = createMaterialBottomTabNavigator();
export default function AppTabScreen() {
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

      { <AppTab.Screen
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
