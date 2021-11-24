import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Espsvg from '../../assets/images/sobreOiSUS/esp.svg';
import Uece from '../../assets/images/sobreOiSUS/euce2.png';
import Felicilabsvg from '../../assets/images/sobreOiSUS/felicilab.svg';
import Funcapsvg from '../../assets/images/sobreOiSUS/funcap.svg';
import Gesadsvg from '../../assets/images/sobreOiSUS/gesad.svg';
import Governosvg from '../../assets/images/sobreOiSUS/governo_ceara.svg';
import Isus from '../../assets/images/sobreOiSUS/isus.svg';
import Sesasvg from '../../assets/images/sobreOiSUS/secretaria_saude.svg';
import Thoughtworkssvg from '../../assets/images/sobreOiSUS/thoughtworks.svg';

export default function AboutScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Sobre o iSUS',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}>
          <Icon name="magnify" size={28} color="#FFF" />
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
          <Icon name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      ),
    });
  }, []);

  function link(text, linkTo) {
    return (
      <Text
        style={{
          marginHorizontal: 20,
          color: '#4CAF50',
          textDecorationLine: 'underline',
        }}
        onPress={() => Linking.openURL(linkTo)}>
        {text}
      </Text>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.viewLogos}>
          <View style={{ width: 130 }}>
            <Isus />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ maxWidth: 200 }}>
            <Text style={styles.tituloSuper}>
              O super app do profissional da saúde
            </Text>
          </View>
        </View>
        <View>
          <Title style={[styles.styleTextDefault, styles.Titleisus]}>
            O que é o iSUS?
          </Title>
          <Text style={styles.spaceRight}>
            O iSUS é um produto digital criado para ser um cinto de utilidades e
            apoiar os profissionais do Sistema Único de Saúde (SUS) no combate
            ao Covid-19, diante de desafios de urgência, emergência e proteção à
            vida.
          </Text>
          <Text style={styles.spaceRight}>
            Desenvolvido em meio à pandemia do novo coronavírus, responde à
            demanda de relacionamento entre usuários, trabalhadores e gestores
            do SUS.
          </Text>
          <Text style={styles.spaceRight}>
            O objetivo é entregar informações, serviços e oportunidades, de
            forma automatizada, personalizada e segura, na palma da mão dos
            profissionais, otimizando seu tempo e apoiando a tomada de decisões
            baseadas em dados e evidências científicas.
          </Text>
          <Title style={[styles.styleTextDefault, styles.Titleisus]}>
            Quem faz?
          </Title>
          <Text style={styles.spaceRight}>
            Iniciativa da{' '}
            {link('Escola de saúde publica', 'https://www.esp.ce.gov.br/')}, com
            apoio da{' '}
            {link(
              'Fundação Cearense de Apoio ao Desenvolvimento Científico e Tecnológico (Funcap)',
              'https://www.funcap.ce.gov.br/',
            )}
            , por meio do projeto {'"SMART Health"'}, desenvolvido em parceria
            com o{' '}
            {link(
              'Grupo de Engenharia de Software Adaptativo e Distribuído (GESAD)',
              'https://http://www.uece.br/gesad/',
            )}{' '}
            da{' '}
            {link(
              'Universidade Estadual do Ceará (UECE)',
              'http://www.uece.br/',
            )}
          </Text>
          <Text style={styles.spaceRight}>
            A criação do aplicativo compõe as ações da{' '}
            {link(
              'Força Tarefa Digital de Combate ao Coronavírus',
              'http://bit.ly/ForcaTarefaAntiCorona',
            )}
            , que estão sendo realizadas de forma aberta para promover a
            inovação e viabilizar a colaboração em rede.
          </Text>
          <Text style={styles.spaceRight}>
            O projeto conta ainda com o apoio da{' '}
            {link('ThoughtWorks', 'https://www.thoughtworks.com/pt')},
            consultoria em tecnologia que está apoiando o projeto de forma
            voluntária, como parte de seu enfrentamento à pandemia.
          </Text>
          <Title style={[styles.styleTextDefault, styles.Titleisus]}>
            Colabore!
          </Title>
          <Text style={styles.spaceRight}>
            Faça parte do time do iSUS acessando o{' '}
            {link(
              'repositório no github',
              'https://github.com/EscolaDeSaudePublica/isus-app',
            )}{' '}
            para ver os códigos fonte, o{' '}
            {link(
              'painel de atividades',
              'https://github.com/orgs/EscolaDeSaudePublica/projects/20',
            )}{' '}
            para acompanhar o processo de desenvolvimento ou fale com a gente
            através do{' '}
            {link('grupo no Telegram', 'https://t.me/grupoanticorona')}
          </Text>
        </View>
        <View style={styles.viewFooterTop}>
          <Text onPress={() => Linking.openURL('http://www.uece.br/gesad/')}>
            <Gesadsvg />
          </Text>
          <Text
            onPress={() => Linking.openURL('http://www.uece.br/')}
            style={{ marginTop: -10 }}>
            <Image source={Uece} />
          </Text>
        </View>
        <View style={styles.viewFooterBottom}>
          <Text
            onPress={() => Linking.openURL('https://www.funcap.ce.gov.br/')}>
            <Funcapsvg />
          </Text>
          <Text
            onPress={() =>
              Linking.openURL('https://www.thoughtworks.com/locations/brasil')
            }
            style={{ marginTop: 20, marginRight: -20 }}>
            <Thoughtworkssvg />
          </Text>
        </View>
        <View style={styles.viewFeliciEsp}>
          <Text
            onPress={() =>
              Linking.openURL(
                'https://escoladesaudepublica.github.io/#FeliciLab',
              )
            }
            style={{ height: 130, alignItems: 'center' }}>
            <Felicilabsvg />
          </Text>
          <Text
            onPress={() => Linking.openURL('https://www.esp.ce.gov.br/')}
            style={{ height: 120 }}>
            <Espsvg />
          </Text>
        </View>
        <View style={styles.viewEstado}>
          <Text
            onPress={() => Linking.openURL('https://www.saude.ce.gov.br/')}
            style={{ height: 60 }}>
            <Sesasvg />
          </Text>
        </View>
        <View style={styles.viewHr}>
          <View style={styles.hrLateral} />
          <View style={styles.hrCentro} />
          <View style={styles.hrLateral} />
        </View>
        <View style={styles.viewEstado2}>
          <View style={{ marginTop: 26 }}>
            <Text
              onPress={() => Linking.openURL('https://www.ceara.gov.br/')}
              style={{ height: 150 }}>
              <Governosvg />
            </Text>
          </View>
        </View>
      </View>
      {/* Fim View container */}
    </ScrollView>
  );
}
// largura do dispositivo
const widthView = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    width: widthView,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 10,
  },
  viewLogos: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 27,
    marginBottom: 30,
  },
  spaceRight: {
    marginTop: 16,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'left',
  },
  styleTextDefault: {
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 23,
    letterSpacing: 0.15,
  },
  Titleisus: {
    marginTop: 25,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 20,
  },
  tituloSuper: {
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.87)',
    minHeight: 46,
    flexWrap: 'wrap',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 23,
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  viewFooterTop: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  viewFooterBottom: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  viewFeliciEsp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.12)',
  },
  viewEstado: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewHr: {
    flexDirection: 'row',
    marginTop: 32,
    justifyContent: 'center',
  },
  hrLateral: { width: '25%', height: 5 },
  hrCentro: {
    width: '50%',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    height: 5,
    borderWidth: 1,
  },
  viewEstado2: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
