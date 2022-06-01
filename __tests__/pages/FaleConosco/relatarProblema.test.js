import React from 'react';
import {
  // fireEvent,
  render,
} from 'util-teste';
import { TESTIDS } from '~/constantes/testIDs';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import RelatarProblemaFrom from '~/pages/FaleConosco/RelatarProblemaFrom';
// import { labelsAnalytics } from '~/constantes/labelsAnalytics';
// import { analyticsData } from '~/utils/analytics';

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
let BotaoFeedback = null;

beforeEach(() => {
  const { getByTestId } = render(
    <AppTrackTransparencyContext.Provider
      value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
      <RelatarProblemaFrom showFeedBackMessage={mockShowFeedBackMessage} />
    </AppTrackTransparencyContext.Provider>,
  );
  BotaoFeedback = getByTestId(TESTIDS.BOTAO_FEEDBACK_ENVIAR);
});

describe('descreve os testes de Fale conosco', () => {
  test('deve renderizar o botão de enviar ao renderizar o Feedback', () => {
    expect(BotaoFeedback).not.toBeNull();
  });

  // TODO: ajustar os testes para poder usar as validações
  // Não conseguimos fazer esses testes pq o analitycis só é chamando quando se conclui o envio dos
  // dados
  // test('deve  chamar o analyticsData quando clicar no bota botão de enviar', () => {
  //   fireEvent.press(BotaoFeedback);
  //   expect(analyticsData).toHaveBeenCalled();
  // });

  // test('deve  chamar o analyticsData com os parâmetros corretos quando clicar no bota botão de enviar', () => {
  //   fireEvent.press(BotaoFeedback);
  //   expect(analyticsData).toHaveBeenCalledWith(
  //     labelsAnalytics.ENVIAR_FEEDBACK,
  //     'Click',
  //     'Fale Conosco',
  //   );
  // });
});
