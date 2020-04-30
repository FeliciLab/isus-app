import React, { useEffect } from 'react';
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
      title: 'Slogan do App',
      description: 'Texto explicando o objetivo do aplicativo em geral e seu valor pro usuário',
      img: intro1
    },
    {
      key: 'slide-2',
      title: 'SUSi',
      description: 'Texto explicando o que o usuário vai encontrar nessa seção',
      img: intro2
    },
    {
      key: 'slide-3',
      title: 'Minha Saúde',
      description: 'Texto explicando o que o usuário vai encontrar nessa seção',
      img: intro3
    },
    {
      key: 'slide-4',
      title: 'Educação',
      description: 'Texto explicando o que o usuário vai encontrar nessa seção',
      img: intro4
    },
    {
      key: 'slide-5',
      title: 'Pesquisa',
      description: 'Texto explicando o que o usuário vai encontrar nessa seção',
      img: intro5
    },
  ];

  const renderItem = ({ item }) => (
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}
        >
            <Image style={{ alignSelf: 'center' }} source={item.img} />
            <Text style={{ color: '#F2F2F2', textAlign: 'center', fontSize: 34 }}>
                {item.title}
            </Text>
            <Text style={{
              alignSelf: 'center', color: '#FFFFFF', textAlign: 'center', fontSize: 18, maxWidth: 278
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

  const moveToHome = async () => {
    try {
      await AsyncStorage.setItem('@show-tutorial', 'false');
      return navigation.reset({
        index: 0,
        routes: [{ name: 'App' }]
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground source={tutorialbackground} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
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
          </ImageBackground>
      </SafeAreaView>
    </>
  );
}
