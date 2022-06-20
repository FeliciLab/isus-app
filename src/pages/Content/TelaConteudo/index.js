import { useNetInfo } from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Caption } from 'react-native-paper';
import useAnalytics from '~/hooks/useAnalytics';
import { pegarProjetosPorCategoria } from '~/apis/apiHome';
import rotas from '~/constantes/rotas';
import { pegarDados, pegarDadosDeChavesCom } from '~/services/armazenamento';
import {
  adicionaMascaraAnalytics,
  normalizeEspacoTextoAnalytics,
} from '~/utils/mascaras';
import ImagemDePostagem from '../ImagemDePostagem';
import { ListaPostagemVazia, ListaPostagens, Postagem } from './style';
import PostListSkeletonPlaceholder from '~/components/PostListSkeletonPlaceholder';

const TelaConteudo = ({ route, navigation }) => {
  const { categoria } = route.params;

  const { analyticsData } = useAnalytics();

  const [postagens, setPostagens] = useState([]);

  const [semConexao, setSemConexao] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const { isConnected } = useNetInfo();

  useEffect(() => {
    const press = navigation.addListener('tabPress', () => {
      if (!isConnected && isConnected !== null) {
        navigation.navigate(rotas.SEM_CONEXAO);
      }
    });

    return press;
  }, [navigation, isConnected]);

  useFocusEffect(
    useCallback(() => {
      const title = normalizeEspacoTextoAnalytics(categoria.title_description);
      const slug = adicionaMascaraAnalytics(categoria.slug);
      let analytics = '';
      if (slug === ' ') {
        analytics = title;
      } else {
        analytics = `${title}_${slug}`;
      }

      analyticsData(analytics, 'click', categoria.title_description);

      async function pegarConteudo() {
        try {
          !postagens && setIsLoading(true);
          await pegarConteudoDaApi();
          setIsLoading(false);
        } catch (err) {
          if (err.message === 'Network Error') {
            setSemConexao(true);
            await pegarConteudoDoStorage();
          }
        }
      }

      pegarConteudo();
    }, []),
  );

  const pegarConteudoDoStorage = async () => {
    const resposta = await pegarDadosDeChavesCom(
      `@categoria_${categoria.term_id}`,
    );
    setPostagens(resposta);
  };

  const pegarConteudoDaApi = async () => {
    const resposta = await pegarProjetosPorCategoria(categoria.term_id);
    const postagensBaixadas = await pegarPostagensBaixadas(resposta.data.data);
    const postagensAtualizadas = marcarPostagensBaixadas(
      resposta.data.data,
      postagensBaixadas,
    );
    setPostagens(postagensAtualizadas);
    setSemConexao(false);
  };

  const pegarPostagensBaixadas = async posts => {
    const postagensBuscadas = posts.map(postagem =>
      pegarDados(`@categoria_${categoria.term_id}_postagem_${postagem.id}`),
    );
    const postagensEncontradas = await Promise.all(postagensBuscadas);
    return postagensEncontradas.filter(postagem => !!postagem);
  };

  const marcarPostagensBaixadas = (posts, postsBaixados) => {
    const idsOffline = postsBaixados.map(post => post.id);

    posts.forEach((post, index) => {
      const idx = idsOffline.indexOf(post.id);
      if (idx !== -1) posts.splice(index, 1, { ...post, offline: true });
    });

    return posts;
  };

  const PostagemItem = ({ item }) => (
    <Postagem
      onPress={() =>
        navigation.navigate(rotas.DESCRICAO, {
          parametros: {
            ...item,
            categoria_id: categoria.term_id,
          },
          title: categoria.title_description,
        })
      }>
      <ImagemDePostagem
        conteudoBaixado={semConexao}
        imagem={item.image}
        estilo={estilos.imagemPostagem}
      />
      <View style={{ marginHorizontal: 15 }}>
        <Caption numberOfLines={3}>{item.post_title}</Caption>
      </View>
    </Postagem>
  );

  return (
    <>
      {isLoading && <PostListSkeletonPlaceholder />}

      <ListaPostagens
        showsVerticalScrollIndicator={false}
        data={postagens}
        numColumns={2}
        keyExtractor={item => item.id}
        ListEmptyComponent={ListaPostagemVazia}
        renderItem={({ item }) => <PostagemItem item={item} />
        }
      />

    </>
  );
};

export default TelaConteudo;

const estilos = StyleSheet.create({
  imagemPostagem: {
    height: 110,
    width: Dimensions.get('window').width / 2.2,
  },
});
