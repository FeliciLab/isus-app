import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { DadosUsuarioProfissional } from '../../../src/pages/Perfil/DadosUsuario';
import dadosUsuario from '../../../__mocks__/valores/dadosUsuario';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

test('veriica se o botao de edicao esta na tela', () => {
  const {
    getByTestId
  } = render(<DadosUsuarioProfissional dados={dadosUsuario} />,);
  const botao = getByTestId('botao-dados-editar');

  expect(botao).not.toBeNull();
});

test('edicao de informações profissionais', () => {
  const {
    getByTestId
  } = render(<DadosUsuarioProfissional dados={dadosUsuario} />,);
  const botao = getByTestId('botao-dados-editar');
  fireEvent.press(botao);

  expect(mockedNavigate).toHaveBeenCalled();
});
