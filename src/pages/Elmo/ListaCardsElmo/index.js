import React, { useEffect, useState } from 'react';
import { pegarCardsElmo } from '~/apis/apiHome';
import ListaCards from '~/components/listaCards';
import { Imagem } from '~/components/listaCards/styles';
import { listaImagensElmo } from '~/constantes/imagens';

function ListaCardsElmo() {
  const [cardsElmo, setCardsElmo] = useState([]);

  const buscarLista = async () => {
    try {
      const lista = await pegarCardsElmo();
      setCardsElmo(lista.data);
    } catch (error) {
      console.log(`erro ao listar Cards. ${error}`);
    }
  };

  useEffect(() => {
    buscarLista();
  }, []);

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

  return <ListaCards lista={tratarLista(cardsElmo)} />;
}

export default ListaCardsElmo;
