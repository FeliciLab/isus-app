import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import AppDrawerScreen from './appDrawerScreen';
import { createStackNavigator } from '@react-navigation/stack';
import EducationTab from './appTopTab';
import Educacao from '../assets/icons/educacao.svg';
import Pesquisa from '../assets/icons/pesquisa.svg';
import SettingsStackScreen from '../pages/Settings';

import HomeScreen from '../pages/Home';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="App" component={HomeScreen} options={{ headerShown: true }} />
    </HomeStack.Navigator>
  );
}

const EducationStack = createStackNavigator();
function EducationStackScreen() {
  return (
    <EducationStack.Navigator>
      <EducationStack.Screen name="App" component={EducationTab} options={{ headerShown: true }} />
    </EducationStack.Navigator>
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

      <AppTab.Screen
        name="Health"
        component={SettingsStackScreen} // Teste
        options={{
          tabBarLabel: 'Minha Saúde',
          tabBarIcon: ({ color }) => <Icon name="heart" color={color} size={20} />
        }}
      />

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
        component={SettingsStackScreen}
        options={{
          tabBarLabel: 'Pesquisa',
          tabBarIcon: ({ color }) => <Pesquisa color={color} size={20} />
        }}
      />
    </AppTab.Navigator>
  );
}
