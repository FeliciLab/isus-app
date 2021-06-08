import React, { useEffect, useState } from 'react';
import listaCards from '../../components/listaCards';
// import pegarCardsElmo from '../../apis/apiHome';
import cardsElmoMock from '../../../__mocks__/cards/cardsElmoMock';

function listaCardsElmo() {
  const [cardsElmo, alterarCardsElmo] = useState([]);
  /* const buscarLista = async () => {
    const lista = await pegarCardsElmo();
    alterarCardsElmo(lista);
  }; */

  useEffect(() => {
    // buscarLista();
    alterarCardsElmo(cardsElmoMock);
  }, []);

  return (
    <listaCards lista={cardsElmo} />
  );
}


export default listaCardsElmo;
