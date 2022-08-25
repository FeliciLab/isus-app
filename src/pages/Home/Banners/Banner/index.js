import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
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

  const handleOnPress = useCallback(() => {
    analyticsData(labelAnalytics, 'Click', 'Home');

    const hrandler = {
      rota: () => {
        // Para quando a rota informada não existe
        if (!rotas[valor]) {
          return navigation.navigate(rotas.NOT_FOUND);
        }

        return navigation.navigate(valor);
      },
      webview: () => {
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
      },
    };

    hrandler[tipo] ? hrandler[tipo]() : hrandler.webview();
  }, [isConnected]);

  return (
    <Container onPress={handleOnPress} {...rest}>
      <BannerImagem imagem={imagem} localImagem={localImagem} />
    </Container>
  );
};

export default Banner;
