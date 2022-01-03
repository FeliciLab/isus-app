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
  return (
    <Surface>
      <TouchableOpacity
        style={estilos.cartao}
        onPress={() => navigation.navigate(
          conteudo.tipo_conteudo,
          {
            title: 'Meus Conteúdos',
            url: conteudo.link,
          }
        )}>
        <Image resizeMode="cover" style={estilos.imagem} source={{ uri: conteudo.imagem }} />
        <View style={estilos.textos}>
          <Text numberOfLines={2} style={estilos.titulo}>{conteudo.title}</Text>
          <Text style={estilos.data}>{moment(conteudo.data).format('DD/MM/YYYY')}</Text>
        </View>
      </TouchableOpacity>
    </Surface>
  );
}

const estilos = StyleSheet.create({
  imagem: {
    height: 100,
    width: 140,
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
  },
  data: {
    fontWeight: '500',
    fontSize: 10,
    letterSpacing: 1.5,
    color: '#4CAF50',
    marginTop: 10
  },
  textos: {
    flex: 1,
    marginHorizontal: 16,
    maxWidth: 207,
    alignSelf: 'center',
  }
});
