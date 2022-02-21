import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import MessageErrorCard from '~/components/MessageErrorCard';
import { CORES } from '~/constantes/estiloBase';
import { useBanners } from '~/hooks/useBanners';
import BannerCarrossel from './BannerCarrossel';

const Banners = ({ sliderWidth, itemWidth }) => {
  const { banners, error, isLoading, featchBanners } = useBanners();

  useEffect(() => {
    featchBanners();
  }, []);

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
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      banners={banners}
    />
  );
};

export default Banners;
