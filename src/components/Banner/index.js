/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Cartao, ConteudoImagem, Imagem } from './styles';
import rotas from '../../constantes/rotas';

const { width } = Dimensions.get('screen');
const imageWidth = width * 0.8;

export default function Banner({
  titulo, imagem, enderecoUrl = '', pagina = ''
}) {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const temEnderecoUrl = enderecoUrl.length > 0;
  return (
    <Cartao
      onPress={() => (temEnderecoUrl ? (netInfo.isConnected ? navigation.navigate('webview', { title: titulo, url: enderecoUrl }) : navigation.navigate(rotas.SEM_CONEXAO)) : navigation.navigate(pagina))}
    >
      <ConteudoImagem>
        <Imagem width={imageWidth} height={100} resizeMode="cover" source={imagem} />
      </ConteudoImagem>
    </Cartao>
  );
}
