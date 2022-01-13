import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { perfilUsuario } from '../../apis/apiCadastro';
import BarraDeStatus from '../../components/barraDeStatus';
import useAnalytics from '../../hooks/Analytics';
// import useAppTrackTransparency from '../../hooks/useAppTrackTransparency';
import useAutenticacao from '../../hooks/useAutenticacao';
import {
  armazenarEstadoLogado,
  pegarEstadoLogadoArmazenado,
  pegarTokenDoUsuarioNoStorage,
  salvarTokenDoUsuarioNoStorage,
} from '../../services/autenticacao';
import Banners from './Banners';
import ExibirUsuario from './exibirUsuario';
import ForcaTarefa from './ForcaTarefa';
import LinhasDeCuidado from './LinhasDeCuidado';
// import MeusConteudos from './MeusConteudos';
import Servicos from './Servicos';
import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';
import { Button, Text } from 'react-native-paper';

export default function Home() {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  // const { verificarRastreio } = useAppTrackTransparency();

  const [trackingStatus, setTrackingStatus] = React.useState('(loading)');

  const {
    estaLogado,
    alterarDadosUsuario,
    alterarTokenUsuario,
    alterarEstaLogado,
    alterarPessoa,
  } = useAutenticacao();

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

  const pegarTokenUsuario = useCallback(async () => {
    const logado = await pegarEstadoLogadoArmazenado();
    const token = await pegarTokenDoUsuarioNoStorage();

    if (!logado) {
      alterarTokenUsuario({});
      salvarTokenDoUsuarioNoStorage(false);
      alterarEstaLogado(false);
      armazenarEstadoLogado(false);
      return;
    }

    alterarTokenUsuario(token);

    try {
      const perfil = await perfilUsuario();
      alterarDadosUsuario(perfil.data);
      alterarPessoa(perfil.data);
      alterarEstaLogado(true);
    } catch (err) {
      alterarEstaLogado(false);
      console.log('ERRO', err);
    }
  }, []);

  useEffect(() => {
    // verificarRastreio();

    redirectToWelcome();

    pegarTokenUsuario();
  }, []);

  useEffect(() => {
    getTrackingStatus()
      .then((status) => {
        setTrackingStatus(status);
      })
      .catch((e) => Alert.alert('Error', e?.toString?.() ?? e));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: estaLogado ? '#FFF' : '#4CAF50',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: estaLogado ? '#000' : '#FFF',
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
          <Icon
            name="magnify"
            size={28}
            color={estaLogado ? '#4CAF50' : '#FFF'}
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
          <Icon name="menu" size={28} color={estaLogado ? '#4CAF50' : '#FFF'} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const { width } = Dimensions.get('screen');

  const request = useCallback(async () => {
    try {
      const status = await requestTrackingPermission();
      setTrackingStatus(status);
    } catch (e) {
      Alert.alert('Error', e?.toString?.() ?? e);
    }
  }, []);

  return (
    <>
      <BarraDeStatus
        backgroundColor={estaLogado ? '#FFF' : '#4CAF50'}
        barStyle={estaLogado ? 'dark-content' : 'light-content'}
      />

      {estaLogado && <ExibirUsuario />}

      {/* TODO: remover depois */}

      <Text>Tracking Status: {trackingStatus}</Text>
      <Button onPress={request}>Request Tracking Permission</Button>
      {/* TODO: fim do remover depois */}

      <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
        <Banners sliderWidth={width} itemWidth={width} />
        <Servicos navigation={navigation} />
        {/* {estaLogado && <MeusConteudos />} */}
        <ForcaTarefa navigation={navigation} />
        <LinhasDeCuidado navigation={navigation} />
      </ScrollView>
    </>
  );
}
