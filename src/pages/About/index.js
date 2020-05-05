import React, { useState, useEffect } from 'react';
import {
  View, ScrollView, StyleSheet, TouchableOpacity, Text, Image
} from 'react-native';
import {
  Title, Card, Caption, Paragraph
} from 'react-native-paper';
import Uece from '../../assets/images/uece.png';
import Funcap from '../../assets/images/funcap.png';
import Felicilab from '../../assets/images/felicilab.png';
import Esp from '../../assets/images/esp.png';
import Gesad from '../../assets/images/gesad.png';
import Governo from '../../assets/images/governo.png';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


export default function AboutScreen() {
    const navigation = useNavigation();
    const [categorias, setCategorias] = useState([
        {
          name: 'Menu',
          slug: 'Menu',
          term_group: 0,
          term_id: 0
        }
      ]);
      console.tron.log(categorias);
    // async function redirectToWelcome() {
    //     alert('about')
    // }

    // redirectToWelcome();

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
                <Title style={{color:"#fff"}}>Sobre o iSUS</Title>
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
                //justifyContent: 'space-evenly',
                //marginVertical: 20,
                //backgroundColor: '#E5E5E5',
                height: 123,
                marginLeft: 10,
            }}>
                <Text>
                    <Image style={{ alignSelf: 'center' }} source={Gesad} />
                </Text>
                <Text>
                    <Image style={{ alignSelf: 'center' }} source={Uece} />                        
                </Text>
                <Text>
                    <Image style={{ alignSelf: 'center' }} source={Funcap} />
                </Text>
                <Text>
                    <Image style={{ alignSelf: 'center' }} source={Felicilab} />
                </Text>
                <Text>
                    <Image style={{ alignSelf: 'center' }} source={Esp} />
                </Text>                
                <Text>
                    <Image style={{ alignSelf: 'center' }} source={Governo} />
                </Text>
            </View>
            <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: 20
            }}
            >
                <Text style={styles.spaceRight}>
                O iSUS está sendo criado para ser o cinto de utilidades dos Profissionais do Sistema Único de Saúde (SUS) 
                do Ceará. Desenvolvido em meio à pandemia do novo coronavírus, 
                responde à importante demanda de relacionamento entre trabalhadores, usuários e gestores do SUS.
                </Text>
            </View>
            <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: 20
            }}
            >
                <Text style={styles.spaceRight}>
                Com o objetivo de entregar informações, serviços e oportunidades de forma personalizada e 
                segura, o iSUS otimiza o tempo e apoia a tomada de decisões baseadas em dados e evidências 
                científicas na palma da mão dos profissionais.
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginVertical: 20
                }}
            >
                <Text style={styles.spaceRight}>
                O projeto é uma das ações da Força Tarefa Digital de Combate ao Coronavírus, iniciativa do 
                Núcleo de Inovação Tecnológica (NIT) da Escola de Saúde Pública do Ceará (ESP), e conta com 
                apoio da Fundação Cearense de Apoio ao Desenvolvimento Científico e Tecnológico (Funcap), por 
                meio do projeto "SMART Health: suporte à tomada de decisão inteligente de profissionais da 
                saúde e gestores no combate à transmissão da Covid-19 no Ceará", desenvolvido em parceria com 
                o Grupo de Engenharia de Software Adaptativo e Distribuído
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
  })