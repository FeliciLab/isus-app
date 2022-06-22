import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import OficinaDesign from '~/pages/OficinaDesign';
import ConfirmarPresencaOficina from '~/pages/OficinaDesign/ConfirmarPresencaOficina';
import ListarOficinas from '~/pages/OficinaDesign/ListarOficinas';
import SucessoPresencaOficina from '~/pages/OficinaDesign/SucessoPresencaOficina';
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
            name={rotas.OFICINA_DESIGN_LISTAR_OFICINAS}
            component={ListarOficinas}
          />
          <Screen
            name={rotas.OFICINA_DESIGN_CONFIRMAR_PRESENCA}
            component={ConfirmarPresencaOficina}
          />
          <Screen
            name={rotas.OFICINA_DESIGN_SUCESSO}
            component={SucessoPresencaOficina}
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
