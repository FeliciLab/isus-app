import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import AppTab from './appBottomTab';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Description from '../pages/Education/Description';
import Welcome from '../pages/Welcome';
import AppDrawerScreen from './appDrawerScreen';
import Buscar from '../pages/Buscar';
import ClinicalManagement from '../pages/ClinicalManagement';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="App" component={AppDrawerScreen} options={{ headerShown: false }} />
        <RootStack.Screen
          name="Educaçao permanente"
          component={Description}
          options={{
            headerShown: true,
            headerTintColor: '#FFF',
            headerStyle: {
              backgroundColor: '#4CAF50',
              elevation: 0,
              shadowOpacity: 0
            }
          }}
        />
         <RootStack.Screen
           name="clinical management"
           component={ClinicalManagement}
           options={{
             headerStyle: {
               backgroundColor: '#4CAF50'
             },
             headerTintColor: '#FFF',
             headerTitleAlign: 'center',
             headerTitle: 'Manejo Clínico Covid-19',
             headerRight: () => (
            <TouchableOpacity style={{
              marginHorizontal: 19
            }}
            >
              <Icon name="magnify" size={28} color="#FFF" />
            </TouchableOpacity>
             )
           }}
         />
        <RootStack.Screen
          name="Buscar"
          component={Buscar}
          options={{
            headerShown: true,
            headerTintColor: '#FFF',
            headerStyle: {
              backgroundColor: '#4CAF50',
              elevation: 0,
              shadowOpacity: 0
            }
          }}
        />
        {/* <RootStack.Screen name="App" component={AppTab} options={{ headerShown: false }} /> */}
        <RootStack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
