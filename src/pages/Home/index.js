import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BarraDeStatus from '~/components/barraDeStatus';
import useAnalytics from '~/hooks/useAnalytics';
import useAutenticacao from '~/hooks/useAutenticacao';
import Banners from './Banners';
import ForcaTarefa from './ForcaTarefa';
import LinhasDeCuidado from './LinhasDeCuidado/index';
// import LinhasDeCuidado from './LinhasDeCuidado';
import Servicos from './Servicos';
import UserInfo from './UserInfo/index';
// import MeusConteudos from './MeusConteudos';

export default function Home() {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  const { user, token } = useAutenticacao();

  async function redirectToWelcome() {
    const item = await AsyncStorage.getItem('@show-tutorial');
    const resp = JSON.parse(item);
    if (resp !== false) {
      return navigation.reset({
        index: 0,
        routes: [{ name: 'BemVindo' }],
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
        backgroundColor: user ? '#FFF' : '#4CAF50',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: user ? '#000' : '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'iSUS',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={async () => {
            await analyticsData('Home', 'Click', 'lupa pesquisa');
            navigation.navigate('Buscar');
          }}>
          <Icon name="magnify" size={28} color={user ? '#4CAF50' : '#FFF'} />
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
          <Icon name="menu" size={28} color={user ? '#4CAF50' : '#FFF'} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const { width } = Dimensions.get('screen');

  return (
    <>
      <BarraDeStatus
        backgroundColor={user ? '#FFF' : '#4CAF50'}
        barStyle={user ? 'dark-content' : 'light-content'}
      />

      {user && <UserInfo />}

      <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
        <Banners sliderWidth={width} itemWidth={width} />

        <Text>{JSON.stringify({ user, token }, undefined, 2)}</Text>
        <Servicos navigation={navigation} />
        {/* {estaLogado && <MeusConteudos />} */}
        <ForcaTarefa navigation={navigation} />
        <LinhasDeCuidado navigation={navigation} />
      </ScrollView>
    </>
  );
}
