import React from 'react';
import {
  ImageBackground, View, Text, Image, StatusBar, SafeAreaView, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import bemVindo from '../../assets/images/bemVindo.png';
import minhaSaude from '../../assets/images/minhaSaude.png';
import educacao from '../../assets/images/educacao.png';
import pesquisa from '../../assets/images/pesquisa.png';
import diagnostico from '../../assets/images/diagnostico.png';
import manejoClinico from '../../assets/images/manejoClinico.png';
import tutorialbackground from '../../assets/backgrounds/tutorialbackground.png';

export default function Welcome() {
  const navigation = useNavigation();

  const data = [
    {
      key: 'slide-1',
      title: 'Bem-vindo ao iSUS',
      description: 'Encontre informações, serviços e oportunidades para otimizar seu tempo e apoiar suas decisões',
      img: bemVindo
    },
    {
      key: 'slide-2',
      title: 'Minha Saúde',
      description: 'Orientações sobre autocuidado, autoproteção e como preservar sua saúde física e mental',
      img: minhaSaude
    },
    {
      key: 'slide-3',
      title: 'Educação',
      description: 'Guias, palestras, webconferências e outros conteúdos de educação em saúde',
      img: educacao
    },
    {
      key: 'slide-4',
      title: 'Pesquisa',
      description: 'Artigos, ensaios clínicos e outras atualizações no campo da pesquisa e produção de conhecimento',
      img: pesquisa
    },
    {
      key: 'slide-5',
      title: 'Manejo Clínico',
      description: 'Conheça as diversas etapas e instrumentos de avaliação no tratamento dos pacientes com Covid-19.',
      img: manejoClinico
    },
    {
      key: 'slide-6',
      title: 'Apoio ao Diagnóstico',
      description: 'Ferramentas e canais para apoio ao diagnóstico de pacientes.',
      img: diagnostico
    }
  ];

  const renderItem = ({ item }) => (
    <View style={style.descriptionView}>
      <Image style={{ alignSelf: 'center' }} source={item.img} />
      <Text style={style.descriptionTitle}>{item.title}</Text>
      <Text style={style.descriptionText}>{item.description}</Text>
    </View>
  );

  const renderNextButton = () => (
    <View>
      <Entypo name="chevron-small-right" size={40} color="#FFFFFF" />
    </View>
  );

  async function moveToHome() {
    try {
      await AsyncStorage.setItem('@show-tutorial', 'false');
      return navigation.reset({
        index: 0,
        routes: [{ name: 'App' }]
      });
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  return (
    <>
      <ImageBackground
        source={tutorialbackground}
        style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
      >
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row-reverse', top: 60, right: 40 }}>
          <TouchableOpacity
            onPress={moveToHome}
          >
            <Text style={style.skipTutorial}>
              Pular Tutorial
            </Text>
          </TouchableOpacity>
        </View>
          <AppIntroSlider
            KeyExtractor={item => item.key}
            renderItem={renderItem}
            data={data}
            renderDoneButton={renderNextButton}
            renderNextButton={renderNextButton}
            onSkip={moveToHome}
            onDone={moveToHome}
          />
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const style = StyleSheet.create({
  skipTutorial: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: 0.75,
    textTransform: 'uppercase',
    color: '#F2F2F2',
  },
  descriptionView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  descriptionTitle: {
    color: '#F2F2F2',
    textAlign: 'center',
    fontSize: 34
  },
  descriptionText: {
    alignSelf: 'center',
    maxWidth: 278,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    letterSpacing: 0.5,
    color: '#FFFFFF',
  },
});
