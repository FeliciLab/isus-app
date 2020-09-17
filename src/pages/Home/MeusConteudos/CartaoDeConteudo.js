import React from 'react';
import {
  View, Text, Image, StyleSheet, Dimensions, TouchableOpacity
} from 'react-native';
import moment from 'moment';

function CartaoDeConteudo(props) {
  const { conteudo } = props;
  const { item } = conteudo;
  console.log('image', item.image);
  return (
    <TouchableOpacity onPress={() => 2}>
      <View>
        <Image resizeMode="contain" style={estilos.imagem} source={{ uri: item.image }} />
        <Text style={estilos.data}>{moment(item.post_date).format('DD/MM/YYYY')}</Text>
        <Text style={estilos.texto}>{item.post_title}</Text>
      </View>
    </TouchableOpacity>
  );
}
const estilos = StyleSheet.create({
  imagem: {
    height: 110,
    width: Dimensions.get('window').width / 2.2,
    borderRadius: 8
  },
  data: {
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: '#4CAF50',

  },
  texto: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: Dimensions.get('window').width / 2.2
  }
});
export default CartaoDeConteudo;
