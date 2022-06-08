import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import QualiQuiz from '~/pages/QualiQuiz/index';
import LoginStackScreen from './login.routes';

const { Screen, Navigator } = createStackNavigator();

const QualiquizRoutes = () => {
  const { user } = useAutenticacao();

  return (
    <Navigator>
      {user ? (
        <Screen
          name="QualiQuizInitial"
          component={QualiQuiz}
          options={{ headerShown: false }}
        />
      ) : (
        <Screen
          name={rotas.QUALIQUIZ_LOGIN}
          component={LoginStackScreen}
          options={{ headerShown: false }}
        />
      )}
    </Navigator>
  );
};

export default QualiquizRoutes;
