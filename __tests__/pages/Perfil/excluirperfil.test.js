import React from 'react';
import { fireEvent, render } from 'util-teste';
import featuresAtivas from '../../../src/featureAtivas';
import feature from '../../../src/constantes/features';
import ExcluirPerfil from '../../../src/pages/Perfil/excluirPerfil';
import { AppTrackTransparencyProvider } from '../../../src/context/AppTrackTransparencyContext';

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
        <AppTrackTransparencyProvider mock>
          <ExcluirPerfil />
        </AppTrackTransparencyProvider>
      );
    });
    test('verificar se botao de excluir perfil existe', () => {
      const botao = renderedObject.getByTestId('botao-excluir-perfil');
      expect(botao).not.toBeNull();
    });

    test('verificar se o nome do botão existe', () => {
      const element = renderedObject.getByText('EXCLUIR CONTA');
      expect(element).not.toBeNull();
    });

    test('verifica o click do botao excluir conta', async () => {
      const toClick = await renderedObject.findByText('EXCLUIR CONTA');
      fireEvent.press(toClick);
    });
  });
} else {
  test('teste de exemplo', () => {
    expect(true);
  });
}
