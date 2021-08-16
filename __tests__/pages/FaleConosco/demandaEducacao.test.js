import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { labelsAnalytics } from '../../../src/constantes/labelsAnalytics';
import { TESTIDS } from '../../../src/constantes/testIDs';
import { AppTrackTransparencyProvider } from '../../../src/context/AppTrackTransparencyContext';
import DemandaEducacao from '../../../src/pages/FaleConoscoScreen/demandaEducacao';
import { analyticsData } from '../../../src/utils/analytics';

const mockedNavigate = jest.fn();
jest.mock('../../../src/utils/validadores.js', () => ({
  descricaoValida: jest.fn(() => true),
  unidadeDeSaudeValida: jest.fn(() => true)
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn()
}));

describe('descreve os testes de Fale conosco', () => {
  let BotaoDemandaEducacao = null;
  beforeEach(() => {
    const { getByTestId } = render(
      <AppTrackTransparencyProvider mock>
        <DemandaEducacao />
      </AppTrackTransparencyProvider>
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
    expect(analyticsData).toHaveBeenCalledWith(labelsAnalytics.ENVIAR_DEMANDA_EDUCACAO, 'Click', 'Fale Conosco');
  });
});
