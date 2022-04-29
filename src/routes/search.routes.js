import Buscar from '~/pages/Buscar';
import BuscarDescription from '~/pages/Buscar/Description';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

const SearchStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Buscar"
        component={Buscar}
        options={{ headerShown: true }}
      />
      <SearchStack.Screen
        name="Buscar Description"
        component={BuscarDescription}
        options={{ headerShown: true }}
      />
    </SearchStack.Navigator>
  );
}

export default SearchStackScreen;
