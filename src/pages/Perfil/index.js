import React, { useLayoutEffect, useCallback, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import jwtDecode from 'jwt-decode';
import CabecalhoPerfil from './cabecalhoPerfil';
import MenuPerfil from './menuPerfil';
import MenuPerfilItem from './menuPerfilItem';
import { logout } from '../../apis/apiKeycloak';
import { pegarTokenDoUsuarioNoStorage, excluirTokenDoUsuarioNoStorage } from '../../services/autenticacao';
import DadosUsuario from './DadosUsuario';

export default function PerfilScreen() {
  const [dadosUsuario, alterarDadosUsuario] = useState({});
  const [tokenUsuario, alterarTokenUsuario] = useState({});
  const navigation = useNavigation();

  const paraDadosUsuario = (jwtToken) => {
    const dadosDecodificados = jwtDecode(jwtToken.access_token);
    const {
      // eslint-disable-next-line camelcase
      given_name, family_name, name, email, CPF, CIDADE
    } = dadosDecodificados;
    return {
      nome: given_name,
      sobrenome: family_name,
      nomeCompleto: name,
      email,
      cpf: CPF,
      cidade: CIDADE
    };
  };

  useFocusEffect(
    useCallback(() => {
      async function pegarTokenUsuario() {
        const token = await pegarTokenDoUsuarioNoStorage();
        alterarTokenUsuario(token);
        try {
          alterarDadosUsuario(paraDadosUsuario(token));
        } catch (err) {
          console.log('ERRO', err);
        }
      }
      pegarTokenUsuario();
    }, [])
  );

  const realizarLogout = async () => {
    await logout(tokenUsuario);
    await excluirTokenDoUsuarioNoStorage();
    const token = await pegarTokenDoUsuarioNoStorage();
    console.log('TOKEN APÓS LOGOUT', token);
    navigation.navigate('HOME');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Perfil',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}
        >
          <Icon name="magnify" size={28} color="#FFF" />
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
          <Icon name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  return (
    <View style={estilos.margem}>
      <CabecalhoPerfil nome={dadosUsuario.nome} />
      <MenuPerfil titulo="Meu dados">
        <DadosUsuario dados={dadosUsuario} />
      </MenuPerfil>
      <MenuPerfil titulo="Privacidade">
        <MenuPerfilItem icone="clipboard-text" titulo="Termos de uso" onPress={() => navigation.navigate('TERMOS_DE_USO')} />
      </MenuPerfil>
      <MenuPerfil titulo="Preferências">
        <MenuPerfilItem icone="exit-to-app" titulo="Sair" onPress={() => realizarLogout()} />
      </MenuPerfil>
    </View>
  );
}

const estilos = StyleSheet.create({
  margem: {
    padding: 15,
    flex: 1,
    flexDirection: 'column'
  }
});
