import * as React from 'react';
import {
  createDrawerNavigator
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Dimensions
} from 'react-native';
import AboutScreen from '../pages/About';
import AppTab from './appBottomTab.routes';
import FeedbackScreen from '../pages/FeedbackScreen';
import ConteudoDoDrawer from './conteudoDoDrawer';


const Drawer = createDrawerNavigator();
export default function appDrawerScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="SERVICE"
      drawerPosition="left"
      drawerStyle={{
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width / 1.5
      }}
      drawerContent={props => (
        <ConteudoDoDrawer {...props} routeName={props.state.routeNames[props.state.index]} />
      )}
    >
      <Drawer.Screen name="HOME" component={AppTab} />
      <Drawer.Screen name="FEEDBACK" component={FeedbackStackScreen} />
      <Drawer.Screen name="SOBRE" component={AboutStackScreen} />
    </Drawer.Navigator>
  );
}

const AboutStack = createStackNavigator();
function AboutStackScreen() {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen name="SOBRE" component={AboutScreen} options={{ headerShown: true }} />
    </AboutStack.Navigator>
  );
}

const FeedbackStack = createStackNavigator();
function FeedbackStackScreen() {
  return (
    <FeedbackStack.Navigator>
      <FeedbackStack.Screen
        name="FEEDBACK"
        component={FeedbackScreen}
        options={{ headerShown: true }}
      />
    </FeedbackStack.Navigator>
  );
}
