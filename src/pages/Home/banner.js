import React from 'react';
import {
  Image, View, StyleSheet, Dimensions
} from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');
const imageWidth = width * 0.8;

export default function Banner({ titulo, imagem, enderecoUrl }) {
  const navigation = useNavigation();

  return (
      <Card
        onPress={() => navigation.navigate('webview', { title: titulo, url: enderecoUrl })}
        style={estilos.cartao}
      >
        <View style={estilos.containerImage}>
          <Image width={imageWidth} height={100} style={estilos.imagem} resizeMode="cover" source={imagem} />
        </View>
      </Card>
  );
}

const estilos = StyleSheet.create({
  imagem: {
    borderRadius: 10,
    height: 130,
    width: '100%'
  },
  containerImagem: {
    width: '100%',
    height: 130
  },
  cartao: {
    height: 130,
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 16
  }
});
