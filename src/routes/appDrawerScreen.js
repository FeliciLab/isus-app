import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Headline } from 'react-native-paper';
import { View } from 'react-native';
import AboutScreen from '../pages/About';
import AppTab from './appBottomTab';

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
const Drawer = createDrawerNavigator();
export default function appDrawerScreen() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon name="home" size={20} />
        }}
        Icon="home"
        name="Home"
        component={AppTab}
      />
      {/* <Drawer.Screen
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
      /> */}
      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon name="information" size={20} />
        }}
        name="Sobre o iSUS"
        component={AboutStackScreen}
      />
    </Drawer.Navigator>
  );
}

const AboutStack = createStackNavigator();
function AboutStackScreen() {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen name="App" component={AboutScreen} options={{ headerShown: true }} />
    </AboutStack.Navigator>
  );
}
