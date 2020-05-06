/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  View, ScrollView, StyleSheet, TouchableOpacity, Text, Image, Linking
} from 'react-native';
import { Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Uece from '../../assets/images/uece.png';
import Funcap from '../../assets/images/funcap.png';
import Felicilab from '../../assets/images/felicilab.png';
import Esp from '../../assets/images/esp.png';
import Gesad from '../../assets/images/gesad.png';
import Governo from '../../assets/images/governo.png';

export default function AboutScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: '#4CAF50', flex: 1 }}>
      <View style={styles.headerTop}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <Icon name="menu" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Title style={{ color: '#fff' }}>Sobre o iSUS</Title>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ marginHorizontal: 10 }}>
            <Icon name="magnify" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            height: 123,
            marginLeft: 10
          }}
        >
          <Text onPress={() => Linking.openURL('http://www.uece.br/gesad/')}>
            <Image source={Gesad} />
          </Text>
          <Text onPress={() => Linking.openURL('http://www.uece.br/')}>
            <Image source={Uece} />
          </Text>
          <Text onPress={() => Linking.openURL('https://www.funcap.ce.gov.br/')}>
            <Image source={Funcap} />
          </Text>
          <Text
            onPress={() => Linking.openURL('https://escoladesaudepublica.github.io/#FeliciLab')}
          >
            <Image source={Felicilab} />
          </Text>
          <Text onPress={() => Linking.openURL('https://www.esp.ce.gov.br/')}>
            <Image source={Esp} />
          </Text>
          <Text onPress={() => Linking.openURL('https://www.ceara.gov.br/')}>
            <Image source={Governo} />
          </Text>
        </View>
        <View style={styles.textContent}>
          <Text style={styles.spaceRight}>
            O iSUS está sendo criado para ser o cinto de utilidades dos Profissionais do Sistema
            Único de Saúde (SUS) do Ceará. Desenvolvido em meio à pandemia do novo coronavírus,
            responde à importante demanda de relacionamento entre trabalhadores, usuários e gestores
            do SUS.
          </Text>
        </View>
        <View style={styles.textContent}>
          <Text style={styles.spaceRight}>
            Com o objetivo de entregar informações, serviços e oportunidades de forma personalizada
            e segura, o iSUS otimiza o tempo e apoia a tomada de decisões baseadas em dados e
            evidências científicas na palma da mão dos profissionais.
          </Text>
        </View>
        <View style={styles.textContent}>
          <Text style={styles.spaceRight}>
            O projeto é uma das ações da Força Tarefa Digital de Combate ao Coronavírus, iniciativa
            do Núcleo de Inovação Tecnológica (NIT) da Escola de Saúde Pública do Ceará (ESP), e
            conta com apoio da Fundação Cearense de Apoio ao Desenvolvimento Científico e
            Tecnológico (Funcap), por meio do projeto "SMART Health: suporte à tomada de decisão
            inteligente de profissionais da saúde e gestores no combate à transmissão da Covid-19 no
            Ceará", desenvolvido em parceria com o Grupo de Engenharia de Software Adaptativo e
            Distribuído
          </Text>
        </View>
      </ScrollView>
    </View>
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
  textContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20
  },
  spaceRight: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0.25,
    textAlign: 'left'
  }
});
