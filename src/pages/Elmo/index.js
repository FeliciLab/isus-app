import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { sortBy } from 'lodash';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  TouchableOpacity,
  View
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { pegarProjetosPorCategoria } from '~/apis/apiHome';
import elmoPatternBG from '~/assets/backgrounds/elmo_pattern.png';
import SvgElmoLogo from '~/assets/icons/logo/logo-elmo-h1.svg';
import BarraDeStatus from '~/components/BarraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import ROTAS from '~/constantes/rotas';
import { useCardsElmo } from '~/hooks/useCardsElmo';
import { ArrowLeftIcon } from '~/icons';
import CardElmo from './CardElmo';
import { defaultCardsElmo } from './defaultCardsElmo';
import ListaCardsElmo from './ListaCardsElmo';
import {
  BackgroundImage,
  BotaoLink,
  CardSemConteudo,
  Container,
  Hyperlink,
  NovidadesTitle,
  ScrollView,
  SvgView,
  Texto,
  TituloH6
} from './styles';

function Elmo() {
  const navigation = useNavigation();

  const netInfo = useNetInfo();

  const [conteudos, setConteudos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { cardsElmo, fetchCardsElmo } = useCardsElmo();

  const aoIniciar = async () => {
    try {
      setIsLoading(true);

      // CardsElmo
      await fetchCardsElmo();

      // Notícias
      const responseNotasTecnicas = await pegarProjetosPorCategoria(100744);
      const responsePostagens = await pegarProjetosPorCategoria(2004);

      // Ordenando por data em ordem decrescente
      // Ordenação necessária pois estamos unindo os conteúdos
      const projetos = sortBy(
        [...responseNotasTecnicas.data.data, ...responsePostagens.data.data],
        'data',
      ).reverse();

      setConteudos(projetos);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    aoIniciar();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.popToTop();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTransparent: true,
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.popToTop();
          }}>
          <ArrowLeftIcon size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const ListaDeConteudo = () => {
    if (conteudos && conteudos.length > 0) {
      return (
        <FlatList
          horizontal
          data={conteudos.slice(0, 4)}
          keyExtractor={(items, index) => `ListaDeConteudo-${index}`}
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CardElmo post={item} />}
        />
      );
    }
    return (
      <CardSemConteudo>
        <Texto>
          Ainda não temos novidades.{' '}
          <Hyperlink onPress={() => navigation.navigate(ROTAS.FALE_CONOSCO)}>
            Fale Conosco
          </Hyperlink>{' '}
          para sugestão de informações.
        </Texto>
      </CardSemConteudo>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <BarraDeStatus
        backgroundColor={CORES.INDIGO_DYE}
        barStyle="light-content"
      />
      <BackgroundImage source={elmoPatternBG}>
        <SvgView>
          <SvgElmoLogo />
        </SvgView>
      </BackgroundImage>
      <Container>
        <Texto>
          O Elmo é um capacete de respiração assistida genuinamente cearense,
          não-invasivo e mais seguro para profissionais de saúde e pacientes.
          Criado em abril de 2020, o equipamento surgiu como um novo passo para
          o tratamento de pacientes com insuficiência respiratória aguda
          hipoxêmica, um dos efeitos da Covid-19.
        </Texto>
      </Container>
      <BotaoLink
        color={CORES.LARANJA}
        onPress={() => navigation.navigate(ROTAS.SOBRE_ELMO)}>
        Saiba Mais
      </BotaoLink>
      <ListaCardsElmo data={
        netInfo.isConnected
          ? cardsElmo
          : defaultCardsElmo
      } />
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <NovidadesTitle>
          <TituloH6 color={CORES.PRETO54}>Novidades</TituloH6>
          <BotaoLink
            color={CORES.LARANJA}
            marginTop={20}
            onPress={() =>
              navigation.navigate(ROTAS.NOVIDADES_ELMO, { conteudos })
            }>
            Veja Mais
          </BotaoLink>
        </NovidadesTitle>
      </View>
      <View style={{ marginTop: 20, marginBottom: 12 }}>
        {!isLoading ? <ListaDeConteudo /> : <ActivityIndicator />}
      </View>
    </ScrollView>
  );
}

export default Elmo;
