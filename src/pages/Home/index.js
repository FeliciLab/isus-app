import React, {
  useLayoutEffect, useCallback, useContext
} from 'react';
import {
  ScrollView, TouchableOpacity, Dimensions
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Feature } from '@paralleldrive/react-feature-toggles';
import ForcaTarefaAntiCorona from './forcatarefaanticorona';
import ProviderDeVersaoDoManejo from '../ClinicalManagement/contexto/contextoVersaoManejo';
import Carrossel from './carrossel';
import BarraDeStatus from '../../components/barraDeStatus';
import Servicos from './Servicos/servicos';
import { pegarTokenDoUsuarioNoStorage } from '../../services/autenticacao';
import { perfilUsuario } from '../../apis/apiCadastro';
import ExibirUsuario from './exibirUsuario';
import MeusConteudos from './MeusConteudos';
import NovaForcaTarefa from './ForcaTarefa/NovaForcaTarefa';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';

export default function HomeScreen() {
  const navigation = useNavigation();

  const {
    dadosUsuario,
    estaLogado,
    alterarDadosUsuario,
    alterarTokenUsuario,
    alterarEstaLogado
  } = useContext(AutenticacaoContext);

  async function redirectToWelcome() {
    const item = await AsyncStorage.getItem('@show-tutorial');
    const resp = JSON.parse(item);
    if (resp !== false) {
      return navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }]
      });
    }
    return null;
  }

  redirectToWelcome();

  useFocusEffect(
    useCallback(() => {
      async function pegarTokenUsuario() {
        const token = await pegarTokenDoUsuarioNoStorage();
        if (token) {
          alterarTokenUsuario(token);
          try {
            const perfil = await perfilUsuario();
            console.log('retornar', perfil.data);
            alterarDadosUsuario(perfil.data);
            alterarEstaLogado(true);
          } catch (err) {
            alterarEstaLogado(false);
            console.log('ERRO', err);
          }
        } else {
          alterarTokenUsuario({});
          alterarEstaLogado(false);
        }
      }
      pegarTokenUsuario();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: estaLogado ? '#FFF' : '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: estaLogado ? '#000' : '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'iSUS',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}
        >
          <Icon name="magnify" size={28} color={estaLogado ? '#4CAF50' : '#FFF'} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Icon name="menu" size={28} color={estaLogado ? '#4CAF50' : '#FFF'} />
        </TouchableOpacity>
      )
    });
  });

  const { width } = Dimensions.get('screen');

  return (
    <>
      { estaLogado ? <ExibirUsuario dados={dadosUsuario} /> : <></>}
      <ProviderDeVersaoDoManejo>
        <BarraDeStatus backgroundColor={estaLogado ? '#FFF' : '#4CAF50'} barStyle={estaLogado ? 'dark-content' : 'light-content'} />
        <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
          <Carrossel sliderWidth={width} itemWidth={width} />
          <Servicos navigation={navigation} />
          {
            estaLogado && (
              <MeusConteudos />
            )
          }
          <Feature
            name="315"
            inactiveComponent={() => <ForcaTarefaAntiCorona navigation={navigation} />}
            activeComponent={() => <NovaForcaTarefa navigation={navigation} />}
          />
        </ScrollView>
      </ProviderDeVersaoDoManejo>
    </>
  );
}
