import React, { useEffect } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import MessageErrorCard from '~/components/MessageErrorCard';
import { CORES } from '~/constantes/estiloBase';
import useAutenticacao from '~/hooks/useAutenticacao';
import { useBanners } from '~/hooks/useBanners';
import BannerCarrossel from './BannerCarrossel';

const Banners = () => {
  const { banners, error, isLoading, fetchBanners } = useBanners();

  const { width } = Dimensions.get('screen');

  const { user } = useAutenticacao();

  useEffect(() => {
    fetchBanners();
  }, []);

  // TODO: provavelmente precisaremos rever essa lógica
  // Precisamos mesmo ter dois banners iguais???
  const verificarLogin = banner => {
    if (banner.options?.login === undefined) {
      return true;
    }
    if (banner.options?.login === true && user) {
      return true;
    }
    if (banner.options?.login === false && !user) {
      return true;
    }
    return false;
  };

  // TODO: provavelmente precisaremos rever essa lógica
  // Precisamos mesmo ter dois banners iguais???
  const getBannnerListFilteredLogin = () => {
    return banners.filter(verificarLogin);
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={CORES.VERDE}
        style={{ marginVertical: 10 }}
      />
    );
  }

  if (error) {
    return (
      <MessageErrorCard
        title="Error"
        subtitle="Error ao carregar os banners"
        iconColor={CORES.LARANJA}
        iconName="alert"
        style={{ margin: 10 }}
      />
    );
  }

  return (
    <BannerCarrossel
      testID="home-banner-index"
      sliderWidth={width}
      itemWidth={width}
      banners={getBannnerListFilteredLogin()}
    />
  );
};

export default Banners;
