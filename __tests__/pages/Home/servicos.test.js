import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import Servicos from '../../../src/pages/Home/Servicos';
import { analyticsData } from '../../../src/utils/analytics';

const navigation = {
  navigate: jest.fn()
};

test('deve chamar o analytics data ao clicar no serviço IntegraSUS', () => {
  const { getByTestId } = render(<Servicos navigation={navigation} />);
  const item = getByTestId('cartaoHome-servicos-Integra_SUS');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar no serviço SUS no Ceará', () => {
  const { getByTestId } = render(<Servicos navigation={navigation} />);
  const item = getByTestId('cartaoHome-servicos-SUS_no_Ceara');
  fireEvent.press(item);

  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar no serviço Fale Conosco', () => {
  const { getByTestId } = render(<Servicos navigation={navigation} />);
  const item = getByTestId('cartaoHome-servicos-Fale_Conosco');
  fireEvent.press(item);

  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar no serviço Ações do governo', () => {
  const { getByTestId } = render(<Servicos navigation={navigation} />);
  const item = getByTestId('cartaoHome-servicos-Acoes_do_governo');
  fireEvent.press(item);

  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar no serviço ESP', () => {
  const { getByTestId } = render(<Servicos navigation={navigation} />);
  const item = getByTestId('cartaoHome-servicos-ESP');
  fireEvent.press(item);

  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar no ESP Virtual', () => {
  const { getByTestId } = render(<Servicos navigation={navigation} />);
  const item = getByTestId('cartaoHome-servicos-ESP_Virtual');
  fireEvent.press(item);

  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar no serviço Elmo', () => {
  const { getByTestId } = render(<Servicos navigation={navigation} />);
  const item = getByTestId('cartaoHome-servicos-elmo');
  fireEvent.press(item);

  expect(analyticsData).toHaveBeenCalled();
});
