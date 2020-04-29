import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeRoutes from './routes/Home.routes';
import Welcome from './pages/Welcome';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Home" component={HomeRoutes} />
    </Stack.Navigator>
  );
}
