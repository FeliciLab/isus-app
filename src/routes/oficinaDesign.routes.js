import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import OficinaDesign from '~/pages/OficinaDesign';
import ListarOficinas from '~/pages/OficinaDesign/ListarOficinas';
import HistoricoFrequencia from '~/pages/Residencias/frequencias/HistoricoFrequencia';
import LoginStackScreen from './login.routes';

const { Navigator, Screen } = createStackNavigator();

export default function OficinaDesignStackScreen() {
  const { user } = useAutenticacao();

  return (
    <Navigator>
      {user ? (
        <>
          <Screen name={rotas.OFICINA_DESIGN_HOME} component={OficinaDesign} />
          <Screen
            name={rotas.HISTORICO_FREQUENCIA}
            component={HistoricoFrequencia}
          />
          <Screen
            name={rotas.OFICINA_DESIGN_LISTAR_OFICINAS}
            component={ListarOficinas}
          />
        </>
      ) : (
        <Screen
          name={rotas.LOGIN_FREQUENCIA}
          component={LoginStackScreen}
          options={{ headerShown: false }}
          initialParams={{ redirectRoute: rotas.LISTAR_OFERTAS }}
        />
      )}
    </Navigator>
  );
}
