import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Formato do item { link: string, data: string, imagem: string, tipo_conteudo: string }
function CartaoDeConteudo(props) {
  const { conteudo } = props;

  const { item } = conteudo;

  const navigation = useNavigation();

  console.log(JSON.stringify(conteudo, undefined, 2));

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(item.tipo_conteudo, {
          title: 'Meus Conteúdos',
          url: item.link,
        })
      }>
      <View style={{ marginBottom: 20 }}>
        <Image
          resizeMode="cover"
          style={estilos.imagem}
          source={{ uri: item.imagem }}
        />
        <Text style={estilos.data}>
          {moment(item.data).format('DD/MM/YYYY')}
        </Text>
        <Text numberOfLines={3} style={estilos.texto}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
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

export default CartaoDeConteudo;
