import React from 'react';
import { useWindowDimensions } from 'react-native';
import { SvgCssUri } from 'react-native-svg';
import { listaDeImagens } from '~/constantes/imagens';
import { Imagem } from './styles';

const BannerImagem = ({ imagem, localImagem }) => {
  const { width } = useWindowDimensions();

  if (localImagem !== 'web' || !localImagem) {
    return (
      <Imagem
        width={width * 0.8}
        height={100}
        resizeMode="cover"
        source={listaDeImagens[imagem]}
      />
    );
  }

  if (imagem.endsWith('.svg')) {
    return <SvgCssUri width="100%" height="100%" uri={imagem} cache="reload" />;
  }

  return (
    <Imagem
      width={width * 0.8}
      height={100}
      resizeMode="cover"
      source={{ uri: imagem }}
    />
  );
};

export default BannerImagem;
