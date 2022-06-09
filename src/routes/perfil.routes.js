import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import Perfil from '~/pages/Perfil';
import LoginStackScreen from './login.routes';

const { Screen, Navigator } = createStackNavigator();

const PerfilRoutes = () => {
  const { user } = useAutenticacao();

  return (
    <Navigator>
      {user ? (
        <Screen name={rotas.PERFIL_INITIAL} component={Perfil} />
      ) : (
        <Screen
          name="PERFIL_LOGIN"
          component={LoginStackScreen}
          options={{ headerShown: false }}
          initialParams={{ redirectRoute: rotas.HOME }}
        />
      )}
    </Navigator>
  );
};

export default PerfilRoutes;
