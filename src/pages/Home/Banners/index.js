import React, { useState, useContext, useEffect } from 'react';
import BannerCarrossel from './BannerCarrossel';
import { AutenticacaoContext } from '../../../context/AutenticacaoContext';
import listaBanners from './listaDeBanners';

const Banners = ({ sliderWidth, itemWidth }) => {
  const [banners, setBanners] = useState([]);

  const { estaLogado } = useContext(AutenticacaoContext);

  const carregarBaners = async () => {
    try {
      const mostrarBanners = await listaBanners(estaLogado);

      console.log(mostrarBanners);

      setBanners(mostrarBanners);
    } catch (error) {
      console.log(`erro ao listar Banners. ${error}`);
    }
  };

  useEffect(() => {
    carregarBaners();
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
