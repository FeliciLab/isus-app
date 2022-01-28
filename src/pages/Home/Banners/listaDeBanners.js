import React from 'react';
import { pegarBanners } from '~/apis/apiHome';
import Banner from '~/components/Banner';
import { listaDeImagens } from '~/constantes/imagens';

const buscarImagem = ({ imagem, localImagem }) => {
  if (localImagem !== 'web' || !localImagem) {
    return listaDeImagens[imagem];
  }
  if (imagem.substr(-4) === '.svg') {
    return { svg: imagem };
  }

  return { uri: imagem };
};

const definirBanner = ({ titulo, imagem, valor, tipo, ordem, options }) => {
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

export const gerarListaBanners = (banners, estaLogado) =>
  banners
    .filter(item => verificarLogin(item, estaLogado))
    .map(item => ({
      banner: definirBanner(item),
    }));

const listaDeBanners = async estaLogado => {
  const bannerAPI = await pegarBanners();
  return gerarListaBanners(bannerAPI.data, estaLogado);
};

export default listaDeBanners;
