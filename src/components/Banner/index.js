/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Cartao, ConteudoImagem, Imagem } from './styles';
import { analyticsData } from '../../utils/analytics';

const { width } = Dimensions.get('screen');
const imageWidth = width * 0.8;

export default function Banner({
  titulo, imagem,
  enderecoUrl = '', pagina = '',
  testID
}) {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const temEnderecoUrl = enderecoUrl.length > 0;
  const temPagina = pagina.length > 0;

  const lidarComClick = () => {
    analyticsData(); // TODO fazer a parametrização da função do analytics
    if (temEnderecoUrl && netInfo.isConnected) {
      return navigation.navigate('webview', { title: titulo, url: enderecoUrl });
    }
    if (temPagina) {
      return navigation.navigate(pagina);
    }
    return null;
  };

  return (
    <Cartao
      testID={testID}
      onPress={lidarComClick}
    >
      <ConteudoImagem>
        <Imagem width={imageWidth} height={100} resizeMode="cover" source={imagem} />
      </ConteudoImagem>
    </Cartao>
  );
}
