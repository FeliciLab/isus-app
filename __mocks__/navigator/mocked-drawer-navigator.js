import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

const MockedDrawerNavigator = ({
  name,
  conteudoDrawer,
  component,
  params = {},
}) => (
  <NavigationContainer>
    <Drawer.Navigator drawerContent={conteudoDrawer}>
      <Drawer.Screen name={name} component={component} initialParams={params} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default MockedDrawerNavigator;
