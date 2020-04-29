import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { Headline } from 'react-native-paper';

import { View } from 'react-native';
import HomeScreen from './pages/Home';
import DetailsScreen from './pages/Details';
import SettingsScreen from './pages/Settings';
import Education from './pages/Education';

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

const EducationTab = createMaterialTopTabNavigator();
function EducationTabScreen() {
  return (
    <EducationTab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 10 },
        indicatorStyle: { backgroundColor: '#4CAF50' }
      }}
    >
      <EducationTab.Screen name="Recursos Educativos" component={Education} />
      <EducationTab.Screen name="Protocolos Institucionais" component={Education} />
      <EducationTab.Screen name="Notas e Portarias" component={Education} />
    </EducationTab.Navigator>
  );
}

const AppTab = createMaterialBottomTabNavigator();
function AppTabScreen() {
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
        component={SettingsStackScreen}
        options={{
          tabBarLabel: 'Minha Saúde',
          tabBarIcon: ({ color }) => <Icon name="heart" color={color} size={20} />
        }}
      />

      <AppTab.Screen
        name="Education"
        component={EducationTabScreen}
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

const RootStack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="App" component={AppTabScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
