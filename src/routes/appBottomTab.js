import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AppDrawerScreen from './appDrawerScreen';
import EducationTab from './appTopTab';
import SettingsStackScreen from '../pages/Settings';

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
        component={AppDrawerScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home" color={color} size={20} />
        }}
      />
      <AppTab.Screen
        name="Health"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: 'Minha Saúde',
          tabBarIcon: ({ color }) => <Icon name="heart" color={color} size={20} />
        }}
      />

      <AppTab.Screen
        name="Education"
        component={EducationTab}
        options={{
          tabBarLabel: 'Educação',
          tabBarIcon: ({ color }) => <Icon name="book-multiple-variant" color={color} size={20} />
        }}
      />
      <AppTab.Screen
        name="Search"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: 'Pesquisa',
          tabBarIcon: ({ color }) => <Icon name="library-books" color={color} size={20} />
        }}
      />
    </AppTab.Navigator>
  );
}
