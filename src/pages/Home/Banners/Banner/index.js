import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import rotas from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import BannerImagem from '../BannerImagem';
import { Container } from './styles';

const Banner = ({ data, ...rest }) => {
  const {
    titulo,
    tipo,
    valor,
    imagem,
    options: { localImagem, labelAnalytics },
  } = data;

  const { analyticsData } = useAnalytics();

  const { isConnected } = useNetInfo();

  const navigation = useNavigation();

  const handleOnPress = () => {
    analyticsData(labelAnalytics, 'Click', 'Home');

    // Para quando deve abrir uma rota interna
    if (tipo === 'rota') {
      return navigation.navigate(valor);
    }

    // Para quando for tentar abrir uma página na web
    if (isConnected) {
      return navigation.navigate(rotas.WEBVIEW_PAGE, {
        title: titulo,
        url: valor,
      });
    } else {
      return navigation.navigate(rotas.SEM_CONEXAO, {
        componente: 'webview',
        title: titulo,
        url: valor,
      });
    }
  };

  return (
    <Container onPress={handleOnPress} {...rest}>
      <BannerImagem imagem={imagem} localImagem={localImagem} />
    </Container>
  );
};

export default Banner;
