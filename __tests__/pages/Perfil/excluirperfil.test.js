import React from 'react';
import { render } from 'util-teste';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import ExcluirPerfil from '~/pages/Perfil/ExcluirPerfil';

jest.useFakeTimers();

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: jest.fn(),
  }),
  useIsFocused: jest.fn(),
}));

describe('ExcluirPerfil', () => {
  let renderedObject;
  beforeEach(() => {
    renderedObject = render(
      <AppTrackTransparencyContext.Provider
        value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
        <ExcluirPerfil />
      </AppTrackTransparencyContext.Provider>,
    );
  });

  test('verificar se botao de excluir perfil existe', () => {
    const botao = renderedObject.getByTestId('botao-excluir-perfil');
    expect(botao).not.toBeNull();
  });

  test('verificar se o nome do botão existe', () => {
    const element = renderedObject.getByText('EXCLUIR');
    expect(element).not.toBeNull();
  });
});
