import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import ListaCards from '../../components/listaCards';
import { pegarCardsElmo } from '../../apis/apiHome';
import { listaImagensElmo } from '../../constantes/imagens';

function ListaCardsElmo() {
  const [cardsElmo, alterarCardsElmo] = useState([]);
  const buscarLista = async () => {
    try {
      const lista = await pegarCardsElmo();
      alterarCardsElmo(lista.data);
    } catch (error) {
      console.log(`erro ao listar Cards. ${error}`);
    }
  };

  useEffect(() => {
    buscarLista();
  }, []);

  const tratarLista = lista => lista.map((item) => {
    let imagem;
    if (item.opcoes?.localImagem === 'web') {
      imagem = <Image source={{ uri: item.imagem }} />;
    }
    if (item.opcoes?.localImagem === 'app') {
      imagem = listaImagensElmo[item.imagem];
    }
    return {
      ...item,
      imagem
    };
  });

  return (
    <ListaCards lista={tratarLista(cardsElmo)} />
  );
}


export default ListaCardsElmo;
