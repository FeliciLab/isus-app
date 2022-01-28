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

export default function({ route, navigation }) {
  const { categoria } = route.params;

  const { analyticsData } = useAnalytics();

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
          await pegarConteudoDaApi();
        } catch (err) {
          if (err.message === 'Network Error') {
            alterarSemConexao(true);
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
    alterarPostagens(resposta);
  };

  const pegarConteudoDaApi = async () => {
    const resposta = await pegarProjetosPorCategoria(categoria.term_id);
    const postagensBaixadas = await pegarPostagensBaixadas(resposta.data.data);
    const postagensAtualizadas = marcarPostagensBaixadas(
      resposta.data.data,
      postagensBaixadas,
    );
    alterarPostagens(postagensAtualizadas);
    alterarSemConexao(false);
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

  return (
    <ListaPostagens
      showsVerticalScrollIndicator={false}
      data={postagens}
      numColumns={2}
      keyExtractor={item => item.id}
      ListEmptyComponent={ListaPostagemVazia}
      renderItem={({ item }) => (
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
      )}
    />
  );
}

const estilos = StyleSheet.create({
  imagemPostagem: {
    height: 110,
    width: Dimensions.get('window').width / 2.2,
  },
});
