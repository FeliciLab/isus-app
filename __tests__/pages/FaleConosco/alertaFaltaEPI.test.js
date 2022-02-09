import React from 'react';
import { fireEvent, render } from 'util-teste';
import { labelsAnalytics } from '../../../src/constantes/labelsAnalytics';
import { TESTIDS } from '../../../src/constantes/testIDs';
import { AppTrackTransparencyContext } from '../../../src/context/AppTrackTransparencyContext';
import AlertaFaltaDeEpiScreen from '../../../src/pages/FaleConoscoScreen/alertaFaltaDeEpi';
import { analyticsData } from '../../../src/utils/analytics';

analyticsData();

const mockedNavigate = jest.fn();
jest.mock('../../../src/utils/validadores.js', () => ({
  descricaoValida: jest.fn(() => true),
  unidadeDeSaudeValida: jest.fn(() => true),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn(),
}));

describe('descreve os testes de Fale conosco', () => {
  let BotaoFaltaDeEPI = null;
  beforeEach(() => {
    const { getByTestId } = render(
      <AppTrackTransparencyContext.Provider
        value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
        <AlertaFaltaDeEpiScreen />
      </AppTrackTransparencyContext.Provider>,
    );
    BotaoFaltaDeEPI = getByTestId(TESTIDS.BOTAO_ALERTAEPI_ENVIAR);
  });

  test('deve renderizar o botão de enviar ao renderizar o alertaFaltaEPI', () => {
    expect(BotaoFaltaDeEPI).not.toBeNull();
  });

  test('deve  chamar o analyticsData quando clicar no bota botão de enviar', () => {
    fireEvent.press(BotaoFaltaDeEPI);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve  chamar o analyticsData com os parâmetros corretos quando clicar no bota botão de enviar', () => {
    fireEvent.press(BotaoFaltaDeEPI);
    expect(analyticsData).toHaveBeenCalledWith(
      labelsAnalytics.ENVIAR_ALERTA_FALTA_EPI,
      'Click',
      'Fale Conosco',
    );
  });
});
