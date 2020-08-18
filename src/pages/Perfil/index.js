import React, { useLayoutEffect, useCallback, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CabecalhoPerfil from './cabecalhoPerfil';
import MenuPerfil from './menuPerfil';
import MenuPerfilItem from './menuPerfilItem';
import { logout } from '../../apis/apiKeycloak';
import { pegarTokenDoUsuarioNoStorage, excluirTokenDoUsuarioNoStorage } from '../../services/autenticacao';

export default function PerfilScreen() {
  const [tokenUsuario, alterarTokenUsuario] = useState({});
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      async function pegarTokenUsuario() {
        const token = await pegarTokenDoUsuarioNoStorage();
        alterarTokenUsuario(token);
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
      <CabecalhoPerfil nome="" />
      <MenuPerfil titulo="Privacidade">
        <MenuPerfilItem titulo="Termos de Uso" onPress={() => navigation.navigate('TERMOS_DE_USO')} />
        {/* <MenuPerfilItem titulo="Política de privacidade" onPress={() => 'teste'} /> */}
      </MenuPerfil>
      <MenuPerfil titulo="Preferências">
        <MenuPerfilItem titulo="Sair" onPress={() => realizarLogout()} />
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
