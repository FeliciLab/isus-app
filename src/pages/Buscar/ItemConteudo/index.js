import { useNavigation } from '@react-navigation/native';
import React from 'react';
import rotas from '~/constantes/rotas';
import {
  ImagePost,
  PostTitle,
  ViewImg,
  Container,
  PostDate,
  LeftContent,
} from './styles';
import moment from 'moment';

// moment(post.data).format('DD/MM/YYYY')

const ItemConteudo = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Container
      onPress={() =>
        navigation.navigate(rotas.DESCRICAO, {
          parametros: {
            ...item,
          },
          title: item.post_title,
        })
      }>
      {item.image ? (
        <ImagePost resizeMode="cover" source={{ uri: `${item.image}` }} />
      ) : (
        <ViewImg />
      )}
      <LeftContent>
        <PostTitle numberOfLines={2}>{item.post_title}</PostTitle>
        <PostDate>{moment(item.data).format('DD/MM/YYYY')}</PostDate>
      </LeftContent>
    </Container>
  );
};

export default ItemConteudo;
