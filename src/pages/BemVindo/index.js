import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, StatusBar, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import bemVindo from '~/assets/icons/apresentacao/bemVindo.svg';
import cadastroProfissional from '~/assets/icons/apresentacao/cadastroProfissional.svg';
import diagnostico from '~/assets/icons/apresentacao/diagnostico.svg';
import educacao from '~/assets/icons/apresentacao/educacao.svg';
import manejoClinico from '~/assets/icons/apresentacao/manejoClinico.svg';
import pesquisa from '~/assets/icons/apresentacao/pesquisa.svg';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';
import useAnalytics from '~/hooks/useAnalytics';
import useAutenticacao from '~/hooks/useAutenticacao';
import useDialogAppTrack from '~/hooks/useDialogAppTrack';
import tutorialbackground from '~assets/backgrounds/tutorialbackground.png';
import {
  BotaoCadastro,
  Conteudo,
  ConteudoCentral,
  ConteudoDescricao,
  ConteudoImagem,
  ConteudoPularTutorial,
  ConteudoTopo,
  PularTutorial,
  SafeArea,
  TextoDescricao,
  TituloDescricao,
} from './styles';

export default function BemVindo() {
  const navigation = useNavigation();

  const { exibirDialog } = useDialogAppTrack();

  const { analyticsData } = useAnalytics();

  const { setShowTutorial } = useAutenticacao();

  const dataComPerfil = [
    {
      key: 'slide-1',
      title: 'Bem-vindo ao iSUS',
      description:
        'Encontre informações, serviços e oportunidades para otimizar seu tempo e apoiar suas decisões.',
      img: bemVindo,
    },
    {
      key: 'slide-2',
      title: 'Educação',
      description:
        'Guias, palestras, webconferências e outros conteúdos de educação em saúde.',
      img: educacao,
    },
    {
      key: 'slide-3',
      title: 'Pesquisa',
      description:
        'Artigos, ensaios clínicos e outras atualizações no campo da pesquisa e produção de conhecimento.',
      img: pesquisa,
    },
    {
      key: 'slide-4',
      title: 'Manejo Clínico',
      description:
        'Conheça as diversas etapas e instrumentos de avaliação no tratamento dos pacientes com Covid-19.',
      img: manejoClinico,
    },
    {
      key: 'slide-5',
      title: 'Apoio ao Diagnóstico',
      description:
        'Ferramentas e canais para apoio ao diagnóstico de pacientes.',
      img: diagnostico,
    },
    {
      key: 'slide-6',
      title: 'Cadastro de profissional',
      description:
        'Crie seu cadastro para ter uma experiência personalizada para seu perfil de profissional da saúde.',
      img: cadastroProfissional,
      botao: (
        <BotaoCadastro
          labelStyle={{ color: '#4CAF50', fontWeight: '600' }}
          onPress={() => {
            if (exibirDialog('o Cadastro')) {
              return;
            }
            setShowTutorial(false);
            navigation.navigate('LOGIN_WELCOME', { screen: 'LOGIN' });
          }}
          mode="contained">
          {' '}
          Realizar meu cadastro
        </BotaoCadastro>
      ),
    },
  ];

  const renderItem = ({ item }) => (
    <ConteudoDescricao>
      <ConteudoTopo />
      <ConteudoCentral>
        <ConteudoDescricao>
          <ConteudoImagem>
            <item.img
              style={{
                alignSelf: 'center',
                alignItems: 'flex-end',
              }}
            />
          </ConteudoImagem>
          <View>
            <TituloDescricao>{item.title}</TituloDescricao>
          </View>
          <Conteudo>
            <TextoDescricao>{item.description}</TextoDescricao>
          </Conteudo>
        </ConteudoDescricao>
        {item.botao}
      </ConteudoCentral>
      <Conteudo />
    </ConteudoDescricao>
  );

  const renderNextButton = () => (
    <View testID={TESTIDS.BOTAO_TUTORIAL_PROXIMO}>
      <Entypo name="chevron-small-right" size={40} color="#FFFFFF" />
    </View>
  );

  const aoMudarSlide = () => {
    analyticsData(labelsAnalytics.PROXIMO_TUTORIAL, 'Click', 'Tutorial');
  };

  async function moveToHome() {
    try {
      analyticsData(labelsAnalytics.PULAR_TUTORIAL, 'Click', 'Tutorial');

      setShowTutorial(false);

      return navigation.reset({
        index: 0,
        routes: [{ name: 'App' }],
      });
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  return (
    <ImageBackground
      source={tutorialbackground}
      style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <SafeArea>
        <ConteudoPularTutorial>
          <TouchableOpacity
            testID={TESTIDS.BOTAO_TUTORIAL_PULAR}
            onPress={moveToHome}>
            <PularTutorial>Pular Tutorial</PularTutorial>
          </TouchableOpacity>
        </ConteudoPularTutorial>
        <AppIntroSlider
          KeyExtractor={item => item.key}
          renderItem={renderItem}
          data={dataComPerfil}
          renderDoneButton={renderNextButton}
          renderNextButton={renderNextButton}
          onSlideChange={aoMudarSlide}
          onSkip={moveToHome}
          onDone={moveToHome}
        />
      </SafeArea>
    </ImageBackground>
  );
}
