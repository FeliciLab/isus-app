import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { labelsAnalytics } from '../../../src/constantes/labelsAnalytics';
import { TESTIDS } from '../../../src/constantes/testIDs';
import { analyticsData } from '../../../src/utils/analytics';
import BemVindo from '../../../src/pages/BemVindo';
import { AppTrackTransparencyProvider } from '../../../src/context/AppTrackTransparencyContext';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn()
}));

let BotaoTutorialPular = null;
let BotaoProximoTutorial = null;

beforeEach(() => {
  const { getByTestId } = render(
    <AppTrackTransparencyProvider mock>
      <BemVindo />
    </AppTrackTransparencyProvider>
  );

  BotaoTutorialPular = getByTestId(TESTIDS.BOTAO_TUTORIAL_PULAR);
  BotaoProximoTutorial = getByTestId(TESTIDS.BOTAO_TUTORIAL_PROXIMO);
});


describe('Testes no botão de pular tutorial na tela de tutorial', () => {
  test('deve renderizar o botão de pular tutorial ao renderizar o tutorial', () => {
    expect(BotaoTutorialPular).not.toBeNull();
  });

  test('deve  chamar o analyticsData quando clicar no bota de pular tutorial', () => {
    fireEvent.press(BotaoTutorialPular);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve  chamar o analyticsData com os parâmetros corretos quando clicar no botão de pularTutorial', () => {
    fireEvent.press(BotaoTutorialPular);
    expect(analyticsData).toHaveBeenCalledWith(labelsAnalytics.PULAR_TUTORIAL, 'Click', 'Tutorial');
  });
});

describe('Testes no botão de próximo tutorial na tela de tutorial', () => {
  test('deve renderizar o botão proximo tutorial ao renderizar o tutorial', () => {
    expect(BotaoProximoTutorial).not.toBeNull();
  });

  test('deve  chamar o analyticsData quando clicar no botão de próximo slider', () => {
    fireEvent.press(BotaoProximoTutorial);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve  chamar o analyticsData com os parâmetros corretos  quando clicar no botão de próximo slider', () => {
    fireEvent.press(BotaoProximoTutorial);
    expect(analyticsData).toHaveBeenCalledWith(labelsAnalytics.PROXIMO_TUTORIAL, 'Click', 'Tutorial');
  });
});
