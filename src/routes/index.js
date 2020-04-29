import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppTab from './appBottomTab';

const RootStack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="App" component={AppTab} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
