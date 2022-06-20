import React from 'react';
import ListaCards from '~/components/ListaCards';
import { Imagem } from './styles';

import { listaImagensElmo } from '~/constantes/imagens';

const ListaCardsElmo = ({ data }) => {
  const tratarLista = lista =>
    lista.map(item => {
      let imagem;
      if (item.opcoes?.localImagem === 'web') {
        imagem = <Imagem resizeMode="contain" source={{ uri: item.imagem }} />;
      }
      if (item.opcoes?.localImagem === 'app') {
        const ImgSvg = listaImagensElmo[item.imagem];
        imagem = <ImgSvg />;
      }
      return {
        ...item,
        imagem,
      };
    });

  return <ListaCards lista={tratarLista(data)} />;
};

export default ListaCardsElmo;
