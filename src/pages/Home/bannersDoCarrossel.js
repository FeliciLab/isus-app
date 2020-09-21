import React from 'react';
import BannerManejo from './bannerManejo';
import Banner from './banner';
import SUS30anos from '../../assets/images/SUS-30-anos.png';
import PPSUS from '../../assets/images/PPSUS.png';
import CartilhaSaudeMental from '../../assets/images/cartilha-saude-mental.png';

export default [
  {
    banner:
      <Banner
        titulo="SUS 30 anos"
        imagem={SUS30anos}
        enderecoUrl="https://www.esp.ce.gov.br/tag/semana-do-sus/"
      />
  },
  {
    banner:
      <Banner
        titulo="PPSUS"
        imagem={PPSUS}
        enderecoUrl="https://www.esp.ce.gov.br/tag/ppsus/"
      />
  },
  {
    banner:
      <Banner
        titulo="Cartilha de Saúde Mental"
        imagem={CartilhaSaudeMental}
        enderecoUrl="https://coronavirus.ceara.gov.br/cartilhas-sobre-saude-mental/"
      />
  },
  {
    banner: <BannerManejo />
  },

];
