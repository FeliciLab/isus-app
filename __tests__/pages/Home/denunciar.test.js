import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import feature from '../../../src/constantes/features';
import estaAtiva from '../../../src/utils/estaAtiva';
import Denunciar from '../../../src/pages/Denunciar/index';
import ForcaTarefa from '../../../src/pages/Home/ForcaTarefa/index';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useIsFocused: jest.fn()
}));

const mockedNavigate = jest.fn();
const navigation = { navigate: mockedNavigate };


if (estaAtiva(feature.DENUNCIAR)) {
  test('deve chamar navigate ao tocar no cartao Denunciar', () => {
    const {
      getByTestId
    } = render(<ForcaTarefa navigation={navigation} />);
    const itemCartaoHome = getByTestId('cartaoHome-forcaTarefa-acao-denuncias');
    fireEvent.press(itemCartaoHome);

    expect(mockedNavigate).toHaveBeenCalled();
  });

  test('deve chamar navigate ao tocar em termos de uso', () => {
    const {
      getByTestId
    } = render(<Denunciar />);
    const hyperlink = getByTestId('termo-de-uso');
    fireEvent.press(hyperlink);

    expect(mockedNavigate).toHaveBeenCalled();
  });
  test('deve chamar navigate ao tocar em termos de uso', () => {
    const {
      getByTestId
    } = render(<Denunciar />);
    const hyperlink = getByTestId('texto1');

    expect(hyperlink.children).not.toBeNull();
  });

  test('verificar botao mandar e-mail na tela denunciar', () => {
    const {
      getByTestId
    } = render(<Denunciar />,);
    const botao = getByTestId('botao-mandar-email');
    fireEvent.press(botao);

    expect(botao).not.toBeNull();
  });

  test('verificar botao ligar para sus na tela denunciar', () => {
    const {
      getByTestId
    } = render(<Denunciar />,);
    const botao = getByTestId('botao-ligar-sus');
    fireEvent.press(botao);

    expect(botao).not.toBeNull();
  });
} else {
  test('teste de exemplo', () => {
    expect(true);
  });
}
