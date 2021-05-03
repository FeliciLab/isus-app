import React from 'react';
import Banner from '../../../components/Banner';
import IDSaude from '../../../assets/images/banners/IDSaude.png';
import VacinaCovid19 from '../../../assets/images/banners/vacinaCovid19.png';
import GuiaAssistenciaFarmaceutica from '../../../assets/images/banners/guiaAssistenciaFarmaceutica.jpg';
import { pegarBanners } from '../../../apis/apiHome';

const listaDeImagens = {
  'images/banners/guiaAssistenciaFarmaceutica.jpg': GuiaAssistenciaFarmaceutica,
  'images/banners/IDSaude.png': IDSaude,
  'images/banners/vacinaCovid19.png': VacinaCovid19,
};

const buscarImagem = ({ imagem, localImagem }) => {
  if (localImagem === 'web' || !localImagem) {
    return listaDeImagens[imagem];
  }
  return GuiaAssistenciaFarmaceutica;
};

const definirBanner = ({
  titulo,
  imagem,
  valor,
  tipo,
  ordem,
  options
}) => {
  if (tipo === 'webview') {
    return (
      <Banner
        labelDoAnalytics={options?.labelAnalytics || 'home-banner'}
        testID={`home-banner-${ordem}`}
        titulo={titulo}
        imagem={buscarImagem({ imagem, localImagem: options?.localImagem })}
        enderecoUrl={valor}
      />
    );
  }
  if (tipo === 'rota') {
    return (
      <Banner
        labelDoAnalytics={options?.labelAnalytics || 'home-banner'}
        testID={`home-banner-${ordem}`}
        titulo={titulo}
        imagem={buscarImagem({ imagem, localImagem: options?.localImagem })}
        pagina={valor}
      />
    );
  }
  return <></>;
};

const verificarLogin = (item, estaLogado) => {
  if (item.options?.login === undefined) {
    return true;
  }
  if (item.options?.login === true && estaLogado) {
    return true;
  }
  if (item.options?.login === false && !estaLogado) {
    return true;
  }
  return false;
};

const listaDeBanners = async (estaLogado) => {
  const bannerAPI = await pegarBanners();
  return (bannerAPI.data
    .filter(item => verificarLogin(item, estaLogado))
    .map(item => ({
      banner: definirBanner(item)
    })));
};

export default listaDeBanners;
