import React from 'react';
import { Dimensions } from 'react-native';
import { SvgCssUri } from 'react-native-svg';

import { Container, Imagem } from './styles';

const { width } = Dimensions.get('screen');

const imageWidth = width * 0.8;

const NewBanner = props => {
  const {
    labelDoAnalytics,
    titulo,
    imagem,
    enderecoUrl = '',
    pagina = '',
    ...rest
  } = props;

  const BannerImagem = () => {
    if (imagem?.svg) {
      return (
        <SvgCssUri width="100%" height="100%" uri={imagem.svg} cache="reload" />
      );
    }

    let source = imagem;

    if (imagem?.uri) {
      source = { ...imagem, cache: 'reload' };
    }

    return (
      <Imagem
        width={imageWidth}
        height={100}
        resizeMode="cover"
        source={source}
      />
    );
  };

  return (
    <Container {...rest}>
      <BannerImagem />
    </Container>
  );
};

export default NewBanner;
