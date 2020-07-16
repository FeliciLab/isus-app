import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import packageJson from '../../package.json';
import Heart from '../assets/icons/isus_hor.svg';
import { autenticarComIdSaude } from '../services/autenticacao';

function conteudoDoDrawer(props) {
  const {
    navigation: { navigate },
    routeName
  } = props;

  const versaoSistema = packageJson.version;
  return (
    <>
        <SafeAreaView style={estilos.safeAreaAndroid}>
          <View
            style={estilos.conteudoCabecalho}
          >
            <View style={{ flex: 1 }}>
              <Heart size={40} style={{ margin: 10 }} />
            </View>
            <View style={{ alignContent: 'center', marginTop: 25, marginRight: 10 }}>
              <Button color="black" uppercase={false} onPress={() => autenticarComIdSaude()}> Login </Button>
            </View>
          </View>
        </SafeAreaView>
        <DrawerContentScrollView {...props} style={{ marginTop: 0 }}>
          <DrawerItem
            icon={() => <FontAwesomeIcon name="home" size={20} color="#111" />}
            label="Home"
            labelStyle={{ fontWeight: 'bold', fontSize: 15 }}
            inactiveTintColor="#111"
            activeTintColor="#111"
            inactiveBackgroundColor="transparent"
            activeBackgroundColor="transparent"
            focused={routeName === 'HOME'}
            onPress={() => navigate('HOME')}
          />
          <DrawerItem
            icon={() => <Icon name="face" size={20} color="#111" />}
            label="FeedBack"
            labelStyle={{ fontWeight: 'bold', fontSize: 15 }}
            inactiveTintColor="#111"
            activeTintColor="#111"
            inactiveBackgroundColor="transparent"
            activeBackgroundColor="transparent"
            focused={routeName === 'FEEDBACK'}
            onPress={() => navigate('FEEDBACK')}
          />
          <DrawerItem
            icon={() => <Icon name="information-outline" size={20} color="#111" />}
            label="Sobre o iSUS"
            labelStyle={{ fontWeight: 'bold', fontSize: 15 }}
            inactiveTintColor="#111"
            activeTintColor="#111"
            inactiveBackgroundColor="transparent"
            activeBackgroundColor="transparent"
            focused={routeName === 'SOBRE'}
            onPress={() => navigate('SOBRE')}
          />
        </DrawerContentScrollView>
        {/* View é relativa a margem de porcentagem em relação a ultima opção do drawer */}
        {/* Caso adicione um item, a margemTop deve diminuir também */}
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

const estilos = StyleSheet.create({
  safeAreaAndroid: {
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  conteudoCabecalho: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#C4C4C4',
  },
  viewVersao: {
    margin: 16,
  },
  textoVersao: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.4,
    margin: Platform.OS === 'android' ? 10 : 20
  }
});

export default conteudoDoDrawer;
