import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import LinhasDeCuidado from '../../../../src/pages/Home/LinhasDeCuidado';
import { analyticsData } from '../../../../src/utils/analytics';

const navigation = {
  navigate: jest.fn()
};

test('deve chamar navigate ao clicar no item de manejo', () => {
  const { getByTestId } = render(<LinhasDeCuidado navigation={navigation} />);
  const item = getByTestId('cartaoHome-linhasDeCuidado-manejoCovid');
  fireEvent.press(item);

  expect(navigation.navigate).toHaveBeenCalled();
});

test('deve chamar navigate ao clicar no item de materno infantil', () => {
  const { getByTestId } = render(<LinhasDeCuidado navigation={navigation} />);
  const item = getByTestId('cartaoHome-linhasDeCuidado-maternoInfantil');
  fireEvent.press(item);

  expect(navigation.navigate).toHaveBeenCalled();
});

test('deve chamar navigate ao clicar no item de protocolos', () => {
  const { getByTestId } = render(<LinhasDeCuidado navigation={navigation} />);
  const item = getByTestId('cartaoHome-linhasDeCuidado-protocolos');
  fireEvent.press(item);

  expect(navigation.navigate).toHaveBeenCalled();
});

test('deve renderizar o cartão Home', () => {
  const { getByTestId } = render(<LinhasDeCuidado navigation={navigation} />);
  const item = getByTestId('cartaoHome-linhasDeCuidado-manejoCovid');
  expect(item).not.toBeNull();
});

test('deve chamar o analytics data ao clicar no item Manejo Covid na Home', () => {
  const { getByTestId } = render(<LinhasDeCuidado navigation={navigation} />);
  const item = getByTestId('cartaoHome-linhasDeCuidado-manejoCovid');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar no item Protocolos na Home', () => {
  const { getByTestId } = render(<LinhasDeCuidado navigation={navigation} />);
  const item = getByTestId('cartaoHome-linhasDeCuidado-protocolos');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar no item de materno infantil na Home', () => {
  const { getByTestId } = render(<LinhasDeCuidado navigation={navigation} />);
  const item = getByTestId('cartaoHome-linhasDeCuidado-maternoInfantil');
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});
