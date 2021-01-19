import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import ForcaTarefa from '../../../src/pages/Home/ForcaTarefa';
import { analyticsData } from '../../../src/utils/analytics';

const navigation = {
  navigate: jest.fn()
};

test('deve chamar o analytics data ao clicar em Boletins', () => {
  const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
  const item = getByTestId('cartaoHome-forcaTarefa-acao-1');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar em Notificações de casos', () => {
  const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
  const item = getByTestId('cartaoHome-forcaTarefa-acao-2');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});
test('deve chamar o analytics data ao clicar em Farmaco-vigilancia', () => {
  const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
  const item = getByTestId('cartaoHome-forcaTarefa-acao-3');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});
test('deve chamar o analytics data ao clicar em Notas tecnicas', () => {
  const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
  const item = getByTestId('cartaoHome-forcaTarefa-acao-4');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar em central de ventiladores', () => {
  const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
  const item = getByTestId('cartaoHome-forcaTarefa-acao-5');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar em Denuncias', () => {
  const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
  const item = getByTestId('cartaoHome-forcaTarefa-acao-6');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});
