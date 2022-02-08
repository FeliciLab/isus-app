import React from 'react';
import { fireEvent, render } from 'util-teste';
import { AppTrackTransparencyProvider } from '../../../../src/context/AppTrackTransparencyContext';
import ForcaTarefa from '../../../../src/pages/Home/ForcaTarefa';
import { analyticsData } from '../../../../src/utils/analytics';

const navigation = {
  navigate: jest.fn()
};

jest.mock('@react-native-community/netinfo', () => ({
  ...jest.requireActual('@react-native-community/netinfo'),
  useNetInfo: () => ({
    isConnected: true,
  })
}));

describe('ForcaTarefaAntiCorona', () => {
  let renderedObject;
  beforeEach(() => {
    renderedObject = render(
      <AppTrackTransparencyProvider mock>
        <ForcaTarefa navigation={navigation} />
      </AppTrackTransparencyProvider>
    );
  });

  test('deve chamar o analytics data ao clicar em Boletins', () => {
    const item = renderedObject.getByTestId('cartaoHome-forcaTarefa-acao-boletins');
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o analytics data ao clicar em Notificações de casos', () => {
    const item = renderedObject.getByTestId('cartaoHome-forcaTarefa-acao-notificacao');
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o analytics data ao clicar em Farmaco-vigilancia', () => {
    const item = renderedObject.getByTestId('cartaoHome-forcaTarefa-acao-farmaco-viligancia');
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o analytics data ao clicar em Notas tecnicas', () => {
    const item = renderedObject.getByTestId('cartaoHome-forcaTarefa-acao-notas-tecnicas');
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o analytics data ao clicar em Denuncias', () => {
    const item = renderedObject.getByTestId('cartaoHome-forcaTarefa-acao-denuncias');
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });
});
