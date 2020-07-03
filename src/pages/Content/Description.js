import React, {
  useState, useCallback, useLayoutEffect
} from 'react';

import {
  // eslint-disable-next-line no-unused-vars
  View, Image, Dimensions, StyleSheet,
  ScrollView, Share, TouchableOpacity
}
  from 'react-native';
import {
  Title, Snackbar
} from 'react-native-paper';
import HTML from 'react-native-render-html';
import 'moment/locale/pt-br';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { salvarDados, pegarDados, removerDados } from '../../services/armazenamento';
import { getProjectPorId } from '../../apis/apiHome';
import BarraInferior from './barraInferior';

export default function DescriptionScreen(props) {
  const navigation = useNavigation();
  const { route } = props;
  const { params } = route;
  const [postagem, alterarPostagem] = useState({});
  const [visivel, alterarVisibilidade] = useState(false);
  const [textoDoFeedback, alterarTextoDoFeedback] = useState('');
  const [conteudoBaixado, alterarConteudoBaixado] = useState(!!params.object.offline);

  useFocusEffect(
    useCallback(() => {
      async function pegarConteudo() {
        if (conteudoBaixado) {
          await pegarConteudoDoStorage();
        } else {
          await pegarConteudoDaApi();
        }
      }
      pegarConteudo();
    }, [props])
  );

  const pegarConteudoDoStorage = async () => {
    try {
      const resposta = await pegarDados(`@categoria_${params.object.categoria_id}_postagem_${params.object.id}`);
      alterarPostagem(resposta);
    } catch (err) {
      console.log(err);
    }
  };

  const pegarConteudoDaApi = async () => {
    try {
      const resposta = await getProjectPorId(params.object.id);
      alterarPostagem(resposta.data);
    } catch (err) {
      console.log(err);
    }
  };

  const aoCompartilhar = async () => {
    const messagTitle = postagem.post_title;
    const messagLink = ' -iSUS: https://coronavirus.ceara.gov.br/project/'.concat(postagem.slug);
    try {
      await Share.share({
        message: messagTitle + messagLink
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const aoClicarEmBaixar = () => {
    if (!conteudoBaixado) {
      baixarConteudo();
    } else {
      removerConteudo();
    }
  };

  const baixarConteudo = async () => {
    try {
      await salvarDados(`@categoria_${params.object.categoria_id}_postagem_${params.object.id}`, { ...postagem, categoria_id: params.object.categoria_id, offline: true });
      alterarConteudoBaixado(true);
      mostrarFeedback(`A página foi salva offline em "${params.title}"`);
    } catch (e) {
      console.log(e);
    }
  };

  const removerConteudo = async () => {
    try {
      await removerDados(`@categoria_${params.object.categoria_id}_postagem_${params.object.id}`);
      alterarConteudoBaixado(false);
      mostrarFeedback('A página foi excluida da leitura offline');
    } catch (e) {
      console.log(e);
    }
  };

  const mostrarFeedback = (texto) => {
    alterarTextoDoFeedback(texto);
    alterarVisibilidade(true);
    setTimeout(() => {
      alterarVisibilidade(false);
    }, 3000);
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: '#FFF',
      headerTitle: route.params.title,
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity
          style={styles.searchHeaderBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  return (
    <>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View>
            <Title style={styles.textTitleDetail}>{postagem.post_title}</Title>
          </View>
          <View style={styles.sub} />
          <Image
            resizeMode="contain"
            style={{
              height: Dimensions.get('window').width / 1.5,
              width: Dimensions.get('window').width
            }}
            source={{ uri: `${postagem.image}` }}
          />
          <View
            style={{
              // height: Dimensions.get('window').width / 1.5,
              width: Dimensions.get('window').width
            }}
          >
            <View style={{
              padding: 10,
              alignContent: 'center'
            }}
            >
              <HTML
                html={postagem.post_content}
                onLinkPress={(event, href) => {
                  navigation.navigate('webview', {
                    title: 'Acesso ao conteúdo',
                    url: href
                  });
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Snackbar
        style={{ marginBottom: 70 }}
        visible={visivel}
      >
        {textoDoFeedback}
      </Snackbar>
      <BarraInferior
        aoClicarEmBaixar={aoClicarEmBaixar}
        aoCompartilhar={aoCompartilhar}
        dataDePostagem={postagem.post_date}
        conteudoBaixado={conteudoBaixado}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    // color: 'rgba(0, 0, 0, 0.6)'
  },
  searchHeaderBack: {
    marginHorizontal: 19
  },
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
    color: '#0000008A'
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
    color: '#EEEEEE'
  }
});
