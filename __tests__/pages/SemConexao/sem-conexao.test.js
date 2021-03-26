/* eslint-disable import/no-unresolved */
import React from 'react';
import { render } from 'util-teste';
import SemConexao from '../../../src/pages/SemConexao';

const route = {
  params: { goHome: true }
};

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useIsFocused: jest.fn()
}));

describe('testes na tela de sem conexão', () => {
  test('deve renderizar a tela de sem conexão renderizando o botão de voltar', () => {
    const { getByTestId } = render(<SemConexao route={route} />);
    const BotaoVoltar = getByTestId('botão-semconexao-voltar');
    expect(BotaoVoltar).not.toBeNull();
  });

  test('deve renderizar a tela de sem conexão renderizando o icone de sem conexao', () => {
    const { getByTestId } = render(<SemConexao route={route} />);
    const imagem = getByTestId('icone-semconexao-imagem');
    expect(imagem).not.toBeNull();
  });
});
