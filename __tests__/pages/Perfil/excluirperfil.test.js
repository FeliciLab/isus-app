import React from 'react';
import { fireEvent, render } from 'util-teste';
import featuresAtivas from '~/featureAtivas';
import feature from '~/constantes/features';
import ExcluirPerfil from '~/pages/Perfil/excluirPerfil';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: jest.fn(),
  }),
  useIsFocused: jest.fn(),
}));

if (featuresAtivas.includes(feature.EXCLUSAO_USUARIO)) {
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

    test('verifica o click do botao excluir conta', async () => {
      const toClick = await renderedObject.findByText('EXCLUIR');
      fireEvent.press(toClick);
    });
  });
} else {
  test('teste de exemplo', () => {
    expect(true);
  });
}
