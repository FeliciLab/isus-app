import React from 'react';
import { Image } from 'react-native';
import ListaCards from '../../components/listaCards';
//  import pegarCardsElmo from '../../apis/apiHome';
import cardsElmoMock from '../../../__mocks__/cards/cardsElmoMock';
import { listaImagensElmo } from '../../constantes/imagens';

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
    <ListaCards lista={tratarLista(cardsElmoMock)} />
  );
}


export default ListaCardsElmo;
