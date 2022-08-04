import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import rotas from '~/constantes/rotas';
import { Container, DateText, PostImage, PostTitle } from './styles';

// post { data: string, post_link: string, image: string }

function CardNewsElmo({ post }) {
  const navigation = useNavigation();

  return (
    <Container
      onPress={() =>
        navigation.navigate(rotas.WEBVIEW_PAGE, {
          title: 'Novidades Elmo',
          url: post.post_link,
        })
      }>
      <PostImage resizeMode="cover" source={{ uri: post.image }} />
      <DateText>{moment(post.data).format('DD/MM/YYYY')}</DateText>
      <PostTitle numberOfLines={3}>{post.post_title}</PostTitle>
    </Container>
  );
}

export default CardNewsElmo;
