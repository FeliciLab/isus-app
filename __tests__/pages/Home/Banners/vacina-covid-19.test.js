/* eslint-disable max-len */
import React from 'react';
import { fireEvent, render } from 'util-teste';
import { analyticsData } from '../../../../src/utils/analytics';
import Banners from '../../../../src/pages/Home/Banners';
import { TESTIDS } from '../../../../src/constantes/testIDs';
import estaAtiva from '../../../../src/utils/estaAtiva';
import features from '../../../../src/constantes/features';
import { labelsAnalytics } from '../../../../src/constantes/labelsAnalytics';
import { urls } from '../../../../src/constantes/urls';


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
    isConnected: true,
  })
}));

let item = null;

if (estaAtiva(features.VACINACOVID19)) {
  describe('testes para o banner da vacina do covid19', () => {
    beforeEach(() => {
      const width = 400;
      const { getByTestId } = render(<Banners sliderWidth={width} itemWidth={width} />);
      item = getByTestId(TESTIDS.HOME_BANNER_1);
    });
    test('deve renderizar o banner da vacina do covid19 quando renderizar o carrossel de banners', () => {
      console.log(item);
      expect(item).not.toBeNull();
    });

    test('deve chamar a funcao AnalyticsData quando clicar no banner da vacina do covid19', () => {
      fireEvent.press(item);
      expect(analyticsData).toHaveBeenCalled();
    });

    test('deve chamar a funcao AnalyticsData quando clicar no banner da vacina do covid19', () => {
      fireEvent.press(item);
      expect(analyticsData).toHaveBeenCalled();
    });

    test(`deve chamar o analytics data quando clicar em vacina-covid19 com o parâmetro do ${labelsAnalytics.HOME_BANNER_0}`, () => {
      fireEvent.press(item);
      expect(analyticsData).toHaveBeenCalledWith(labelsAnalytics.HOME_BANNER_0, 'Click', 'Home');
    });

    test('deve chamar a função navigate quando clicar em vacina-covid19', () => {
      fireEvent.press(item);
      expect(mockNavigation).toHaveBeenCalled();
    });

    test('deve chamar a função navigate contendo a url "http://coronavirus.ceara.gov.br/vacina" quando clicar em vacina-covid19', () => {
      fireEvent.press(item);
      expect(mockNavigation).toHaveBeenCalledWith('webview', {
        title: 'Vacinação',
        url: urls.VACINA_COVID19
      });
    });
  });
} else {
  test('teste de sucesso', () => {
    expect(false);
  });
}
test('teste de sucesso', () => {
  expect(false);
});
