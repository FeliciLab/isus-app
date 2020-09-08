import React from 'react';
import {
  ImageBackground, View, Text, Image, StatusBar, SafeAreaView, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { Feature } from '@paralleldrive/react-feature-toggles';
import bemVindo from '../../assets/images/bemVindo.png';
import cadastroProfissional from '../../assets/images/cadastro-profissional.png';
import educacao from '../../assets/images/educacao.png';
import pesquisa from '../../assets/images/pesquisa.png';
import minhaSaude from '../../assets/images/minhasaude.png';
import diagnostico from '../../assets/images/diagnostico.png';
import manejoClinico from '../../assets/images/manejoClinico.png';
import tutorialbackground from '../../assets/backgrounds/tutorialbackground.png';

export default function Welcome() {
  const navigation = useNavigation();

  const dataSemPerfil = [
    {
      key: 'slide-1',
      title: 'Bem-vindo ao iSUS',
      description: 'Encontre informações, serviços e oportunidades para otimizar seu tempo e apoiar suas decisõess',
      img: bemVindo
    },
    {
      key: 'slide-2',
      title: 'Minha saúde',
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

  const dataComPerfil = [
    {
      key: 'slide-1',
      title: 'Bem-vindo ao iSUS',
      description: 'Encontre informações, serviços e oportunidades para otimizar seu tempo e apoiar suas decisõess',
      img: bemVindo
    },
    {
      key: 'slide-2',
      title: 'Educação',
      description: 'Guias, palestras, webconferências e outros conteúdos de educação em saúde',
      img: educacao
    },
    {
      key: 'slide-3',
      title: 'Pesquisa',
      description: 'Artigos, ensaios clínicos e outras atualizações no campo da pesquisa e produção de conhecimento',
      img: pesquisa
    },
    {
      key: 'slide-4',
      title: 'Manejo Clínico',
      description: 'Conheça as diversas etapas e instrumentos de avaliação no tratamento dos pacientes com Covid-19.',
      img: manejoClinico
    },
    {
      key: 'slide-5',
      title: 'Apoio ao Diagnóstico',
      description: 'Ferramentas e canais para apoio ao diagnóstico de pacientes.',
      img: diagnostico
    },
    {
      key: 'slide-6',
      title: 'Cadastro de profissional',
      description: 'Crie seu cadastro para ter uma experiência personalizada para seu perfil de profissional da saúde',
      img: cadastroProfissional,
      botao:
        <Button
          labelStyle={{ color: '#4CAF50', fontWeight: '600' }}
          style={{ ...style.botao, backgroundColor: '#ffffff' }}
          onPress={() => {
            AsyncStorage.setItem('@show-tutorial', 'false');
            console.log('navigation welcome', navigation);
            navigation.navigate('LOGIN', { screen: 'ID SAÚDE' });
          }
          }
          mode="contained"
        >
          {' '}
          Realizar meu cadastro
        </Button>
    }
  ];

  const renderItem = ({ item }) => (
    <View style={style.descriptionView}>
      <View style={style.viewTop} />
      <View style={style.viewCenter}>
        <View style={style.descriptionView}>
          <View style={style.viewImg}>
            <Image
              style={{
                alignSelf: 'center',
                alignItems: 'flex-end',
              }}
              source={item.img}
            />
          </View>
          <View>
            <Text style={style.descriptionTitle}>{item.title}</Text>
          </View>
          <View style={style.viewContent}>
            <Text style={style.descriptionText}>{item.description}</Text>
          </View>
        </View>
        {item.botao}
      </View>
      <View style={style.viewFooter} />
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
      <ImageBackground
        source={tutorialbackground}
        style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
      >
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ marginTop: 60, right: 40, flexDirection: 'row-reverse' }}>
              <TouchableOpacity onPress={moveToHome}>
                <Text style={style.skipTutorial}>
                  Pular Tutorial
                </Text>
              </TouchableOpacity>
          </View>
          <Feature
            name="134"
            activeComponent={() => (
              <AppIntroSlider
                KeyExtractor={item => item.key}
                renderItem={renderItem}
                data={dataComPerfil}
                renderDoneButton={renderNextButton}
                renderNextButton={renderNextButton}
                onSkip={moveToHome}
                onDone={moveToHome}
              />
            )}
            inactiveComponent={() => (
              <AppIntroSlider
                KeyExtractor={item => item.key}
                renderItem={renderItem}
                data={dataSemPerfil}
                renderDoneButton={renderNextButton}
                renderNextButton={renderNextButton}
                onSkip={moveToHome}
                onDone={moveToHome}
              />
            )}
          />
        </SafeAreaView>
      </ImageBackground>
  );
}

const style = StyleSheet.create({
  viewTop: {
    backgroundColor: '#000',
  },
  viewCenter: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  viewFooter: {
    flex: 1,
  },
  viewImg: {
    flex: 2,
    alignItems: 'flex-end',
    flexDirection: 'column-reverse',
    marginBottom: 5
  },
  viewContent: {
    flex: 1,
  },
  skipTutorial: {
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
    justifyContent: 'center',
  },
  descriptionTitle: {
    color: '#F2F2F2',
    textAlign: 'center',
    fontSize: 34
  },
  descriptionText: {
    alignSelf: 'center',
    maxWidth: 278,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    letterSpacing: 0.5,
    color: '#FFFFFF',
  },
  botao: {
    borderRadius: 200,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingTop: 5,
    paddingLeft: 22,
    paddingRight: 22,
    paddingBottom: 5
  }
});
