import React from 'react';
import {
  View, Text, Image, StatusBar, SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AppIntroSlider from 'react-native-app-intro-slider';
import intro1 from '../../assets/images/intro1.png';
import intro2 from '../../assets/images/intro2.png';
import intro3 from '../../assets/images/intro3.png';
import intro4 from '../../assets/images/intro4.png';
import intro5 from '../../assets/images/intro5.png';

export default function Welcome() {
  const navigation = useNavigation();

  const data = [
    {
      key: 1,
      title: 'Slogan do App',
      description: 'Texto explicando o objetivo do aplicativo em geral e seu valor pro usuário',
      img: intro1
    },
    {
      key: 2,
      title: 'SUSi',
      description: 'Texto explicando o que o usuário vai encontrar nessa seção',
      img: intro2
    },
    {
      key: 3,
      title: 'Minha Saúde',
      description: 'Texto explicando o que o usuário vai encontrar nessa seção',
      img: intro3
    },
    {
      key: 4,
      title: 'Educação',
      description: 'Texto explicando o que o usuário vai encontrar nessa seção',
      img: intro4
    },
    {
      key: 5,
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

  const moveToHome = () => navigation.reset({
    index: 0,
    routes: [{ name: 'Home' }]
  });

  return (
    <>
        <StatusBar translucent backgroundColor="transparent" />
        <SafeAreaView style={{ flex: 1 }}>
            <AppIntroSlider
              style={{
                backgroundColor: '#4CAF50'
              }}
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
    </>
  );
}
