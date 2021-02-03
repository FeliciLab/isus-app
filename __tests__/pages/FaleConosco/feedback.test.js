import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { labelsAnalytics } from '../../../src/constantes/labelsAnalytics';
import { TESTIDS } from '../../../src/constantes/testIDs';
import Feedback from '../../../src/pages/FaleConoscoScreen/feedback';
import { analyticsData } from '../../../src/utils/analytics';
import { RELATAR_PROBLEMA } from '../../../src/pages/FaleConoscoScreen/tiposDeOcorrencia';

const mockedNavigate = jest.fn();
jest.mock('../../../src/utils/validadores.js', () => ({
  feedbackValido: jest.fn(() => true),
  emailValido: jest.fn(() => true)
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
let BotaoFeedback = null;

beforeEach(() => {
  const { getByTestId } = render(<Feedback tipoDeFeedback={RELATAR_PROBLEMA} />);
  BotaoFeedback = getByTestId(TESTIDS.BOTAO_FEEDBACK_ENVIAR);
});


describe('descreve os testes de Fale conosco', () => {
  test('deve renderizar o botão de enviar ao renderizar o Feedback', () => {
    expect(BotaoFeedback).not.toBeNull();
  });

  test('deve  chamar o analyticsData quando clicar no bota botão de enviar', () => {
    fireEvent.press(BotaoFeedback);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve  chamar o analyticsData com os parâmetros corretos quando clicar no bota botão de enviar', () => {
    fireEvent.press(BotaoFeedback);
    expect(analyticsData).toHaveBeenCalledWith(labelsAnalytics.ENVIAR_FEEDBACK, 'Click', 'Fale Conosco');
  });
});
