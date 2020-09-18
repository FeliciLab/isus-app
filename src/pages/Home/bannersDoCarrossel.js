import React from 'react';
import BannerManejo from './bannerManejo';
import Banner from './banner';

export default [
  {
    banner:
      <Banner
        titulo="SUS 30 anos"
        imagem="https://coronavirus.ceara.gov.br/wp-content/uploads/2020/09/SUS-30-anos.png"
        enderecoUrl="https://www.esp.ce.gov.br/tag/semana-do-sus/"
      />
  },
  {
    banner:
      <Banner
        titulo="PPSUS"
        imagem="https://coronavirus.ceara.gov.br/wp-content/uploads/2020/09/PPSUS.png"
        enderecoUrl="https://www.esp.ce.gov.br/tag/ppsus/"
      />
  },
  {
    banner:
      <Banner
        titulo="Cartilha de Saúde Mental"
        imagem="https://coronavirus.ceara.gov.br/wp-content/uploads/2020/09/Banner-Cartilha-Saúde-Mental.png"
        enderecoUrl="https://coronavirus.ceara.gov.br/cartilhas-sobre-saude-mental/"
      />
  },
  {
    banner: <BannerManejo />
  },

];
