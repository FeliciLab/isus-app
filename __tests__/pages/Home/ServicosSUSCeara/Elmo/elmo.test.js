import React from 'react';
import { render, fireEvent } from 'util-teste';
import feature from '../../../../../src/constantes/features';
import estaAtiva from '../../../../../src/utils/estaAtiva';
import mockElmo from '../../../../../__mocks__/cards/cardsElmoMock';
import ROTAS from '../../../../../src/constantes/rotas';
import { listaImagensElmo } from '../../../../../src/constantes/imagens';
import ListaCards from '../../../../../src/components/listaCards';
import { AppTrackTransparencyContext } from '../../../../../src/context/AppTrackTransparencyContext';

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
  }),
}));

const mockLinking = jest.fn(() => Promise.resolve('500'));
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: mockLinking,
}));

if (estaAtiva(feature.LISTA_CARDS)) {
  describe('Elmo', () => {
    describe('Dado que estou na home', () => {
      describe('Quando acesso a tela do Elmo', () => {
        test('verifica se todos os cards vindos da API estão sendo renderizados (quantidade de cards)', () => {
          const cardsTestIds = mockElmo.map(i => `cards-${i.id_publico}`);
          const { getByTestId } = render(
            <AppTrackTransparencyContext.Provider
              value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
              <ListaCards lista={mockElmo} />
            </AppTrackTransparencyContext.Provider>,
          );
          cardsTestIds.forEach(id => expect(getByTestId(id)).not.toBeNull());
        });
      });
    });

    describe('Dado que estou na tela do ELMO', () => {
      const cardsTestIds = mockElmo.map(i => `cards-${i.id_publico}`);
      let getText;
      let getTestId;
      let arrayTestId;
      beforeEach(() => {
        const { getByTestId, getByText } = render(
          <AppTrackTransparencyContext.Provider
            value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
            <ListaCards lista={mockElmo} />
          </AppTrackTransparencyContext.Provider>,
        );
        getText = getByText;
        getTestId = getByTestId;
        arrayTestId = cardsTestIds;
      });
      describe('Quando o card Treinamento está sendo exibido', () => {
        test('então deve estar com a imagem no background definida de acordo com API', () => {
          expect(getTestId(arrayTestId[0]).children[0]).toBe(
            listaImagensElmo.SvgCapacitacao,
          );
        });
        test('e o título abaixo do card deve ser o mesmo definido pela API', () => {
          expect(getText(mockElmo[0].titulo).props.children).toBe(
            'Treinamento',
          );
        });
      });
      describe('Quando o card Manual de Uso está sendo exibido', () => {
        test('então deve estar com a imagem no background definida de acordo com API', () => {
          expect(getTestId(arrayTestId[1]).children[0]).toBe(
            listaImagensElmo.SvgManualUso,
          );
        });
        test('o título abaixo do card deve ser o mesmo definido pela API', () => {
          expect(getText(mockElmo[1].titulo).props.children).toBe(
            'Manual de Uso',
          );
        });
      });
      describe('Quando o card Fale Conosco está sendo exibido', () => {
        test('então deve estar com a imagem no background definida de acordo com API', () => {
          expect(getTestId(arrayTestId[2]).children[0]).toBe(
            listaImagensElmo.SvgFaleConosco,
          );
        });
        test('o título abaixo do card deve ser o mesmo definido pela API', () => {
          expect(getText(mockElmo[2].titulo).props.children).toBe(
            'Fale Conosco',
          );
        });
      });
      describe('Quando o card Materiais está sendo exibido', () => {
        test('então deve estar com a imagem no background definida de acordo com API', () => {
          expect(getTestId(arrayTestId[3]).children[0]).toBe(
            listaImagensElmo.SvgFaleConosco,
          );
        });
        test('o título abaixo do card deve ser o mesmo definido pela API', () => {
          expect(getText(mockElmo[3].titulo).props.children).toBe('Materiais');
        });
      });
      describe('Quando o card Depoimentos está sendo exibido', () => {
        test('então deve estar com a imagem no background definida de acordo com API', () => {
          expect(getTestId(arrayTestId[4]).children[0]).toBe(
            listaImagensElmo.SvgFaleConosco,
          );
        });
        test('o título abaixo do card deve ser o mesmo definido pela API', () => {
          expect(getText(mockElmo[4].titulo).props.children).toBe(
            'Depoimentos',
          );
        });
      });
      describe('Quando o card Biblioteca está sendo exibido', () => {
        test('então deve estar com a imagem no background definida de acordo com API', () => {
          expect(getTestId(arrayTestId[5]).children[0]).toBe(
            listaImagensElmo.SvgFaleConosco,
          );
        });
        test('o título abaixo do card deve ser o mesmo definido pela API', () => {
          expect(getText(mockElmo[5].titulo).props.children).toBe('Biblioteca');
        });
      });
      describe('Quando o card Doações está sendo exibido', () => {
        test('então deve estar com a imagem no background definida de acordo com API', () => {
          expect(getTestId(arrayTestId[6]).children[0]).toBe(
            listaImagensElmo.SvgFaleConosco,
          );
        });
        test('o título abaixo do card deve ser o mesmo definido pela API', () => {
          expect(getText(mockElmo[6].titulo).props.children).toBe('Doações');
        });
      });
      describe('Quando clico no card Treinamento que está configurado para abrir uma webview', () => {
        test('Então deve abrir a webview para a url definida', () => {
          fireEvent.press(getTestId(arrayTestId[0]));
          expect(mockedNavigate).toHaveBeenCalledWith('webview', {
            title: 'Treinamento',
            url: 'https://sus.ce.gov.br/elmo/faca-sua-capacitacao/',
          });
        });
      });
      describe('Quando clico no card Manual de Uso que está configurado para abrir um browser', () => {
        test('Então deve abrir o browser na url definida', () => {
          fireEvent.press(getTestId(arrayTestId[1]));
          expect(mockLinking).toHaveBeenCalledWith(
            'https://sus.ce.gov.br/elmo/wp-content/uploads/sites/2/2021/01/Manual_Elmo_1.1_JAN2021.pdf',
          );
        });
      });
      describe('Quando clico no card Treinamento que está configurado para abrir uma webview', () => {
        test('Então deve abrir a webview para a url definida', () => {
          fireEvent.press(getTestId(arrayTestId[2]));
          expect(mockedNavigate).toHaveBeenCalledWith(ROTAS.DUVIDAS_ELMO);
        });
      });
      describe('Quando clico no card Materiais que está configurado para abrir um browser', () => {
        test('Então deve abrir o browser na url definida', () => {
          fireEvent.press(getTestId(arrayTestId[3]));
          expect(mockLinking).toHaveBeenCalledWith(
            'https://sus.ce.gov.br/elmo/materiais/',
          );
        });
      });
      describe('Quando clico no card Depoimentos que está configurado para abrir um browser', () => {
        test('Então deve abrir o browser na url definida', () => {
          fireEvent.press(getTestId(arrayTestId[4]));
          expect(mockLinking).toHaveBeenCalledWith(
            'https://sus.ce.gov.br/elmo/depoimentos/',
          );
        });
      });
      describe('Quando clico no card Biblioteca que está configurado para abrir um browser', () => {
        test('Então deve abrir o browser na url definida', () => {
          fireEvent.press(getTestId(arrayTestId[5]));
          expect(mockLinking).toHaveBeenCalledWith(
            'https://sus.ce.gov.br/elmo/biblioteca/',
          );
        });
      });
      describe('Quando clico no card Doações que está configurado para abrir um browser', () => {
        test('Então deve abrir o browser na url definida', () => {
          fireEvent.press(getTestId(arrayTestId[6]));
          expect(mockLinking).toHaveBeenCalledWith(
            'https://sus.ce.gov.br/elmo/doacoes/',
          );
        });
      });
    });
  });
} else {
  test('teste de exemplo', () => {
    expect(true);
  });
}
