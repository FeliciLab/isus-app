import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { analyticsData } from '../../../../src/utils/analytics';
import Banners from '../../../../src/pages/Home/Banners';
import { TESTIDS } from '../../../../src/constantes/testIDs';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    setOptions: jest.fn(),
  }),
  useIsFocused: jest.fn()
}));

test(`deve chamar o analytics data ao clicar no banner ${TESTIDS.HOME_BANNER_1}`, () => {
  const width = 400;
  const { getByTestId } = render(<Banners sliderWidth={width} itemWidth={width} />);
  const item = getByTestId(TESTIDS.HOME_BANNER_1);
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test(`deve chamar o analytics data ao clicar no banner ${TESTIDS.HOME_BANNER_2}`, () => {
  const width = 400;
  const { getByTestId } = render(<Banners sliderWidth={width} itemWidth={width} />);
  const item = getByTestId(TESTIDS.HOME_BANNER_2);
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test(`deve chamar o analytics data ao clicar no banner ${TESTIDS.HOME_BANNER_3}`, () => {
  const width = 400;
  const { getByTestId } = render(<Banners sliderWidth={width} itemWidth={width} />);
  const item = getByTestId(TESTIDS.HOME_BANNER_3);
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test(`a função analytics data deve conter os parâmetros no banner ${TESTIDS.HOME_BANNER_1}`, () => {
  const width = 400;
  const { getByTestId } = render(<Banners sliderWidth={width} itemWidth={width} />);
  const item = getByTestId(TESTIDS.HOME_BANNER_1);
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalledWith('guia_assistencia_farmaceutica', 'Click', 'Home');
});

test(`a função analytics data deve conter os parâmetros no banner ${TESTIDS.HOME_BANNER_2}`, () => {
  const width = 400;
  const { getByTestId } = render(<Banners sliderWidth={width} itemWidth={width} />);
  const item = getByTestId(TESTIDS.HOME_BANNER_2);
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalledWith('covid_19_heroes', 'Click', 'Home');
});

test(`a função analytics data deve conter os parâmetros no banner ${TESTIDS.HOME_BANNER_3}`, () => {
  const width = 400;
  const { getByTestId } = render(<Banners sliderWidth={width} itemWidth={width} />);
  const item = getByTestId(TESTIDS.HOME_BANNER_3);
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalledWith('id_saude', 'Click', 'Home');
});
