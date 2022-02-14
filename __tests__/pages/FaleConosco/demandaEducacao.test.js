import React from 'react';
import { fireEvent, render } from 'util-teste';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import DemandaEducacao from '~/pages/FaleConoscoScreen/demandaEducacao';
import { analyticsData } from '~/utils/analytics';

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
  let BotaoDemandaEducacao = null;
  beforeEach(() => {
    const { getByTestId } = render(
      <AppTrackTransparencyContext.Provider
        value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
        <DemandaEducacao />
      </AppTrackTransparencyContext.Provider>,
    );

    BotaoDemandaEducacao = getByTestId(TESTIDS.BOTAO_DEMANDAEDUCACAO_ENVIAR);
  });

  test('deve renderizar o botão de enviar ao renderizar o alertaFaltaEPI', () => {
    expect(BotaoDemandaEducacao).not.toBeNull();
  });

  test('deve  chamar o analyticsData quando clicar no bota botão de enviar', () => {
    fireEvent.press(BotaoDemandaEducacao);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve  chamar o analyticsData com os parâmetros corretos quando clicar no bota botão de enviar', () => {
    fireEvent.press(BotaoDemandaEducacao);
    expect(analyticsData).toHaveBeenCalledWith(
      labelsAnalytics.ENVIAR_DEMANDA_EDUCACAO,
      'Click',
      'Fale Conosco',
    );
  });
});
