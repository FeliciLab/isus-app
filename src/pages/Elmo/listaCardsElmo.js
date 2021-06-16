import React from 'react';
import ListaCards from '../../components/listaCards';
//  import pegarCardsElmo from '../../apis/apiHome';
import cardsElmoMock from '../../../__mocks__/cards/cardsElmoMock';

function ListaCardsElmo() {
  // const [cardsElmo, alterarCardsElmo] = useState([]);
  // alterarCardsElmo(cardsElmoMock);
  /* const buscarLista = async () => {
    const lista = await pegarCardsElmo();
    alterarCardsElmo(lista);
  };

  useEffect(() => {
    buscarLista();
  }, []); */

  return (
    <ListaCards lista={cardsElmoMock} />
  );
}


export default ListaCardsElmo;
