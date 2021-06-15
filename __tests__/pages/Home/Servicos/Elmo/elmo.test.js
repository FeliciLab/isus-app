import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { render, fireEvent } from 'util-teste';
import { FlatList } from 'react-native';
import feature from '../../../../../src/constantes/features';
import estaAtiva from '../../../../../src/utils/estaAtiva';
import ListaCards from '../../../../../src/components/ListaCards';
import ListaCardsElmo from '../../../../../src/pages/Elmo/listaCardsElmo';
import ItemCard from '../../../../../src/components/ListaCards/ItemCard';
import mockElmo from '../../../../../__mocks__/cards/cardsElmoMock';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

jest.mock('@react-native-community/netinfo', () => ({
  ...jest.requireActual('@react-native-community/netinfo'),
  useNetInfo: () => ({
    isConnected: true,
  })
}));

if (estaAtiva(feature.LISTA_CARDS)) {
  describe('Dado que estou na home', () => {
    describe('Quando acesso a tela do Elmo', () => {
      test('verifica se todos os cards vindos da API estão sendo renderizados (quantidade de cards)', () => {
        const cardsTestIds = mockElmo.map(i => `cards-${i.id}`);
        const {
          getByTestId
        } = render(
          <ListaCardsElmo>
            <ListaCards lista={mockElmo}>
              <FlatList>
                 renderItem=
                  {({ item }) => (<ItemCard icone={item.imagem} />)}
              </FlatList>
            </ListaCards>
          </ListaCardsElmo>
        );
        cardsTestIds.forEach(id => expect(getByTestId(id)).not.toBeNull());
      });
    });
  });

  describe('Dado que estou na tela do ELMO', () => {
    const cardsTestIds = mockElmo.map(i => `cards-${i.id}`);
    let getText;
    let getTestId;
    let arrayTestId;
    beforeEach(() => {
      const {
        getByTestId, getByText
      } = render(
            <ListaCardsElmo>
              <ListaCards lista={mockElmo}>
                <FlatList>
                   data=
                   {mockElmo}
                   renderItem=
                    {({ item }) => (<ItemCard icone={item.imagem} titulo={item.titulo} testID={`cards-${item.id}`} />)}
                </FlatList>
              </ListaCards>
            </ListaCardsElmo>
      );
      // debug();
      getText = getByText;
      getTestId = getByTestId;
      arrayTestId = cardsTestIds;
    });
    describe('Quando o card Treinamento está sendo exibido', () => {
    /*       test('então deve estar com a imagem no background definida de acordo com API', () => {
        expect(getTestId(arrayTestId[0]).children).toBe('Treinamento');
      }); */
      test('e o título abaixo do card deve ser o mesmo definido pela API', () => {
        expect(getText(mockElmo[0].titulo).props.children).toBe('Treinamento');
      });
    });
    describe('Quando o card Manual de Uso está sendo exibido', () => {
      test('o título abaixo do card deve ser o mesmo definido pela API', () => {
        expect(getText(mockElmo[1].titulo).props.children).toBe('Manual de Uso');
      });
    });
    describe('Quando o card Fale Conosco está sendo exibido', () => {
      test('o título abaixo do card deve ser o mesmo definido pela API', () => {
        expect(getText(mockElmo[2].titulo).props.children).toBe('Fale Conosco');
      });
    });
    describe('Quando o card Materiais está sendo exibido', () => {
      test('o título abaixo do card deve ser o mesmo definido pela API', () => {
        expect(getText(mockElmo[3].titulo).props.children).toBe('Materiais');
      });
    });
    describe('Quando o card Depoimentos está sendo exibido', () => {
      test('o título abaixo do card deve ser o mesmo definido pela API', () => {
        expect(getText(mockElmo[4].titulo).props.children).toBe('Depoimentos');
      });
    });
    describe('Quando o card Biblioteca está sendo exibido', () => {
      test('o título abaixo do card deve ser o mesmo definido pela API', () => {
        expect(getText(mockElmo[5].titulo).props.children).toBe('Biblioteca');
      });
    });
    describe('Quando o card Doações está sendo exibido', () => {
      test('o título abaixo do card deve ser o mesmo definido pela API', () => {
        expect(getText(mockElmo[6].titulo).props.children).toBe('Doações');
      });
    });
    describe('Quando clico no card Treinamento que está configurado para abrir uma webview', () => {
      test('Então deve abrir a webview para a url definida', () => {
        fireEvent.press(getTestId(arrayTestId[0]));
        expect(mockedNavigate).toHaveBeenCalledWith('webview', {
          title: 'Treinamento',
          url: 'https://sus.ce.gov.br/elmo/faca-sua-capacitacao/'
        });
      });
    });
  });

  /*  describe('Dado que clico em um card tipo rota', () => {
    describe('Quando o card é tal', () => {
    });
  });

  describe('Dado que clico em um card tipo webview', () => {
    describe('Quando o card é tal', () => {
    });
  }); */

  /* describe('Dado que clico em um card tipo browser', () => {
    describe('Quando o card é tal', () => {
    });
  }); */
}
