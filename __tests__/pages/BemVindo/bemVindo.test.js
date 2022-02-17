import React from 'react';
import { fireEvent, render } from 'util-teste';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';
import { analyticsData } from '~/utils/analytics';
import BemVindo from '~/pages/BemVindo';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn(),
}));

let BotaoTutorialPular = null;
let BotaoProximoTutorial = null;

beforeEach(() => {
  const { getByTestId } = render(
    <AppTrackTransparencyContext.Provider
      value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
      <BemVindo />
    </AppTrackTransparencyContext.Provider>,
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
    expect(analyticsData).toHaveBeenCalledWith(
      labelsAnalytics.PULAR_TUTORIAL,
      'Click',
      'Tutorial',
    );
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
    expect(analyticsData).toHaveBeenCalledWith(
      labelsAnalytics.PROXIMO_TUTORIAL,
      'Click',
      'Tutorial',
    );
  });
});
