import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import rotas from '~/constantes/rotas';
import {
  Container,
  ImagePost,
  LeftContent,
  PostDate,
  PostTitle,
} from './styles';

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
      <ImagePost resizeMode="cover" source={{ uri: item.image }} />

      <LeftContent>
        <PostTitle numberOfLines={2}>{item.post_title}</PostTitle>
        <PostDate>{moment(item.data).format('DD/MM/YYYY')}</PostDate>
      </LeftContent>
    </Container>
  );
};

export default ItemConteudo;
