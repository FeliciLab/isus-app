import React, { useState, useContext, useEffect } from 'react';
import BannerCarrossel from './BannerCarrossel';
import { AutenticacaoContext } from '../../../context/AutenticacaoContext';
import listaBanners from './listaDeBanners';
import { ActivityIndicator } from 'react-native';
import { CORES } from '../../../constantes/estiloBase';

const Banners = ({ sliderWidth, itemWidth }) => {
  const [banners, setBanners] = useState([]);

  const { estaLogado } = useContext(AutenticacaoContext);

  const carregarBaners = async () => {
    try {
      const mostrarBanners = await listaBanners(estaLogado);

      setBanners(mostrarBanners);
    } catch (error) {
      console.log(`erro ao listar Banners. ${error}`);
    }
  };

  useEffect(() => {
    carregarBaners();
  }, [estaLogado]);

  if (banners.length <= 0) {
    return (
      <ActivityIndicator
        size="large"
        color={CORES.VERDE}
        style={{ marginVertical: 10 }}
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
