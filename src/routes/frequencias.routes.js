import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import useAutenticacao from '~/hooks/useAutenticacao';
import rotas from '~/constantes/rotas';
import ListarOfertas from '~/pages/Residencias/frequencias/ListarOfertas';
import HistoricoFrequencia from '~/pages/Residencias/frequencias/HistoricoFrequencia';
import ConfirmarPresenca from '~/pages/Residencias/frequencias/ConfirmarPresenca';
import SucessoPresenca from '~/pages/Residencias/frequencias/SucessoPresenca';
import LoginFrequencias from '~/pages/Residencias/frequencias/LoginFrequencias';

const { Navigator, Screen } = createStackNavigator();

export default function FrequenciasStackScreen() {
  const { user } = useAutenticacao();

  return (
    <Navigator>
      {user ? (
        <>
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
        </>
      ) : (
        <Screen name={rotas.LOGIN_FREQUENCIA} component={LoginFrequencias} />
      )}
    </Navigator>
  );
}
