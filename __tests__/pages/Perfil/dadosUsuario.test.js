import React from 'react';
import { fireEvent, render } from 'util-teste';
import { AppTrackTransparencyProvider } from '~/context/AppTrackTransparencyContext';
import { DadosUsuario } from '~/pages/Perfil/DadosUsuario';
import dadosUsuario from '../../../__mocks__/valores/dadosUsuario';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

describe('DadosUsuario', () => {
  let renderObject;
  beforeEach(() => {
    renderObject = render(
      <AppTrackTransparencyProvider mock>
        <DadosUsuario dados={dadosUsuario} />
      </AppTrackTransparencyProvider>
    );
  });

  test('verifica se o botao de edicao esta na tela', () => {
    const botao = renderObject.getByTestId('botao-editar-dado-pessoal');
    expect(botao).not.toBeNull();
  });

  test('deve chamar navigate ao clicar no botao de editar', () => {
    const botao = renderObject.getByTestId('botao-editar-dado-pessoal');
    fireEvent.press(botao);
    expect(mockedNavigate).toHaveBeenCalled();
  });
});
