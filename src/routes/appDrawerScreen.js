import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';

import { Headline } from 'react-native-paper';

import { View } from 'react-native';
// import DetailsScreen from '../pages/Details';
// import HomeScreen from '../pages/Home';
import AboutScreen from '../pages/About';

import AppTab from './appBottomTab';

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

export default function appDrawerScreen() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon name="heart" size={20} />
        }}
        Icon="home"
        name="SUSI"
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
        component={AboutScreen}
      />
    </Drawer.Navigator>
  );
}
