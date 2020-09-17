import React from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity
} from 'react-native';
import moment from 'moment';

function CartaoDeConteudo(props) {
  const { conteudo } = props;
  const { item } = conteudo;
  console.log('image', item.image);
  return (
    <TouchableOpacity onPress={() => 2}>
      <View>
        <Image resizeMode="cover" style={estilos.imagem} source={{ uri: item.image }} />
        <Text style={estilos.data}>{moment(item.post_date).format('DD/MM/YYYY')}</Text>
        <Text numberOfLines={3} style={estilos.texto}>{item.post_title}</Text>
      </View>
    </TouchableOpacity>
  );
}
const estilos = StyleSheet.create({
  imagem: {
    height: 100,
    width: 140,
    borderRadius: 8,
    marginHorizontal: 16,
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
  }
});
export default CartaoDeConteudo;
