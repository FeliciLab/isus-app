import React from 'react';
import {
  ImageBackground, View, Text, Image, StatusBar, SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AppIntroSlider from 'react-native-app-intro-slider';
import intro1 from '../../assets/images/intro1.png';
import intro2 from '../../assets/images/intro2.png';
import intro3 from '../../assets/images/intro3.png';
import intro4 from '../../assets/images/intro4.png';
import intro5 from '../../assets/images/intro5.png';
import tutorialbackground from '../../assets/backgrounds/tutorialbackground.png';

export default function Welcome() {
  const navigation = useNavigation();

  const data = [
    {
      key: 'slide-1',
      title: 'Bem-vindo ao iSUS',
      description: 'Encontre informações, serviços e oportunidades para otimizar seu tempo e apoiar suas decisões',
      img: intro1
    },
    {
      key: 'slide-3',
      title: 'Minha Saúde',
      description: 'Orientações sobre autocuidado, autoproteção e como preservar sua saúde física e mental',
      img: intro3
    },
    {
      key: 'slide-4',
      title: 'Educação',
      description: 'Guias, palestras, webconferências e outros conteúdos de educação em saúde',
      img: intro4
    },
    {
      key: 'slide-5',
      title: 'Pesquisa',
      description: 'Artigos, ensaios clínicos e outras atualizações no campo da pesquisa e produção de conhecimento',
      img: intro5
    },
    {
      key: 'slide-2',
      title: 'SUSi',
      description: 'Conheça nossa assistente digital e saiba como ela pode te ajudar a ter respostas para suas dúvidas, críticas e sugestões sobre o Sistema Único de Saúde',
      img: intro2
    }
  ];

  const renderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center'
      }}
    >
      <Image style={{ alignSelf: 'center' }} source={item.img} />
      <Text style={{ color: '#F2F2F2', textAlign: 'center', fontSize: 34 }}>{item.title}</Text>
      <Text
        style={{
          alignSelf: 'center',
          color: '#FFFFFF',
          textAlign: 'center',
          fontSize: 18,
          maxWidth: 278
        }}
      >
        {item.description}
      </Text>
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
          <AppIntroSlider
            KeyExtractor={item => item.key}
            renderItem={renderItem}
            data={data}
            showSkipButton
            skipLabel="Pular Tutorial"
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
