import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { Container, DateText, PostImage, PostTitle } from './styles';

// post { data: string, post_link: string, image: string }

function CardElmo({ post }) {
  const navigation = useNavigation();

  return (
    <Container
      onPress={() =>
        navigation.navigate('webview', {
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

export default CardElmo;
