import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from '../pages/Home';
import DetailsScreen from '../pages/Details';
// import SettingsScreen from './pages/Settings';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

// const SettingsStack = createStackNavigator();

// function SettingsStackScreen() {
//   return (
//     <SettingsStack.Navigator headerMode="none">
//       <SettingsStack.Screen name="Settings" component={SettingsScreen} />
//       <SettingsStack.Screen name="Details" component={DetailsScreen} />
//     </SettingsStack.Navigator>
//   );
// }

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#4CAF50"
      inactiveColor="#828282"
      barStyle={{ backgroundColor: '#fff' }}
    >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={20} />
      }}
    />
    <Tab.Screen
      name="Health"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Minha Saúde',
        tabBarIcon: ({ color }) => <Icon name="heart" color={color} size={20} />
      }}
    />

    <Tab.Screen
      name="Education"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Educação',
        tabBarIcon: ({ color }) => <Icon name="book-multiple-variant" color={color} size={20} />
      }}
    />
    <Tab.Screen
      name="Search"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Pesquisa',
        tabBarIcon: ({ color }) => <Icon name="library-books" color={color} size={20} />
      }}
    />
    </Tab.Navigator>
  );
}
