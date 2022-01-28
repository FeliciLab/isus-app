import { useNetInfo } from '@react-native-community/netinfo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import 'moment/locale/pt-br';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Snackbar, Title } from 'react-native-paper';
import HTML from 'react-native-render-html';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { pegarProjetosPorId } from '~/apis/apiHome';
import SetaEsquerda from '~/assets/icons/seta_esquerda.svg';
import BarraDeStatus from '~/components/barraDeStatus';
import BarraInferior from '~/components/barraInferior';
import rotas from '~/constantes/rotas';
import {
  converterImagemParaBase64,
  pegarDados,
  removerDados,
  salvarDados,
} from '~/services/armazenamento';
import formatarDataPorExtenso from '~/utils/dateUtils';
import ImagemDePostagem from './ImagemDePostagem';

export default function DescriptionScreen(props) {
  const navigation = useNavigation();

  const { route } = props;

  const { params } = route;

  const [postagem, setPostagem] = useState({});

  const [visivel, setVisibilidade] = useState(false);

  const [textoDoFeedback, setTextoDoFeedback] = useState('');

  const [conteudoBaixado, setConteudoBaixado] = useState(
    !!params.object.offline,
  );

  const dataDePostagem = postagem.post_date;

  const estaConectado = useNetInfo().isConnected;

  useEffect(() => {
    if (!estaConectado && estaConectado !== null) {
      navigation.navigate(rotas.SEM_CONEXAO);
    }
  }, [estaConectado]);

  useFocusEffect(
    useCallback(() => {
      pegarConteudoDoStorage().catch(() => pegarConteudoDaApi());
    }, []),
  );

  const pegarConteudoDoStorage = async () => {
    try {
      const resposta = await pegarDados(
        `@categoria_${params.object.categoria_id}_postagem_${params.object.id}`,
      );
      setPostagem(resposta);
    } catch (err) {
      console.log(`Erro ao pegar conteudo do storage: ${err.message}`);
    }
  };

  const pegarConteudoDaApi = async () => {
    try {
      const resposta = await pegarProjetosPorId(params.object.id);
      setPostagem(resposta.data);
    } catch (err) {
      console.log(`Erro ao pegar conteudo da API: ${err.message}`);
    }
  };

  const aoCompartilhar = async () => {
    const messagTitle = postagem.post_title;
    const messagLink = ' -iSUS: https://coronavirus.ceara.gov.br/project/'.concat(
      postagem.slug,
    );
    try {
      await Share.share({
        message: messagTitle + messagLink,
      });
    } catch (error) {
      console.log(`Erro ao compartilhar: ${error.message}`);
    }
  };

  const aoClicarEmBaixar = () => {
    if (!conteudoBaixado) {
      baixarConteudo();
    } else {
      removerConteudo();
    }
  };

  const informacaoLateral = () => (
    <>
      <Text style={styles.informacaoLateral}>postado em</Text>
      <Text style={styles.informacaoLateral}>
        {formatarDataPorExtenso(dataDePostagem)}
      </Text>
    </>
  );

  const baixarConteudo = async () => {
    console.log('Baixar Conteudo');
    console.log(params);
    try {
      const imagembase64 = await converterImagemParaBase64(postagem.image);
      const postagemOffline = {
        ...postagem,
        image: imagembase64,
        categoria_id: params.object.categoria_id,
        offline: true,
      };
      await salvarDados(
        `@categoria_${params.object.categoria_id}_postagem_${params.object.id}`,
        postagemOffline,
      );
      setConteudoBaixado(true);
      setPostagem(postagemOffline);
      mostrarFeedback(`A página foi salva offline em "${params.title}"`);
    } catch (e) {
      console.log('Erro de armazenamento:', e.message);
      if (e.message.includes('SQLITE_FULL')) {
        Alert.alert(
          'Não foi possível baixar o conteúdo',
          'Já estamos trabalhando para que você possa ter mais leituras off-line. ' +
            'Acompanhe as próximas versões do iSUS.',
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
        );
      } else {
        mostrarFeedback(
          'Não foi possível realizar o donwload da imagem. Por favor, tente mais tarde.',
        );
      }
    }
  };

  const removerConteudo = async () => {
    try {
      setConteudoBaixado(false);
      mostrarFeedback('A página foi excluida da leitura offline');
      await removerDados(
        `@categoria_${params.object.categoria_id}_postagem_${params.object.id}`,
      );
    } catch (e) {
      mostrarFeedback(
        'Não foi possível realizar a ação, Por favor, tente mais tarde.',
      );
    }
  };

  const mostrarFeedback = texto => {
    setTextoDoFeedback(texto);
    setVisibilidade(true);
    setTimeout(() => {
      setVisibilidade(false);
    }, 3000);
  };

  const baixarPDF = (event, href) => {
    // eslint-disable-next-line no-unused-expressions
    estaConectado
      ? navigation.navigate('webview', {
        title: 'Acesso ao conteúdo',
        url: href,
      })
      : navigation.navigate(rotas.SEM_CONEXAO, {
        componente: 'webview',
        title: 'Acesso ao conteúdo',
        url: href,
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: '#FFF',
      headerTitle: route.params.title,
      headerStyle: {
        backgroundColor: params.cor || '#4CAF50',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity
          style={styles.searchHeaderBack}
          onPress={() => {
            navigation.goBack();
          }}>
          <SetaEsquerda />
          {/* <Icon name="arrow-left" size={28} color="#FFF" /> */}
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeiOS}>
      <BarraDeStatus
        backgroundColor={params.cor}
        barStyle={params.estiloBarra}
      />
      <ScrollView>
        <View style={styles.titulo}>
          <View>
            <Title style={styles.textTitleDetail}>{postagem.post_title}</Title>
          </View>
          <View style={styles.sub} />
          <ImagemDePostagem
            conteudoBaixado={conteudoBaixado}
            imagem={postagem.image}
            estilo={styles.imagemDePostagem}
          />
          <View
            style={{
              // height: Dimensions.get('window').width / 1.5,
              width: Dimensions.get('window').width,
            }}>
            <View style={styles.viewHTML}>
              <HTML html={postagem.post_content} onLinkPress={baixarPDF} />
            </View>
          </View>
        </View>
      </ScrollView>
      <Snackbar style={styles.feedbackMargin} visible={visivel}>
        {textoDoFeedback}
      </Snackbar>
      <BarraInferior
        telaDeOrigem="descricao"
        barraVisivel
        informacaoLateral={informacaoLateral}
        aoClicarEmBaixar={aoClicarEmBaixar}
        aoCompartilhar={aoCompartilhar}
        conteudoBaixado={conteudoBaixado}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  feedbackMargin: {
    marginBottom: Dimensions.get('window').height / 9,
  },
  searchHeaderBack: {
    marginHorizontal: 19,
  },
  informacaoLateral: {
    color: 'rgba(0, 0, 0, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  titulo: { flex: 1, backgroundColor: '#fff' },
  textTitleDetail: {
    marginTop: 24,
    marginLeft: 16,
    marginRight: 16,
    fontWeight: 'normal',
    fontSize: 24,
    lineHeight: 28,
    color: '#00000099',
    fontStyle: 'normal',
  },
  sub: {
    flexDirection: 'row',
    margin: 1,
    justifyContent: 'space-between',
    marginTop: 12,
  },
  textData: {
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#0000008A',
  },
  contentText: {
    marginLeft: 16,
    backgroundColor: 'red',
  },
  subShare: {
    marginRight: 20,
    marginTop: 12,
    marginBottom: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#EEEEEE',
  },
  safeiOS: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  imagemDePostagem: {
    height: Dimensions.get('window').width / 1.5,
    width: Dimensions.get('window').width,
  },
  viewHTML: {
    padding: 10,
    alignContent: 'center',
  },
});
