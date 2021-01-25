import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import labelsDoAnalytics from '../../../../src/constantes/labelsDoAnalytics';
import ForcaTarefa from '../../../../src/pages/Home/ForcaTarefa';
import { analyticsData } from '../../../../src/utils/analytics';

let item = null;

const navigation = {
  navigate: jest.fn()
};

beforeEach(() => {
  const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
  item = getByTestId('cartaoHome-forcaTarefa-acao-vacinaCOVID19');
});

describe('testes do cartão da vacina covid19', () => {
  test('deve mostrar o cartão da vacina-covid19 quando renderizar componente de serviços ', () => {
    expect(item).not.toBeNull();
  });

  test('deve chamar o analytics data quando clicar em vacina-covid19', () => {
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o analytics data quando clicar em vacina-covid19', () => {
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalledWith(labelsDoAnalytics.CARTAO_VACINA_COVID19, 'Click', 'Home');
  });

  test('deve chamar a função navigate contendo a url "http://coronavirus.ceara.gov.br/vacina" quando clicar em vacina-covid19 ', () => {
    fireEvent.press(item);
    expect(navigation.navigate).toHaveBeenCalledWith('webview', {
      title: 'Vacinação',
      url: 'https://coronavirus.ceara.gov.br/vacina'
    });
  });
});
