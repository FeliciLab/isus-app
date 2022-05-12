import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import rotas from '~/constantes/rotas';
import Notifications from '~/pages/Notifications/index';
import Notificationsdetails from '~/pages/Notifications/Notificationsdetails/index';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon } from '~/icons/index';

const { Navigator, Screen } = createStackNavigator();

export default function NotificationsStackScreen() {
  const navigation = useNavigation();

  const options = {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: 'rgba(0, 0, 0, 0.87)',
    headerTitleAlign: 'center',
    headerTitle: 'Notificações',
    headerLeft: () => (
      <TouchableOpacity
        style={{
          marginHorizontal: 19,
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <ArrowLeftIcon size={28} color={CORES.VERDE} />
      </TouchableOpacity>
    ),
  };

  return (
    <Navigator>
      <Screen
        name={rotas.NOTIFICATIONS_LIST}
        component={Notifications}
        options={options}
      />
      <Screen
        name={rotas.NOTIFICATIONS_DETAILS}
        component={Notificationsdetails}
        options={options}
      />
    </Navigator>
  );
}
