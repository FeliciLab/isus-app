import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import ConfirmarPresenca from '~/pages/Residencias/frequencias/ConfirmarPresenca';
import HistoricoFrequencia from '~/pages/Residencias/frequencias/HistoricoFrequencia';
import ListarOfertas from '~/pages/Residencias/frequencias/ListarOfertas';
import SucessoPresenca from '~/pages/Residencias/frequencias/SucessoPresenca';
import LoginStackScreen from './login.routes';

const { Navigator, Screen, Group } = createStackNavigator();

export default function FrequenciasStackScreen() {
  const { user } = useAutenticacao();

  return (
    <Navigator>
      {user ? (
        <Group>
          <Screen name={rotas.LISTAR_OFERTAS} component={ListarOfertas} />
          <Screen
            name={rotas.HISTORICO_FREQUENCIA}
            component={HistoricoFrequencia}
          />
          <Screen
            name={rotas.CONFIRMAR_PRESENCA}
            component={ConfirmarPresenca}
          />
          <Screen name={rotas.SUCESSO_PRESENCA} component={SucessoPresenca} />
        </Group>
      ) : (
        <Group>
          <Screen
            name={rotas.LOGIN_FREQUENCIA}
            component={LoginStackScreen}
            options={{ headerShown: false }}
            initialParams={{ redirectRoute: rotas.LISTAR_OFERTAS }}
          />
        </Group>
      )}
    </Navigator>
  );
}
