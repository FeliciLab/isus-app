import React from 'react';
import {
  Image, View, StyleSheet,
} from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import moment from 'moment';

export default function CartaoDeConteudo(props) {
  const { conteudo } = props;

  return (
    <>
            <Card elevation={4} style={estilos.card}>
                <Image resizeMode="cover" style={estilos.imagem} source={{ uri: conteudo.image }} />
                <View style={estilos.textos}>
                    <Paragraph style={estilos.titulo}>{conteudo.post_title}</Paragraph>
                    <Paragraph style={estilos.data}>{moment(conteudo.post_date).format('DD/MM/YYYY')}</Paragraph>
                </View>
            </Card>
    </>

  );
}

const estilos = StyleSheet.create({
  imagem: {
    height: 134,
    width: 120,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 4
  },
  titulo: {
    fontSize: 14,
    letterSpacing: 0.25,
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 20
  },
  data: {
    fontWeight: '500',
    fontSize: 10,
    letterSpacing: 1.5,
    color: '#4CAF50'
  },
  textos: {
    alignSelf: 'center',
  }
});
