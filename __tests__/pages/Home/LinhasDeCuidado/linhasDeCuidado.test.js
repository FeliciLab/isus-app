import React from 'react';
import { fireEvent, render } from 'util-teste';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import LinhasDeCuidado from '~/pages/Home/LinhasDeCuidado';
import { analyticsData } from '~/utils/analytics';

const navigation = {
  navigate: jest.fn(),
};
describe('LinhasDeCuidado', () => {
  let renderedObject;
  beforeEach(() => {
    renderedObject = render(
      <AppTrackTransparencyContext.Provider
        value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
        <LinhasDeCuidado navigation={navigation} />
      </AppTrackTransparencyContext.Provider>,
    );
  });

  test('deve chamar navigate ao clicar no item de manejo', () => {
    const item = renderedObject.getByTestId(
      'cartaoHome-linhasDeCuidado-manejoCovid',
    );
    fireEvent.press(item);

    expect(navigation.navigate).toHaveBeenCalled();
  });

  test('deve chamar navigate ao clicar no item de materno infantil', () => {
    const item = renderedObject.getByTestId(
      'cartaoHome-linhasDeCuidado-maternoInfantil',
    );
    fireEvent.press(item);

    expect(navigation.navigate).toHaveBeenCalled();
  });

  test('deve chamar navigate ao clicar no item de protocolos', () => {
    const item = renderedObject.getByTestId(
      'cartaoHome-linhasDeCuidado-protocolos',
    );
    fireEvent.press(item);

    expect(navigation.navigate).toHaveBeenCalled();
  });

  test('deve renderizar o cartão Home', () => {
    const item = renderedObject.getByTestId(
      'cartaoHome-linhasDeCuidado-manejoCovid',
    );
    expect(item).not.toBeNull();
  });

  test('deve chamar o analytics data ao clicar no item Manejo Covid na Home', () => {
    const item = renderedObject.getByTestId(
      'cartaoHome-linhasDeCuidado-manejoCovid',
    );
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o analytics data ao clicar no item Protocolos na Home', () => {
    const item = renderedObject.getByTestId(
      'cartaoHome-linhasDeCuidado-protocolos',
    );
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o analytics data ao clicar no item de materno infantil na Home', () => {
    const item = renderedObject.getByTestId(
      'cartaoHome-linhasDeCuidado-maternoInfantil',
    );
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });
});
