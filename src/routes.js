import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './pages/Home';
import DetailsScreen from './pages/Details';
import SettingsScreen from './pages/Settings';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator headerMode="none">
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#4CAF50'
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />
          }}
        />
        <Tab.Screen
          name="Health"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Minha Saúde',
            tabBarIcon: ({ color, size }) => <Icon name="heart" color={color} size={size} />
          }}
        />

        <Tab.Screen
          name="Education"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Educação',
            tabBarIcon: ({ color, size }) => (
              <Icon name="book-multiple-variant" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Search"
          component={SettingsStackScreen}
          options={{
            tabBarLabel: 'Pesquisa',
            tabBarIcon: ({ color, size }) => <Icon name="library-books" color={color} size={size} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
