import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import ForcaTarefa from '../../../../src/pages/Home/ForcaTarefa';
import { analyticsData } from '../../../../src/utils/analytics';

const navigation = {
  navigate: jest.fn()
};

test('deve chamar o analytics data ao clicar em Boletins', () => {
  const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
  const item = getByTestId('cartaoHome-forcaTarefa-acao-boletins');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar em Notificações de casos', () => {
  const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
  const item = getByTestId('cartaoHome-forcaTarefa-acao-notificacao');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});
test('deve chamar o analytics data ao clicar em Farmaco-vigilancia', () => {
  const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
  const item = getByTestId('cartaoHome-forcaTarefa-acao-farmaco-viligancia');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});
test('deve chamar o analytics data ao clicar em Notas tecnicas', () => {
  const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
  const item = getByTestId('cartaoHome-forcaTarefa-acao-notas-tecnicas');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar em central de ventiladores', () => {
  const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
  const item = getByTestId('cartaoHome-forcaTarefa-acao-central');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar em Denuncias', () => {
  const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
  const item = getByTestId('cartaoHome-forcaTarefa-acao-denuncias');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});
