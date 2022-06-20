import React from 'react';
import { fireEvent, render } from 'util-teste';
import rotas from '~/constantes/rotas';
import PreCadastroIntroducao from '~/pages/PreCadastro/PreCadastroIntroducao/index';

const mockNavigation = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigation,
  }),
}));

const renderPreCadastroIntroducao = () => render(<PreCadastroIntroducao />);

describe('PreCadastroIntroducao', () => {
  test('deve conter o botão Continuar', () => {
    const { getByText } = renderPreCadastroIntroducao();

    const continuarButton = getByText('Continuar');

    expect(continuarButton).toBeTruthy();
  });

  test('deve deve navegar para a tela de PreCadastroInfoPessoal', () => {
    const { getByText } = renderPreCadastroIntroducao();

    const continuarButton = getByText('Continuar');

    fireEvent.press(continuarButton);

    expect(mockNavigation).toHaveBeenCalledWith(
      rotas.PRE_CADASTRO_INFO_PESSOAL,
    );
  });
});
