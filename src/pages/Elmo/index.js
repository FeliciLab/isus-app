import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { pegarProjetosPorCategoria } from '~/apis/apiHome';
import elmoPatternBG from '~/assets/backgrounds/elmo_pattern.png';
import SvgCapacitacao from '~/assets/icons/elmo/icon_capacitacao.svg';
import SvgFaleConosco from '~/assets/icons/elmo/icon_fale_conosco.svg';
import SvgManualUso from '~/assets/icons/elmo/icon_manual_uso.svg';
import SvgElmoLogo from '~/assets/icons/logo/logo-elmo-h1.svg';
import BarraDeStatus from '~/components/barraDeStatus';
import ServiceButton from '~/components/ServiceButton/index';
import { CORES } from '~/constantes/estiloBase';
import features from '~/constantes/features';
import ROTAS from '~/constantes/rotas';
import estaAtiva from '~/utils/estaAtiva';
import CardNewsElmo from './CardNewsElmo';
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
  TituloH6,
} from './styles';

function Elmo() {
  const navigation = useNavigation();

  const netInfo = useNetInfo();

  const [conteudos, setConteudos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const aoIniciar = async () => {
    setIsLoading(true);
    let vetorTemp = [];

    try {
      const resposta = await pegarProjetosPorCategoria(100744);

      setConteudos(resposta.data.data);

      vetorTemp = resposta.data.data;

      setIsLoading(false);

      const categoriasProjetos = await pegarProjetosPorCategoria(2004);

      setConteudos([...vetorTemp, ...categoriasProjetos.data.data]);
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
          <Icon name="arrow-left" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const listaElmoCards = [
    {
      id: 'elmo-capacitacao',
      titulo: 'Capacitação',
      ativo: true,
      icone: SvgCapacitacao,
      navegacao: {
        componente: ROTAS.CAPACITACAO_ELMO,
        titulo: 'Elmo',
        background: CORES.INDIGO_DYE,
      },
    },
    {
      id: 'elmo-manual-uso',
      titulo: 'Manual de Uso',
      ativo: true,
      icone: SvgManualUso,
      navegacao: {
        componente: 'browser',
        url:
          'https://sus.ce.gov.br/elmo/wp-content/uploads/sites/2/2021/01/Manual_Elmo_1.1_JAN2021.pdf',
      },
    },
    {
      id: 'elmo-fale-conosco',
      titulo: 'Fale Conosco',
      ativo: true,
      icone: SvgFaleConosco,
      navegacao: {
        componente: ROTAS.DUVIDAS_ELMO,
      },
    },
  ];

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
          renderItem={({ item }) => <CardNewsElmo post={item} />}
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

  const handleOnPressCartoHome = item => {
    // analyticsData(item.id, 'Click', 'Elmo');
    if (item.navegacao.net && !netInfo.isConnected) {
      navigation.navigate(ROTAS.SEM_CONEXAO);
      return;
    }

    if (item.navegacao.componente === 'browser') {
      Linking.openURL(item.navegacao.url);
      return;
    }

    navigation.navigate(item.navegacao.componente, {
      title: item.navegacao.titulo,
      url: item.navegacao.url,
      headerStyle: {
        backgroundColor: item.navegacao.background,
      },
    });
  };

  return (
    <>
      <BarraDeStatus
        backgroundColor={CORES.INDIGO_DYE}
        barStyle="light-content"
      />
      <ScrollView style={{ flex: 1 }}>
        <BackgroundImage source={elmoPatternBG}>
          <SvgView>
            <SvgElmoLogo />
          </SvgView>
        </BackgroundImage>
        <Container>
          <Texto>
            O Elmo é um capacete de respiração assistida genuinamente cearense,
            não-invasivo e mais seguro para profissionais de saúde e pacientes.
            Criado em abril de 2020, o equipamento surgiu como um novo passo
            para o tratamento de pacientes com insuficiência respiratória aguda
            hipoxêmica, um dos efeitos da Covid-19.
          </Texto>
        </Container>
        <BotaoLink
          color={CORES.LARANJA}
          onPress={() => navigation.navigate(ROTAS.SOBRE_ELMO)}>
          Saiba Mais
        </BotaoLink>
        {estaAtiva(features.LISTA_CARDS) ? (
          <ListaCardsElmo />
        ) : (
          <FlatList
            horizontal
            data={listaElmoCards}
            keyExtractor={(items, index) => `${index}`}
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ServiceButton
                testID={`cards-${item.id}`}
                key={item.id}
                ativo={item.ativo}
                titulo={item.titulo}
                Icone={item.icone}
                onPress={() => handleOnPressCartoHome(item)}
              />
            )}
          />
        )}
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
    </>
  );
}

export default Elmo;
