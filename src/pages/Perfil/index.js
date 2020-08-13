import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CabecalhoPerfil from './cabecalhoPerfil';
import MenuPerfil from './menuPerfil';
import MenuPerfilItem from './menuPerfilItem';
import getPerfilUsuario from '../../apis/apiKeycloak';

export default function PerfilScreen() {
  const [perfilUsuario, alterarPerfilUsuario] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    alterarPerfilUsuario(getPerfilUsuario());
  }, []);

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
      <CabecalhoPerfil nome={perfilUsuario.given_name} />
      <MenuPerfil titulo="Minha conta">
        <MenuPerfilItem titulo="Meus dados" tela="MEUS_DADOS" />
        <MenuPerfilItem titulo="ID Saúde" />
      </MenuPerfil>
      <MenuPerfil titulo="Privacidade">
        <MenuPerfilItem titulo="Termos de uso" tela="TERMOS_DE_USO" />
        <MenuPerfilItem titulo="Política de privacidade" tela="POLITICA_DE_PRIVACIDADE" />
      </MenuPerfil>
      <MenuPerfil titulo="Preferências">
        <MenuPerfilItem titulo="Sair" />
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
