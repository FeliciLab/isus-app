import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const MockedDrawerNavigator = ({
  name, conteudoDrawer, component, params = {}
}) => (
  <NavigationContainer>
    <Drawer.Navigator
      drawerContent={conteudoDrawer}
    >
      <Drawer.Screen
        name={name}
        component={component}
        initialParams={params}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default MockedDrawerNavigator;
