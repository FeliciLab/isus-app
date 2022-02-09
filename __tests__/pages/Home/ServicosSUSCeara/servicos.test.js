import React from 'react';
import { fireEvent, render } from 'util-teste';
import { AppTrackTransparencyContext } from '../../../../src/context/AppTrackTransparencyContext';
import Servicos from '../../../../src/pages/Home/Servicos';
import { analyticsData } from '../../../../src/utils/analytics';

const navigation = {
  navigate: jest.fn(),
};

describe('Servicos', () => {
  let renderedObject;
  beforeEach(() => {
    renderedObject = render(
      <AppTrackTransparencyContext.Provider
        value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
        <Servicos navigation={navigation} />
      </AppTrackTransparencyContext.Provider>,
    );
  });

  test('deve chamar o analytics data ao clicar no serviço IntegraSUS', () => {
    const item = renderedObject.getByTestId('cartaoHome-servicos-Integra_SUS');
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o analytics data ao clicar no serviço SUS no Ceará', () => {
    const item = renderedObject.getByTestId('cartaoHome-servicos-SUS_no_Ceara');
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o analytics data ao clicar no serviço Fale Conosco', () => {
    const item = renderedObject.getByTestId('cartaoHome-servicos-Fale_Conosco');
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o analytics data ao clicar no serviço Ações do governo', () => {
    const item = renderedObject.getByTestId(
      'cartaoHome-servicos-Acoes_do_governo',
    );
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o analytics data ao clicar no serviço ESP', () => {
    const item = renderedObject.getByTestId('cartaoHome-servicos-ESP');
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o analytics data ao clicar no ESP Virtual', () => {
    const item = renderedObject.getByTestId('cartaoHome-servicos-ESP_Virtual');
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o analytics data ao clicar no serviço Elmo', () => {
    const item = renderedObject.getByTestId('cartaoHome-servicos-elmo');
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });
});
