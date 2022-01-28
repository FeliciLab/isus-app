import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// post { data: string, post_link: string, image: string }

function CardNewsElmo({ post }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('webview', {
          title: 'Novidades Elmo',
          url: post.post_link,
        })
      }>
      <View style={{ marginBottom: 20 }}>
        <Image
          resizeMode="cover"
          style={styles.imagem}
          source={{ uri: post.image }}
        />
        <Text style={styles.data}>
          {moment(post.data).format('DD/MM/YYYY')}
        </Text>
        <Text numberOfLines={3} style={styles.texto}>
          {post.post_title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imagem: {
    height: 100,
    width: 140,
    borderRadius: 8,
    marginEnd: 8,
    marginStart: 8,
  },
  data: {
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: '#4CAF50',
    marginHorizontal: 16,
  },
  texto: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 140,
    marginHorizontal: 16,
  },
});

export default CardNewsElmo;
