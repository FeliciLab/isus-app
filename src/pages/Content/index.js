import React, { useCallback } from 'react';
import {
  View, FlatList, Image, Dimensions, TouchableOpacity
} from 'react-native';
import { Caption } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getProjetosPorCategoria } from '../../apis/apiHome';
import { pegarDadosDeChavesCom } from '../../services/armazenamento';

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
    const postsOffline = resposta.map(post => ({ ...post, offline: true }));
    alterarPostagens(postsOffline);
  };

  const pegarConteudoDaApi = async () => {
    const resposta = await getProjetosPorCategoria(params.term_id);
    alterarPostagens(resposta.data.data);
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
