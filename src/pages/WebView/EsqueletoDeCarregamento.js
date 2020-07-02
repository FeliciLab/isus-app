import React from 'react';
import {
  View,
  Dimensions,
  PixelRatio,
  StyleSheet,
} from 'react-native';
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

  const calculaLinhasdeArtigo = () => {
    const alturaDisponivel = (PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').height) - 130 - 24 - 24 - 130) / 100;
    const linhas = [];
    for (let i = 1; i < alturaDisponivel; i += 1) {
      linhas.push(<PlaceholderLine />);
    }
    return linhas;
  };

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
        {calculaLinhasdeArtigo()}
      </View>
    </Placeholder>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
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
