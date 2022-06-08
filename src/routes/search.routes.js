import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Buscar from '~/pages/Buscar';
import BuscarDescription from '~/pages/Buscar/Description';
import rotas from '~/constantes/rotas';

const { Screen, Navigator } = createStackNavigator();

const SearchStackScreen = () => (
  <Navigator>
    <Screen
      name={rotas.SEARCH_PAGE}
      component={Buscar}
      options={{ headerShown: true }}
    />
    <Screen
      name={rotas.SEARCH_PAGE_DESCRIPTION}
      component={BuscarDescription}
      options={{ headerShown: true }}
    />
  </Navigator>
);

export default SearchStackScreen;
