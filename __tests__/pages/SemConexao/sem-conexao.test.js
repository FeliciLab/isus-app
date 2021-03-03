/* eslint-disable import/no-unresolved */
import React from 'react';
import { render } from 'util-teste';
import SemConexao from '../../../src/pages/SemConexao';

const route = {
  params: { goHome: true }
};

const navigation = {
  setOptions: jest.fn()
};

describe('testes na tela de sem conexão', () => {
  test('deve renderizar a tela de sem conexão renderizando o botão de voltar', () => {
    const { getByTestId } = render(<SemConexao route={route} navigation={navigation} />);
    const BotaoVoltar = getByTestId('botão-semconexao-voltar');
    expect(BotaoVoltar).not.toBeNull();
  });
});
