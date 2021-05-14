import React, { useState, useContext, useEffect } from 'react';
import BannerCarrossel from './BannerCarrossel';
import { AutenticacaoContext } from '../../../context/AutenticacaoContext';
import listaBanners from './listaDeBanners';

const Banners = ({ sliderWidth, itemWidth }) => {
  const [banners, alterarBanners] = useState([]);
  const { estaLogado } = useContext(AutenticacaoContext);

  const aoIniciar = async () => {
    try {
      const mostrarBanners = await listaBanners(estaLogado);
      alterarBanners(mostrarBanners);
    } catch (error) {
      console.log(`erro ao listar Banners. ${error}`);
    }
  };

  useEffect(() => {
    aoIniciar();
  }, [estaLogado]);

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
