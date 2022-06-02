import React from 'react';
import { act, fireEvent, render } from 'util-teste';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import RelatarProblemaFrom from '~/pages/FaleConosco/RelatarProblemaFrom';
import { analyticsData } from '~/utils/analytics';

jest.mock('../../../src/utils/analytics');
jest.mock('../../../src/apis/apiHome');

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

describe('Testes do RelatarProblemaFrom', () => {
  test('Deve ter todos os elementos da tela', async () => {
    const { getByTestId } = render(
      <AppTrackTransparencyContext.Provider
        value={{
          trackingStatus: 'active',
          isTrackingAuthorized: true,
        }}>
        <RelatarProblemaFrom showFeedBackMessage={mockShowFeedBackMessage} />
      </AppTrackTransparencyContext.Provider>,
    );

    const enviarButton = getByTestId(TESTIDS.BOTAO_FEEDBACK_ENVIAR);

    const motivoInput = getByTestId('motivoInput');

    const emailInput = getByTestId('emailInput');

    expect(enviarButton).toBeTruthy();
    expect(motivoInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
  });

  test('Deve aparecer as mensagens de erro quando inputs não preenchidos', async () => {
    const { getByTestId, getAllByText } = render(
      <AppTrackTransparencyContext.Provider
        value={{
          trackingStatus: 'active',
          isTrackingAuthorized: true,
        }}>
        <RelatarProblemaFrom showFeedBackMessage={mockShowFeedBackMessage} />
      </AppTrackTransparencyContext.Provider>,
    );

    const enviarButton = getByTestId(TESTIDS.BOTAO_FEEDBACK_ENVIAR);

    await act(async () => {
      fireEvent.press(enviarButton);
    });

    const msgErrors = getAllByText('Campo obrigatório');

    expect(msgErrors.length).toBe(2);
  });

  test('Deve aparecer as mensagem de erro para email inválido', async () => {
    const { getByTestId, getByText } = render(
      <AppTrackTransparencyContext.Provider
        value={{
          trackingStatus: 'active',
          isTrackingAuthorized: true,
        }}>
        <RelatarProblemaFrom showFeedBackMessage={mockShowFeedBackMessage} />
      </AppTrackTransparencyContext.Provider>,
    );

    const enviarButton = getByTestId(TESTIDS.BOTAO_FEEDBACK_ENVIAR);

    const emailInput = getByTestId('emailInput');

    // email inválido
    fireEvent.changeText(emailInput, 'ABCDEFG');

    await act(async () => {
      fireEvent.press(enviarButton);
    });

    const msgError = getByText('Email inválido');

    expect(msgError).toBeTruthy();
  });

  test('Não deve aparecer a mensagem de erro para email válido', async () => {
    const { getByTestId, queryByText } = render(
      <AppTrackTransparencyContext.Provider
        value={{
          trackingStatus: 'active',
          isTrackingAuthorized: true,
        }}>
        <RelatarProblemaFrom showFeedBackMessage={mockShowFeedBackMessage} />
      </AppTrackTransparencyContext.Provider>,
    );

    const enviarButton = getByTestId(TESTIDS.BOTAO_FEEDBACK_ENVIAR);

    const emailInput = getByTestId('emailInput');

    // email válido
    fireEvent.changeText(emailInput, 'emial@email.com');

    await act(async () => {
      fireEvent.press(enviarButton);
    });

    const msgError = queryByText('Email inválido');

    expect(msgError).not.toBeTruthy();
  });

  test('Não deve chamar o analyticsData com inputs não preenchidos', async () => {
    const { getByTestId } = render(
      <AppTrackTransparencyContext.Provider
        value={{
          trackingStatus: 'active',
          isTrackingAuthorized: true,
        }}>
        <RelatarProblemaFrom showFeedBackMessage={mockShowFeedBackMessage} />
      </AppTrackTransparencyContext.Provider>,
    );

    const enviarButton = getByTestId(TESTIDS.BOTAO_FEEDBACK_ENVIAR);

    await act(async () => {
      fireEvent.press(enviarButton);
    });

    expect(analyticsData).not.toHaveBeenCalled();
  });

  test('Deve chamar o analyticsData com inputs preenchidos corretamente', async () => {
    const { getByTestId } = render(
      <AppTrackTransparencyContext.Provider
        value={{
          trackingStatus: 'active',
          isTrackingAuthorized: true,
        }}>
        <RelatarProblemaFrom showFeedBackMessage={mockShowFeedBackMessage} />
      </AppTrackTransparencyContext.Provider>,
    );

    const enviarButton = getByTestId(TESTIDS.BOTAO_FEEDBACK_ENVIAR);

    const motivoInput = getByTestId('motivoInput');
    const emailInput = getByTestId('emailInput');

    fireEvent.changeText(motivoInput, 'Alguma coisa para testar');
    fireEvent.changeText(emailInput, 'email@email.com');

    await act(async () => {
      fireEvent.press(enviarButton);
    });

    expect(analyticsData).toHaveBeenCalledWith(
      labelsAnalytics.ENVIAR_FEEDBACK,
      'Click',
      'Fale Conosco',
    );
  });
});
