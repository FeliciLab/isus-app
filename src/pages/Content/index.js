import React, { useCallback } from 'react';
import {
  View, FlatList, Image, Dimensions, TouchableOpacity
} from 'react-native';
import { Caption } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getProjetosPorCategoria } from '../../apis/apiHome';
import { pegarDadosDeChavesCom, pegarDados } from '../../services/armazenamento';

export default function InformationScreen(props) {
  const navigation = useNavigation();
  const { route } = props;
  const { params } = route;
  const [postagens, alterarPostagens] = React.useState([]);

  useFocusEffect(
    useCallback(() => {
      async function pegarConteudo() {
        try {
          await pegarConteudoDaApi();
        } catch (err) {
          if (err.message === 'Network Error') await pegarConteudoDoStorage();
        }
      }
      pegarConteudo();
    }, [props])
  );

  const pegarConteudoDoStorage = async () => {
    const resposta = await pegarDadosDeChavesCom(`@categoria_${params.term_id}`);
    alterarPostagens(resposta);
  };

  const pegarConteudoDaApi = async () => {
    const resposta = await getProjetosPorCategoria(params.term_id);
    const postagensBaixadas = await pegarPostagensBaixadas(resposta.data.data);
    const postagensAtualizadas = marcarPostagensBaixadas(resposta.data.data, postagensBaixadas);
    alterarPostagens(postagensAtualizadas);
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

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={postagens}
      numColumns={2}
      keyExtractor={item => item.id}
      style={{ flex: 1, alignSelf: 'center' }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            height: 200,
            width: Dimensions.get('window').width / 2.2,
            alignItems: 'center',
            margin: 5
          }}
          onPress={() => navigation.navigate('Descrição', { object: { ...item, categoria_id: params.term_id }, title: params.title_description })}
        >
          <Image
            style={{ height: 110, width: Dimensions.get('window').width / 2.2 }}
            source={{ uri: `${item.image}` }}
            // resizeMode="contain"
          />
          <View style={{ marginHorizontal: 15 }}>
            <Caption numberOfLines={3}>{item.post_title}</Caption>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
