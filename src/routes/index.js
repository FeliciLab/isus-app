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
import BuscarDescription from '../pages/Buscar/Description';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="App" component={AppDrawerScreen} options={{ headerShown: false }} />
        <RootStack.Screen
          name="Educaçao permanente"
          component={Description}
          options={{ headerShown: true }}
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
          component={searchStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const searchStack = createStackNavigator();
function searchStackScreen() {
  return (
    <searchStack.Navigator>
      <searchStack.Screen name="Buscar" component={Buscar} options={{ headerShown: true }} />
      <searchStack.Screen
        name="Buscar Description"
        component={BuscarDescription}
        options={{ headerShown: true }}
      />
    </searchStack.Navigator>
  );
}
