import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { Headline } from 'react-native-paper';

// import { View } from 'react-native';
import { View } from 'react-native';
import HomeScreen from './pages/Home';
import DetailsScreen from './pages/Details';
import SettingsScreen from './pages/Settings';

const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flexDirection: 'row' }}>
        <Icon
          style={{ alignSelf: 'center', marginHorizontal: 5 }}
          name="heart"
          size={35}
          color="#106839"
        />
        <Headline>iSUS</Headline>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

// const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon name="heart" size={20} />
        }}
        Icon="home"
        name="SUSI"
        component={SettingsScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon name="bookmark" size={20} />
        }}
        name="Favoritos"
        component={DetailsScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon name="bell" size={20} />
        }}
        name="Alertas"
        component={DetailsScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon name="account-circle" size={20} />
        }}
        name="Perfil"
        component={DetailsScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon name="settings" size={20} />
        }}
        name="Configurações"
        component={DetailsScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon name="information" size={20} />
        }}
        name="Sobre o iSUS"
        component={DetailsScreen}
      />
    </Drawer.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
          component={SettingsStackScreen}
          options={{
            tabBarLabel: 'Minha Saúde',
            tabBarIcon: ({ color }) => <Icon name="heart" color={color} size={20} />
          }}
        />

        <Tab.Screen
          name="Education"
          component={SettingsStackScreen}
          options={{
            tabBarLabel: 'Educação',
            tabBarIcon: ({ color }) => <Icon name="book-multiple-variant" color={color} size={20} />
          }}
        />
        <Tab.Screen
          name="Search"
          component={SettingsStackScreen}
          options={{
            tabBarLabel: 'Pesquisa',
            tabBarIcon: ({ color }) => <Icon name="library-books" color={color} size={20} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
