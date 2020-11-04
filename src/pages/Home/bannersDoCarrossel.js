import React, { useContext } from 'react';
import BannerManejo from './bannerManejo';
import Banner from './banner';
import CovidHeroes from '../../assets/images/Covid-Heroes-iSUS.png';
import IDSaude from '../../assets/images/ID-Saude.png';
import CartilhaSaudeMental from '../../assets/images/cartilha-saude-mental.png';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';


const bannersDoCarrossel = () => {
  const { estaLogado } = useContext(AutenticacaoContext);
  return [
    {
      banner:
        <Banner
          titulo="Covid-19 Heroes"
          imagem={CovidHeroes}
          enderecoUrl="https://heroescovid19study.org/survey/"
        />
    },
    {
      banner:
        <Banner
          titulo="ID Saúde"
          imagem={IDSaude}
          pagina={estaLogado ? 'PERFIL' : 'LOGIN'}
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
};

export default bannersDoCarrossel;
