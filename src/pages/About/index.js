/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  View, ScrollView, StyleSheet, TouchableOpacity, Text, Image, Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Uece from '../../assets/images/uece.png';
import Funcap from '../../assets/images/funcap.png';
import Felicilab from '../../assets/images/felicilab.png';
import Esp from '../../assets/images/esp.png';
import Gesad from '../../assets/images/gesad.png';
import Governo from '../../assets/images/governo.png';
import LogoIsus from '../../assets/images/LogoIsus.png';
import NomeIsus from '../../assets/images/isusNome.png';


export default function AboutScreen() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Sobre o iSUS',
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

  function link(text, linkTo) {
    return (
      <Text style={{ marginHorizontal: 20, color: '#D2EBD3' }} onPress={() => Linking.openURL(linkTo)}>
      {text}
      </Text>
    );
  }

  return (
    <ScrollView style={{
      paddingHorizontal: 14, paddingBottom: 32, backgroundColor: '#fff', flex: 1
    }}
    >


    <View
      style={{
        paddingTop: 18,
        paddingBottom: 18
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginTop: 27,
          marginBottom: 30,
        }}
      >
        <Image
          source={LogoIsus}
          style={{
            marginRight: 10
          }}
        />
        <Image source={NomeIsus} />
      </View>
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'red',
          height: 50
        }}
      >
        <View style={{ width: '20%', height: 50 }} />
        <View style={{ width: '60%', height: 50 }}>
        <Text
          style={{
            fontSize: 20,
            color: 'rgba(0, 0, 0, 0.87)',
            height: 46,
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: 23,
            textAlign: 'center',
            letterSpacing: 0.15,
          }}
        >
          O super app do profissional da saúde
        </Text>
        </View>
        <View style={{ width: '20%', height: 50 }} />
      </View>
      <Title style={[styles.styleTextDefault, styles.Titleisus]}>
          O que é o iSUS?
      </Title>
      <Text style={styles.spaceRight}>
        O iSUS é um produto digital criado para ser um cinto de
        utilidades e apoiar os profissionais do Sistema Único de
        Saúde (SUS) no combate ao Covid-19, diante de desafios de
        urgência, emergência e proteção à vida.
      </Text>
      <Text style={styles.spaceRight}>
        Desenvolvido em meio à pandemia do novo coronavírus,
        responde à demanda de relacionamento entre usuários,
        trabalhadores e gestores do SUS.
      </Text>
      <Text style={styles.spaceRight}>
        O objetivo é entregar informações, serviços e oportunidades, de forma
        automatizada, personalizada e segura, na palma da mão dos profissionais,
        otimizando seu tempo e
        apoiando a tomada de decisões baseadas em dados e evidências científicas.
      </Text>
      <Title style={[styles.styleTextDefault, styles.Titleisus]}>
          Quem faz?
      </Title>
      <Text style={styles.spaceRight}>
        O objetivo é entregar informações,
          { link('Escola de saúde publica', 'https://www.esp.ce.gov.br/') }
          ,de forma automatizada, personalizada e segura,
          na palma da mão dos profissionais, otimizando seu
          tempo e apoiando a tomada de decisões baseadas em
          dados e evidências científicas.
      </Text>
    </View>

      <View
        style={{
          flexDirection: 'row',
          height: 100,
          justifyContent: 'space-between'
        }}
      >
        <Text onPress={() => Linking.openURL('http://www.uece.br/')}>
          <Image source={Uece} />
        </Text>
        <Text onPress={() => Linking.openURL('https://www.funcap.ce.gov.br/')}>
          <Image source={Funcap} />
        </Text>
        <Text onPress={() => Linking.openURL('https://escoladesaudepublica.github.io/#FeliciLab')}>
          <Image source={Felicilab} />
        </Text>
        <Text onPress={() => Linking.openURL('https://www.ceara.gov.br/')}>
          <Image source={Governo} />
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          height: 100,
          justifyContent: 'center'
        }}
      >

      <Text style={{ marginHorizontal: 20 }} onPress={() => Linking.openURL('https://www.esp.ce.gov.br/')}>
          <Image source={Esp} />
      </Text>

      <Text style={{ marginHorizontal: 20 }} onPress={() => Linking.openURL('http://www.uece.br/gesad/')}>
          <Image source={Gesad} />
      </Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  headerTop: {
    paddingHorizontal: 10,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spaceRight: {
    marginLeft: 16,
    marginTop: 16,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: 'rgba(0, 0, 0, 0.6)',
    // textAlign: 'justify'
  },
  styleTextDefault: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 23,
    letterSpacing: 0.15,
  },
  Titleisus: {
    marginTop: 25,
    marginLeft: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 20
  }
});
