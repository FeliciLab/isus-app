import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BarraDeStatus from '~/components/barraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import database from '~/database/index';
import useAnalytics from '~/hooks/useAnalytics';
import useAutenticacao from '~/hooks/useAutenticacao';
import Banners from './Banners';
import ForcaTarefa from './ForcaTarefa';
import LinhasDeCuidado from './LinhasDeCuidado';
import Servicos from './Servicos';
import UserInfo from './UserInfo';
// import LinhasDeCuidado from './LinhasDeCuidado';
// import MeusConteudos from './MeusConteudos';

export default function Home() {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  const { user, showTutorial } = useAutenticacao();

  const [notifications, setNotifications] = useState([]);

  const notificationsCollection = database.get('notifications');

  const testeCreateNotification = async () => {
    await database.write(async () => {
      await notificationsCollection.create(notification => {
        notification.title = '';
        notification.description = '';
        notification.cover = '';
        notification.readed = false;
        notification.visualized = false;
      });
    });

    const allNotifications = await notificationsCollection.query().fetch();

    setNotifications(allNotifications);
  };

  async function redirectToWelcome() {
    if (showTutorial) {
      return navigation.reset({
        index: 0,
        routes: [{ name: rotas.BEM_VINDO }],
      });
    }
    return null;
  }

  useEffect(() => {
    testeCreateNotification();
    redirectToWelcome();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: user ? CORES.BRANCO : CORES.VERDE,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: user ? CORES.PRETO : CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: 'iSUS',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={async () => {
            await analyticsData('Home', 'Click', 'lupa pesquisa');
            navigation.navigate(rotas.SEARCH_STACK_SCREEN);
          }}>
          <Icon
            name="magnify"
            size={28}
            color={user ? CORES.VERDE : CORES.BRANCO}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Icon
            name="menu"
            size={28}
            color={user ? CORES.VERDE : CORES.BRANCO}
          />
        </TouchableOpacity>
      ),
    });
  }, [user]);

  const { width } = Dimensions.get('screen');

  return (
    <>
      <BarraDeStatus
        backgroundColor={user ? CORES.BRANCO : CORES.VERDE}
        barStyle={user ? 'dark-content' : 'light-content'}
      />
      <UserInfo />
      {notifications.map(item => (
        <Text key={item.id}>{item.id}</Text>
      ))}
      <ScrollView style={{ backgroundColor: CORES.BRANCO, flex: 1 }}>
        <Banners sliderWidth={width} itemWidth={width} />
        <Servicos navigation={navigation} />
        {/* {estaLogado && <MeusConteudos />} */}
        <ForcaTarefa navigation={navigation} />
        <LinhasDeCuidado navigation={navigation} />
      </ScrollView>
    </>
  );
}
