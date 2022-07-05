import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import rotas from '~/constantes/rotas';
import useAnalytics from '~/hooks/useAnalytics';
import BannerImagem from '../BannerImagem';
import { Container } from './styles';

const NewBanner = ({ data }) => {
  const { titulo, valor, imagem, options } = data;

  const { localImagem, labelAnalytics } = options;

  const { analyticsData } = useAnalytics();

  const { isConnected } = useNetInfo();

  const navigation = useNavigation();

  const temEnderecoUrl = valor.length > 0;

  // const temPagina = pagina.length > 0;

  const handleOnPress = () => {
    analyticsData(labelAnalytics, 'Click', 'Home');

    if (temEnderecoUrl && isConnected) {
      return navigation.navigate(rotas.WEBVIEW_PAGE, {
        title: titulo,
        url: valor,
      });
    }

    // if (temPagina) {
    //   return navigation.navigate(pagina);
    // }

    return navigation.navigate(rotas.SEM_CONEXAO, {
      componente: 'webview',
      title: titulo,
      url: valor,
    });
  };

  return (
    <Container onPress={handleOnPress}>
      <BannerImagem imagem={imagem} localImagem={localImagem} />
    </Container>
  );
};

export default NewBanner;
