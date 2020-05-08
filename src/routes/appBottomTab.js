import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import AppDrawerScreen from './appDrawerScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EducationTab from './appTopTab';
import Educacao from '../assets/icons/educacao.svg';
import Pesquisa from '../assets/icons/pesquisa.svg';
import SettingsStackScreen from '../pages/Settings';

import HomeScreen from '../pages/Home';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  const navigation = useNavigation();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="App"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: '#4CAF50'
          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
          headerTitle: 'iSUS',
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginHorizontal: 19
              }}
              onPress={() => {
                navigation.navigate('Buscar');
              }}
            >
              <Icon name="magnify" size={28} color="#FFF" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginHorizontal: 19
              }}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            >
              <Icon name="menu" size={28} color="#FFF" />
            </TouchableOpacity>
          )
        }}
      />
    </HomeStack.Navigator>
  );
}

const EducationStack = createStackNavigator();
function EducationStackScreen() {
  const navigation = useNavigation();
  return (
    <EducationStack.Navigator>
      <EducationStack.Screen
        name="App"
        component={EducationTab}
        options={{
          headerStyle: {
            backgroundColor: '#4CAF50',
            elevation: 0,
            shadowOpacity: 0
          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
          headerTitle: 'Educação Permanente',
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginHorizontal: 19
              }}
              onPress={() => {
                navigation.navigate('Buscar');
              }}
            >
              <Icon name="magnify" size={28} color="#FFF" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginHorizontal: 19
              }}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            >
              <Icon name="menu" size={28} color="#FFF" />
            </TouchableOpacity>
          )
        }}
      />
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
