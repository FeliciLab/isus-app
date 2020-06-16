import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import {
  Placeholder,
  PlaceholderLine,
  Shine,
  PlaceholderMedia
} from 'rn-placeholder';

export default function EsqueletoDeCarregamento() {
  const {
    container, cabecalho, conteudo, titulo, imagem
  } = styles;
  return (
  <View style={container}>
    <Placeholder
      Animation={Shine}
    >
      <PlaceholderMedia size={80} style={cabecalho} />
      <View style={conteudo}>
        <PlaceholderLine style={titulo} />
        <PlaceholderLine width={20} />
        <PlaceholderMedia size={80} style={imagem} />
        <PlaceholderLine />
        <PlaceholderLine />
        <PlaceholderLine />
        <PlaceholderLine />
        <PlaceholderLine />
        <PlaceholderLine />
        <PlaceholderLine />
      </View>
    </Placeholder>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  cabecalho: {
    width: '100%',
    marginBottom: 50,
  },
  titulo: {
    width: '100%',
  },
  imagem: {
    width: '100%',
    height: 150,
    marginBottom: 50
  },
  conteudo: {
    marginLeft: 60,
    marginRight: 60
  }
});
