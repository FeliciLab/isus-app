import React from 'react';
import {
  Image, View, StyleSheet, TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Surface } from 'react-native-paper';
import moment from 'moment';

export default function CartaoDeConteudo(props) {
  const { conteudo } = props;
  const navigation = useNavigation();
  console.log('conteudo', conteudo);
  return (
    <Surface>
      <TouchableOpacity style={estilos.cartao} onPress={() => navigation.navigate('Descrição', { object: { ...conteudo, categoria_id: 700 }, title: conteudo.post_title })}>
        <Image resizeMode="cover" style={estilos.imagem} source={{ uri: conteudo.image }} />
        <View style={estilos.textos}>
            <Text numberOfLines={2} style={estilos.titulo}>{conteudo.post_title}</Text>
            <Text style={estilos.data}>{moment(conteudo.post_date).format('DD/MM/YYYY')}</Text>
        </View>
      </TouchableOpacity>
    </Surface>
  );
}

const estilos = StyleSheet.create({
  imagem: {
    height: 134,
    width: 120,
  },
  cartao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 4,
    elevation: 4,
    backgroundColor: '#FAFAFA'
  },
  titulo: {
    fontSize: 14,
    letterSpacing: 0.25,
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 20,
    maxWidth: 207
  },
  data: {
    fontWeight: '500',
    fontSize: 10,
    letterSpacing: 1.5,
    color: '#4CAF50',
    marginTop: 10
  },
  textos: {
    marginHorizontal: 16,
    alignSelf: 'center',
  }
});
