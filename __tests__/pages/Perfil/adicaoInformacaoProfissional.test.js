import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { DadosUsuarioProfissional } from '../../../src/pages/Perfil/DadosUsuario';
import dadosUsuarioSemInfoProfissional from '../../../__mocks__/valores/dadosUsuarioSemInfoProfisisonal';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

test('verifica se o botao de adicao esta na tela', () => {
  const {
    getByTestId
  } = render(<DadosUsuarioProfissional dados={dadosUsuarioSemInfoProfissional} />,);
  const botao = getByTestId('botao-dados-adicionar');

  expect(botao).not.toBeNull();
});

test('adicao de informações profissionais', () => {
  const {
    getByTestId
  } = render(<DadosUsuarioProfissional dados={dadosUsuarioSemInfoProfissional} />,);
  const botao = getByTestId('botao-dados-adicionar');
  fireEvent.press(botao);

  expect(mockedNavigate).toHaveBeenCalled();
});
