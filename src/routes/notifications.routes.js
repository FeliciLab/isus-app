import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import rotas from '~/constantes/rotas';
import Notifications from '~/pages/Notifications/index';
import Notificationsdetails from '~/pages/Notifications/Notificationsdetails/index';

const { Navigator, Screen } = createStackNavigator();

export default function NotificationsStackScreen() {
  return (
    <Navigator>
      <Screen name={rotas.NOTIFICATIONS_LIST} component={Notifications} />
      <Screen
        name={rotas.NOTIFICATIONS_DETAILS}
        component={Notificationsdetails}
      />
    </Navigator>
  );
}
