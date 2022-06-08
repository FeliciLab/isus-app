import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import rotas from '~/constantes/rotas';
import Login from '~/pages/Login';
import FormularioLogin from '~/pages/Login/FormularioLogin';
import { useRoute } from '@react-navigation/native';

const { Navigator, Screen } = createStackNavigator();

export default function LoginStackScreen() {
  const route = useRoute();

  const { redirectRoute } = route.params;

  return (
    <Navigator>
      <Screen
        name={rotas.LOGIN_COM_ID_SAUDE}
        component={Login}
        initialParams={{ possuiIDSaude: false }}
      />
      <Screen
        name={rotas.LOGIN_SEM_ID_SAUDE}
        component={Login}
        initialParams={{ possuiIDSaude: true }}
      />
      <Screen
        name={rotas.LOGIN_FORM}
        component={FormularioLogin}
        initialParams={{ possuiIDSaude: true, redirectRoute }}
      />
    </Navigator>
  );
}
