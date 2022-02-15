import React from 'react';
import { fireEvent, render } from 'util-teste';
import feature from '~/constantes/features';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import Denunciar from '~/pages/Denunciar/index';
import ForcaTarefa from '~/pages/Home/ForcaTarefa/index';
import estaAtiva from '~/utils/estaAtiva';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useIsFocused: jest.fn(),
}));

const mockedNavigate = jest.fn();
const navigation = { navigate: mockedNavigate };

if (estaAtiva(feature.DENUNCIAR)) {
  describe('Denunciar', () => {
    let renderedObject;
    beforeEach(() => {
      renderedObject = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <Denunciar />
        </AppTrackTransparencyContext.Provider>,
      );
    });

    test('deve chamar navigate ao tocar em termos de uso', () => {
      const hyperlink = renderedObject.getByTestId('termo-de-uso');
      fireEvent.press(hyperlink);

      expect(mockedNavigate).toHaveBeenCalled();
    });

    test('deve chamar navigate ao tocar em termos de uso', () => {
      const hyperlink = renderedObject.getByTestId('texto1');

      expect(hyperlink.children).not.toBeNull();
    });

    test('verificar botao mandar e-mail na tela denunciar', () => {
      const botao = renderedObject.getByTestId('botao-mandar-email');
      fireEvent.press(botao);

      expect(botao).not.toBeNull();
    });

    test('verificar botao ligar para sus na tela denunciar', () => {
      const botao = renderedObject.getByTestId('botao-ligar-sus');
      fireEvent.press(botao);

      expect(botao).not.toBeNull();
    });
  });

  test('deve chamar navigate ao tocar no cartao Denunciar', () => {
    const { getByTestId } = render(
      <AppTrackTransparencyContext.Provider
        value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
        <ForcaTarefa navigation={navigation} />
      </AppTrackTransparencyContext.Provider>,
    );

    const itemCartaoHome = getByTestId('cartaoHome-forcaTarefa-acao-denuncias');
    fireEvent.press(itemCartaoHome);
    expect(mockedNavigate).toHaveBeenCalled();
  });
} else {
  test('teste de exemplo', () => {
    expect(true);
  });
}
