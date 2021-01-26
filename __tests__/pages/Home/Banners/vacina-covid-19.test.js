import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { analyticsData } from '../../../../src/utils/analytics';
import Banners from '../../../../src/pages/Home/Banners';
import { TESTIDS } from '../../../../src/constantes/testIDs';
import estaAtiva from '../../../../src/utils/estaAtiva';
import features from '../../../../src/constantes/features';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    setOptions: jest.fn(),
  }),
  useIsFocused: jest.fn()
}));

let item = null;

if (estaAtiva(features.VACINACOVID19)) {
  beforeEach(() => {
    const width = 400;
    const { getByTestId } = render(<Banners sliderWidth={width} itemWidth={width} />);
    item = getByTestId(TESTIDS.HOME_BANNER_0);
  });

  describe('testes para o banner da vacina do covid19', () => {
    test('deve renderizar o banner da vacina do covid19 quando renderizar o carrossel de banners', () => {
      expect(item).not.toBeNull();
    });

    test('deve chamar a funcao AnalyticsData quando clicar no banner da vacina do covid19', () => {
      fireEvent.press(item);
      expect(analyticsData).toHaveBeenCalled();
    });
  });
}

test('teste de sucesso', () => {
  expect(false);
});
