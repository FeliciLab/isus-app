import React from 'react';
import { fireEvent, act, render } from 'util-teste';
import { TESTIDS } from '~/constantes/testIDs';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import AlertarFaltaEPIFrom from '~/pages/FaleConosco/AlertarFaltaEPIFrom';
// import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { analyticsData } from '~/utils/analytics';

const mockedNavigate = jest.fn();

const mockShowFeedBackMessage = jest.fn();

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
        value={{
          trackingStatus: 'active',
          isTrackingAuthorized: true,
        }}>
        <AlertarFaltaEPIFrom showFeedBackMessage={mockShowFeedBackMessage} />
      </AppTrackTransparencyContext.Provider>,
    );
    BotaoFaltaDeEPI = getByTestId(TESTIDS.BOTAO_ALERTAEPI_ENVIAR);
  });

  test('deve renderizar o botão de enviar ao renderizar o AlertarFaltaEPIFrom', () => {
    expect(BotaoFaltaDeEPI).not.toBeNull();
  });

  test('deve ter todos os elementos da tela', async () => {
    const { getByTestId } = render(
      <AppTrackTransparencyContext.Provider
        value={{
          trackingStatus: 'active',
          isTrackingAuthorized: true,
        }}>
        <AlertarFaltaEPIFrom showFeedBackMessage={mockShowFeedBackMessage} />
      </AppTrackTransparencyContext.Provider>,
    );

    const enviarButton = getByTestId(TESTIDS.BOTAO_ALERTAEPI_ENVIAR);

    const descricaoInput = getByTestId('descricaoInput');

    const unidadeDeSaudeInput = getByTestId('unidadeDeSaudeInput');

    const emailInput = getByTestId('emailInput');

    expect(enviarButton).toBeTruthy();
    expect(descricaoInput).toBeTruthy();
    expect(unidadeDeSaudeInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
  });

  test('Deve aparecer as mensagens de erro quando inputs não preenchidos', async () => {
    const { getByTestId, getAllByText } = render(
      <AppTrackTransparencyContext.Provider
        value={{
          trackingStatus: 'active',
          isTrackingAuthorized: true,
        }}>
        <AlertarFaltaEPIFrom showFeedBackMessage={mockShowFeedBackMessage} />
      </AppTrackTransparencyContext.Provider>,
    );

    const enviarButton = getByTestId(TESTIDS.BOTAO_ALERTAEPI_ENVIAR);

    await act(async () => {
      fireEvent.press(enviarButton);
    });

    const msgErrors = getAllByText('Campo obrigatório');

    expect(msgErrors.length).toBe(2);
  });

  test('Não deve chamar o analyticsData com inputs não preenchidos', async () => {
    await act(async () => {
      fireEvent.press(BotaoFaltaDeEPI);
    });

    expect(analyticsData).not.toHaveBeenCalled();
  });

  // TODO: ajustar os testes para poder usar as validações
  // Não conseguimos fazer esses testes pq o analitycis só é chamando quando se conclui o envio dos
  // dados
  // test('deve  chamar o analyticsData quando clicar no bota botão de enviar', () => {
  //   fireEvent.press(BotaoFaltaDeEPI);
  //   expect(analyticsData).toHaveBeenCalled();
  // });

  // test('deve  chamar o analyticsData com os parâmetros corretos quando clicar no bota botão de enviar', () => {
  //   fireEvent.press(BotaoFaltaDeEPI);
  //   expect(analyticsData).toHaveBeenCalledWith(
  //     labelsAnalytics.ENVIAR_ALERTA_FALTA_EPI,
  //     'Click',
  //     'Fale Conosco',
  //   );
  // });
});
