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

const HomeStack = createStackNavigator();
let title = '';

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
    </HomeStack.Navigator>
  );
}

const MinhaSaudeStack = createStackNavigator();
function MinhaSaudeStackScreen() {
  title = 'Minha Saúde';
  return (
    <MinhaSaudeStack.Navigator>
      <MinhaSaudeStack.Screen
        name={title}
        initialParams={[<ContentScreen />, title]}
        component={TopTab}
        options={{ headerShown: true }}
      />
    </MinhaSaudeStack.Navigator>
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
      initialRouteName="Home"
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
      />

      { <AppTab.Screen
        name="Health"
        component={MinhaSaudeStackScreen} // Teste
        options={{
          tabBarLabel: 'Minha Saúde',
          tabBarIcon: ({ color }) => <Icon name="heart" color={color} size={20} />
        }}
      /> }

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
