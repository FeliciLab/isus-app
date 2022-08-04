import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import AppRateModal from '~/components/AppRateModal';
import BarraDeStatus from '~/components/BarraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import useAutenticacao from '~/hooks/useAutenticacao';
import { MagnifyIcon, MenuIcon } from '~/icons';
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
          <MagnifyIcon size={28} color={user ? CORES.VERDE : CORES.BRANCO} />
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
          <MenuIcon size={28} color={user ? CORES.VERDE : CORES.BRANCO} />
        </TouchableOpacity>
      ),
    });
  }, [user]);

  return (
    <>
      <BarraDeStatus
        backgroundColor={user ? CORES.BRANCO : CORES.VERDE}
        barStyle={user ? 'dark-content' : 'light-content'}
      />
      <UserInfo />
      <AppRateModal />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Banners />
        <Servicos navigation={navigation} />
        {/* {estaLogado && <MeusConteudos />} */}
        <ForcaTarefa navigation={navigation} />
        <LinhasDeCuidado navigation={navigation} />
      </ScrollView>
    </>
  );
}
