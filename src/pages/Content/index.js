import React, { useCallback, useState, useEffect } from 'react';
import {
  View, FlatList, Dimensions, TouchableOpacity, Text, StyleSheet
} from 'react-native';
import { Caption } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';

import { pegarProjetosPorCategoria } from '../../apis/apiHome';
import { pegarDadosDeChavesCom, pegarDados } from '../../services/armazenamento';
import ImagemDePostagem from './ImagemDePostagem';
import useAnalytics from '../../hooks/Analytics';
import { normalizeEspacoTextoAnalytics, adicionaMascaraAnalytics } from '../../utils/mascaras';
import rotas from '../../constantes/rotas';

export default function InformationScreen(props) {
  const { analyticsData } = useAnalytics();
  const { navigation } = props;
  const { route } = props;
  const { params } = route;
  const [postagens, alterarPostagens] = useState([]);
  const [semConexao, alterarSemConexao] = useState(false);
  const estaConectado = useNetInfo().isConnected;

  useEffect(() => {
    const press = navigation.addListener('tabPress', () => {
      if (!estaConectado && estaConectado !== null) {
        navigation.navigate(rotas.SEM_CONEXAO);
      }
    });
    return press;
  }, [navigation, estaConectado]);

  useFocusEffect(
    useCallback(() => {
      const title = normalizeEspacoTextoAnalytics(params.title_description);
      const slug = adicionaMascaraAnalytics(params.slug);
      let analytics = '';
      if (slug === ' ') {
        analytics = title;
      } else {
        analytics = `${title}_${slug}`;
      }
      analyticsData(
        analytics,
        'click',
        params.title_description
      );

      pegarConteudoDaApi()
        .catch(() => pegarConteudoDoStorage());
    }, [])
  );

  const pegarConteudoDoStorage = async () => {
    const resposta = await pegarDadosDeChavesCom(`@categoria_${params.term_id}`);
    alterarPostagens(resposta);
  };

  const pegarConteudoDaApi = async () => {
    const resposta = await pegarProjetosPorCategoria(params.term_id);
    const postagensBaixadas = await pegarPostagensBaixadas(resposta.data.data);
    const postagensAtualizadas = marcarPostagensBaixadas(resposta.data.data, postagensBaixadas);
    alterarPostagens(postagensAtualizadas);
    alterarSemConexao(false);
  };

  const pegarPostagensBaixadas = async (posts) => {
    const postagensBuscadas = posts.map(postagem => pegarDados(`@categoria_${params.term_id}_postagem_${postagem.id}`));
    const postagensEncontradas = await Promise.all(postagensBuscadas);
    return postagensEncontradas.filter(postagem => (!!postagem));
  };

  const marcarPostagensBaixadas = (posts, postsBaixados) => {
    const idsOffline = postsBaixados.map(post => post.id);

    posts.forEach((post, index) => {
      const idx = idsOffline.indexOf(post.id);
      if (idx !== -1) posts.splice(index, 1, { ...post, offline: true });
    });

    return posts;
  };

  const semPostagem = () => (
    <View style={estilos.centralizarTexto}>
      <Text style={estilos.textoSemPostagem}>Não há postagens salvas no seu dispositivo.</Text>
    </View>
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={postagens}
      numColumns={2}
      keyExtractor={item => item.id}
      style={estilos.flatList}
      ListEmptyComponent={semPostagem}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={estilos.postagem}
          onPress={() => navigation.navigate('Descrição', {
            object: {
              ...item,
              categoria_id: params.term_id
            },
            title: params.title_description
          })}
        >
          <ImagemDePostagem
            conteudoBaixado={semConexao}
            imagem={item.image}
            estilo={estilos.imagemPostagem}
          />
          <View style={{ marginHorizontal: 15 }}>
            <Caption numberOfLines={3}>{item.post_title}</Caption>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const estilos = StyleSheet.create({
  centralizarTexto: {
    justifyContent: 'center', width: '100%'
  },
  textoSemPostagem: {
    color: 'rgba(0,0,0,0.6)', marginTop: 20
  },
  flatList: {
    flex: 1, alignSelf: 'center'
  },
  postagem: {
    height: 200,
    width: Dimensions.get('window').width / 2.2,
    alignItems: 'center',
    margin: 5
  },
  imagemPostagem: {
    height: 110, width: Dimensions.get('window').width / 2.2
  }
});
