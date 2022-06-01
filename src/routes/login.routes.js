import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
// import { FormProvider } from '~/context/FormContext';
import Login from '~/pages/Login';
import FormularioLogin from '~/pages/Login/FormularioLogin';
import rotas from '~/constantes/rotas';

const { Navigator, Screen } = createStackNavigator();

// TODO: Avaliar se FormProvider ainda é necessário
export default function LoginStackScreen() {
  return (
    // <FormProvider>
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
        initialParams={{ possuiIDSaude: true }}
      />
    </Navigator>
    // </FormProvider>
  );
}
