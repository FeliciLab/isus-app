import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { analyticsData } from '../../../../src/utils/analytics';
import Banners from '../../../../src/pages/Home/Banners';
import { TESTIDS } from '../../../../src/constantes/testIDs';
import { labelsAnalytics } from '../../../../src/constantes/labelsAnalytics';
import rotas from '../../../../src/constantes/rotas';

const mockNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigation,
    setOptions: jest.fn(),
  }),
  useIsFocused: jest.fn()
}));

jest.mock('@react-native-community/netinfo', () => ({
  ...jest.requireActual('@react-native-community/netinfo'),
  useNetInfo: () => ({
    isConnected: false,
  })
}));

let HomeBanner0 = null;
let HomeBanner1 = null;
let HomeBanner2 = null;


beforeEach(() => {
  const width = 400;
  const { getByTestId } = render(<Banners sliderWidth={width} itemWidth={width} />);
  HomeBanner0 = getByTestId(TESTIDS.HOME_BANNER_0);
  HomeBanner1 = getByTestId(TESTIDS.HOME_BANNER_1);
  HomeBanner2 = getByTestId(TESTIDS.HOME_BANNER_2);
});

describe('Testes do Analytics em Banners', () => {
  test(`deve chamar o analytics data ao clicar no banner ${TESTIDS.HOME_BANNER_1}`, () => {
    fireEvent.press(HomeBanner1);
    expect(analyticsData).toHaveBeenCalled();
  });

  test(`deve chamar o analytics data ao clicar no banner ${TESTIDS.HOME_BANNER_2}`, () => {
    fireEvent.press(HomeBanner2);
    expect(analyticsData).toHaveBeenCalled();
  });

  test(`a função analytics data deve conter os parâmetros no banner ${TESTIDS.HOME_BANNER_1}`, () => {
    fireEvent.press(HomeBanner1);
    expect(analyticsData).toHaveBeenCalledWith(labelsAnalytics.HOME_BANNER_1, 'Click', 'Home');
  });

  test(`a função analytics data deve conter os parâmetros no banner ${TESTIDS.HOME_BANNER_2}`, () => {
    fireEvent.press(HomeBanner2);
    expect(analyticsData).toHaveBeenCalledWith(labelsAnalytics.HOME_BANNER_2, 'Click', 'Home');
  });
});

describe('Teste de cenário de sem conexão dos Banners', () => {
  test('deve chamar a função navigate com o parâmetro sem conexao quando clicar no banner vacina-covid19', () => {
    fireEvent.press(HomeBanner0);
    expect(mockNavigation).toHaveBeenCalledWith(rotas.SEM_CONEXAO);
  });
});
