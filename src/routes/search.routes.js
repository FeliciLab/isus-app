import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Buscar from '~/pages/Buscar';
import BuscarDescription from '~/pages/Buscar/Description';
import rotas from '~/constantes/rotas';

const SearchStack = createStackNavigator();

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name={rotas.SEARCH_PAGE}
        component={Buscar}
        options={{ headerShown: true }}
      />
      <SearchStack.Screen
        name={rotas.SEARCH_PAGE_DESCRIPTION}
        component={BuscarDescription}
        options={{ headerShown: true }}
      />
    </SearchStack.Navigator>
  );
};

export default SearchStackScreen;
