import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  TouchableOpacity, View, FlatList, Linking, BackHandler
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import elmoPatternBG from '../../assets/backgrounds/elmo_pattern.png';
import SvgElmoLogo from '../../assets/icons/logo/logo-elmo-h1.svg';
import SvgCapacitacao from '../../assets/icons/elmo/icon_capacitacao.svg';
import SvgManualUso from '../../assets/icons/elmo/icon_manual_uso.svg';
import SvgFaleConosco from '../../assets/icons/elmo/icon_fale_conosco.svg';

import BarraDeStatus from '../../components/barraDeStatus';
import CartaoHome from '../Home/cartaoHome';
import {
  ScrollView,
  Texto,
  SvgView,
  BackgroundImage,
  Container,
  BotaoLink,
  Hyperlink,
  CardSemConteudo,
  TituloH6
} from './styles';
import { CORES } from '../../constantes/estiloBase';
import ROTAS from '../../constantes/rotas';
import CartaoDeConteudo from '../Home/MeusConteudos/CartaoDeConteudo';
import { pegarProjetosPorCategoria } from '../../apis/apiHome';
// import { analyticsData } from '../../utils/analytics';

function Elmo() {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [conteudos, alterarConteudos] = useState([]);
  const [carregados, alterarCarregamento] = useState(false);

  const aoIniciar = async () => {
    alterarCarregamento(true);
    let vetorTemp = [];
    try {
      const resposta = await pegarProjetosPorCategoria(100744);

      alterarConteudos(resposta.data.data);
      vetorTemp = resposta.data.data;
      alterarCarregamento(false);

      const categoriasProjetos = await pegarProjetosPorCategoria(2004);

      alterarConteudos([...vetorTemp, ...categoriasProjetos.data.data]);
    } catch (err) {
      console.log(err);
    } finally {
      alterarCarregamento(false);
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
      backAction
    );
    return () => {
      backHandler.remove();
    };
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      },
      headerTransparent: true,
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.popToTop();
          }}
        >
          <Icon name="arrow-left" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      )
    });
  });

  const listaElmoCards = [
    {
      id: 'elmo-capacitacao',
      titulo: 'Capacitação',
      ativo: true,
      icone: SvgCapacitacao,
      navegacao: {
        componente: ROTAS.CAPACITACAO_ELMO,
        titulo: 'Elmo',
        background: CORES.INDIGO_DYE
      }
    },
    {
      id: 'elmo-manual-uso',
      titulo: 'Manual de Uso',
      ativo: true,
      icone: SvgManualUso,
      navegacao: {
        componente: 'browser',
        url: 'https://sus.ce.gov.br/elmo/wp-content/uploads/sites/2/2021/01/Manual_Elmo_1.1_JAN2021.pdf'
      }
    },
    {
      id: 'elmo-fale-conosco',
      titulo: 'Fale Conosco',
      ativo: true,
      icone: SvgFaleConosco,
      navegacao: {
        componente: ROTAS.DUVIDAS_ELMO,
      }
    }
  ];

  const ListaDeConteudo = () => {
    if (conteudos && conteudos.length > 0) {
      return (
        <FlatList
          horizontal
          data={conteudos.slice(0, 4)}
          keyExtractor={(items, index) => `${index}`}
          style={{
            flexDirection: 'row',
            alignSelf: 'center'
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={conteudo => (
            <CartaoDeConteudo conteudo={conteudo} cor={CORES.INDIGO_DYE} estiloBarra="dark-white" />
          )}
        />
      );
    }
    return (
      <CardSemConteudo>
        <Texto>
          Ainda não temos novidades.
          {' '}
          <Hyperlink
            onPress={
              () => navigation.navigate(ROTAS.FALE_CONOSCO)
            }
          >
            Fale Conosco
          </Hyperlink>
          {' '}
          para sugestão de informações.
        </Texto>
      </CardSemConteudo>
    );
  };

  const onPress = (item) => {
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
        backgroundColor: item.navegacao.background
      },
    });
  };

  return (
    <>
      <BarraDeStatus backgroundColor={CORES.INDIGO_DYE} barStyle="light-content" />
      <ScrollView style={{ flex: 1 }}>
        <BackgroundImage source={elmoPatternBG}>
          <SvgView>
            <SvgElmoLogo />
          </SvgView>
        </BackgroundImage>
        <Container>
          <Texto>
            {'O Elmo é um capacete de respiração assistida genuinamente cearense, não-invasivo e mais seguro para profissionais de saúde e pacientes. Criado em abril de 2020, o equipamento surgiu como um novo passo para o tratamento de pacientes com insuficiência respiratória aguda hipoxêmica, um dos efeitos da Covid-19.'}
          </Texto>
        </Container>
        <BotaoLink
          color={CORES.LARANJA}
          marginTop={12}
          onPress={() => navigation.navigate(ROTAS.SOBRE_ELMO)}
        >
          Saiba Mais
        </BotaoLink>
        <FlatList
          horizontal
          data={listaElmoCards}
          keyExtractor={(items, index) => `${index}`}
          style={{
            flexDirection: 'row',
            alignSelf: 'center'
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CartaoHome
              testID={`cards-${item.id}`}
              key={item.id}
              ativo={item.ativo}
              titulo={item.titulo}
              Icone={item.icone}
              onPress={() => onPress(item)}
            />
          )}
        />
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
          <TituloH6> Novidades </TituloH6>
          <BotaoLink
            color={CORES.LARANJA}
            marginTop={20}
            onPress={() => navigation.navigate(ROTAS.NOVIDADES_ELMO, { conteudos })}
          >
            Veja Mais
          </BotaoLink>
        </View>
        <View style={{ marginTop: 20, marginBottom: 12 }}>
          {!carregados ? <ListaDeConteudo /> : <ActivityIndicator />}
        </View>
      </ScrollView>
    </>
  );
}

export default Elmo;
