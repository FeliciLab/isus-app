/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgCssUri } from 'react-native-svg';
import { useNetInfo } from '@react-native-community/netinfo';
import { Cartao, ConteudoImagem, Imagem } from './styles';
import useAnalytics from '../../hooks/Analytics';
import rotas from '../../constantes/rotas';

const { width } = Dimensions.get('screen');
const imageWidth = width * 0.8;

export default function Banner({
  labelDoAnalytics,
  titulo,
  imagem,
  enderecoUrl = '',
  pagina = '',
  testID
}) {
  const { analyticsData } = useAnalytics();
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const temEnderecoUrl = enderecoUrl.length > 0;
  const temPagina = pagina.length > 0;

  const lidarComClick = () => {
    analyticsData(labelDoAnalytics, 'Click', 'Home');

    if (temEnderecoUrl && netInfo.isConnected) {
      return navigation.navigate('webview', { title: titulo, url: enderecoUrl });
    }
    if (temPagina) {
      return navigation.navigate(pagina);
    }
    return navigation.navigate(rotas.SEM_CONEXAO, {
      componente: 'webview',
      title: titulo,
      url: enderecoUrl,
    });
  };

  const exibirImg = () => {
    if (imagem.svg) {
      return <SvgCssUri width="100%" height="100%" uri={imagem.svg} cache="reload" />;
    }

    let source = imagem;
    if (imagem.uri) {
      source = { ...imagem, cache: 'reload' };
    }
    return <Imagem width={imageWidth} height={100} resizeMode="cover" source={source} />;
  };

  return (
    <Cartao
      testID={testID}
      onPress={lidarComClick}
    >
      <ConteudoImagem>
        {exibirImg()}
      </ConteudoImagem>
    </Cartao>
  );
}
