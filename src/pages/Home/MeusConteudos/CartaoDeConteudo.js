import React from 'react';
import {
  View, Text, Image, StyleSheet, Dimensions
} from 'react-native';

function CartaoDeConteudo(props) {
  const { conteudo } = props;
  const { item } = conteudo;
  console.log('image', item.image);
  return (
    <View>
      <Image resizeMode="contain" style={estilos.image} source={{ uri: item.image }} />
      <Text>{item.post_date}</Text>
      <Text>{item.post_title}</Text>
    </View>
  );
}
const estilos = StyleSheet.create({
  imagem: {
    height: 110, width: Dimensions.get('window').width / 2.2
  }
});
export default CartaoDeConteudo;
