/* eslint-disable import/no-unresolved */
import React from 'react';
import { render } from 'util-teste';
import SemConexao from '../../../src/pages/SemConexao';


describe('testes na tela de sem conexão', () => {
  test('deve renderizar a tela de sem conexão renderizando o botão de voltar', () => {
    const { getByTestId } = render(<SemConexao />);
    const BotaoVoltar = getByTestId('botão-semconexao-voltar');
    expect(BotaoVoltar).not.toBeNull();
  });
});
