import React from 'react';
import { fireEvent, render } from 'util-teste';
import feature from '../../../src/constantes/features';
import { DadosUsuario } from '../../../src/pages/Perfil/DadosUsuario';
import dadosUsuario from '../../../__mocks__/valores/dadosUsuario';
import estaAtiva from '../../../src/utils/estaAtiva';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

if (estaAtiva(feature.EDICAO_INFO_PESSOAIS)) {
  test('verifica se o botao de edicao esta na tela', () => {
    const {
      getByTestId
    } = render(<DadosUsuario dados={dadosUsuario} />);
    const botao = getByTestId('botao-editar-dado-pessoal');

    expect(botao).not.toBeNull();
  });

  test('deve chamar navigate ao clicar no botao de editar', () => {
    const {
      getByTestId
    } = render(<DadosUsuario dados={dadosUsuario} />,);
    const botao = getByTestId('botao-editar-dado-pessoal');
    fireEvent.press(botao);

    expect(mockedNavigate).toHaveBeenCalled();
  });
} else {
  test('teste de exemplo', () => {
    expect(true);
  });
}
