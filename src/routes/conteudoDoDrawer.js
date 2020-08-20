import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  Share
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import packageJson from '../../package.json';
import Heart from '../assets/icons/isus_hor.svg';
import { pegarTokenDoUsuarioNoStorage } from '../services/autenticacao';
import IconTermosDeUso from '../assets/icons/termos_de_uso.svg';

function conteudoDoDrawer(props) {
  const [tokenUsuario, alterarTokenUsuario] = useState({});
  const {
    navigation: { navigate },
    routeName
  } = props;
  const navigationTermos = useNavigation();

  const versaoSistema = packageJson.version;

  pegarTokenDoUsuarioNoStorage().then(token => alterarTokenUsuario(token));

  const ItensDoDrawer = [
    {
      nome: 'Home',
      icone: <Icon name="home" size={22} color="rgba(0, 0, 0, 0.54)" />,
      rota: 'HOME'
    },
    {
      nome: 'Meu perfil',
      icone: <Icon name="account" size={22} color="rgba(0, 0, 0, 0.54)" />,
      rota: tokenUsuario ? 'PERFIL' : 'LOGIN'
    },
    {
      nome: 'Fale conosco',
      icone: <MaterialIcon name="feedback" size={22} color="rgba(0, 0, 0, 0.54)" />,
      rota: 'FEEDBACK'
    },
    {
      nome: 'Alerta de EPI',
      icone: <Icon name="alert-octagon" size={22} color="rgba(0, 0, 0, 0.54)" />,
      rota: 'ALERTA_EPI'
    },
    {
      nome: 'SUS no Ceará',
      icone: <Icon name="help-circle" size={22} color="rgba(0, 0, 0, 0.54)" />,
      rota: 'SUS_NO_CEARA'
    },
    {
      nome: 'Sobre o iSUS',
      icone: <Icon name="information" size={22} color="rgba(0, 0, 0, 0.54)" />,
      rota: 'SOBRE'
    }
  ];


  return (
    <>
      <SafeAreaView style={estilos.droidSafeArea}>
        <View
          style={estilos.conteudoCabecalho}
        >
          <Heart size={40} style={{ margin: 10 }} />
        </View>
      </SafeAreaView>
      <DrawerContentScrollView {...props} style={{ marginTop: 0 }}>
        {
          ItensDoDrawer.map(item => (
            <DrawerItem
              key={item.nome}
              icon={() => item.icone}
              label={item.nome}
              labelStyle={{ fontSize: 15 }}
              inactiveTintColor="rgba(0, 0, 0, 0.87)"
              activeTintColor="rgba(0, 0, 0, 0.87)"
              inactiveBackgroundColor="transparent"
              activeBackgroundColor="transparent"
              focused={routeName === item.rota}
              onPress={() => navigate(item.rota)}
            />
          ))
        }
      </DrawerContentScrollView>
      {/* View é relativa a margem de porcentagem em relação a ultima opção do drawer */}
      {/* Caso adicione um item, a margemTop deve diminuir também */}
      <View style={estilos.itemCompartilhar}>
            <DrawerItem
              icon={() => <IconTermosDeUso />}
              label="Termos de Uso"
              labelStyle={{ fontSize: 15 }}
              inactiveTintColor="#111"
              activeTintColor="#111"
              inactiveBackgroundColor="transparent"
              activeBackgroundColor="transparent"
              onPress={() => navigationTermos.navigate('TERMOS_DE_USO')}
            />
      </View>
      <View style={estilos.itemCompartilhar}>
            <DrawerItem
              icon={() => <Icon name="share-variant" size={22} color="rgba(0, 0, 0, 0.54)" />}
              label="Compartilhe o iSUS"
              labelStyle={{ fontSize: 15 }}
              inactiveTintColor="#111"
              activeTintColor="#111"
              inactiveBackgroundColor="transparent"
              activeBackgroundColor="transparent"
              onPress={() => aoCompartilhar()}
            />
      </View>

      <View style={estilos.viewVersao}>
        <Text style={estilos.textoVersao}>
          Versão
          {' '}
          { versaoSistema }
        </Text>
      </View>
    </>
  );
}

const aoCompartilhar = async () => {
  const messagLink = 'Conhece o app iSUS? Um produto digital do governo do Ceará de apoio a profissionais de saúde, com informações, serviços e oportunidades na palma da mão! Saiba mais: https://coronavirus.ceara.gov.br/isus/';
  try {
    await Share.share({
      message: messagLink
    });
  } catch (error) {
    console.log(error.message);
  }
};

const estilos = StyleSheet.create({
  viewVersao: {
    marginTop: 0,
    marginBottom: 16,
  },
  textoVersao: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.4,
    margin: Platform.OS === 'android' ? 10 : 20
  },
  droidSafeArea: {
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  itemCompartilhar: {
    alignItems: 'flex-start',
  },
});


export default conteudoDoDrawer;
