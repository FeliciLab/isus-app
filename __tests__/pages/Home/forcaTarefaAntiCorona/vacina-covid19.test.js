import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import ForcaTarefa from '../../../../src/pages/Home/ForcaTarefa';
import { analyticsData } from '../../../../src/utils/analytics';


const navigation = {
  navigate: jest.fn()
};

describe('testes da vacina-covid19', () => {
  test('deve mostrar o cartão da vacina-covid19 quando renderizar componente de serviços ', () => {
    const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
    const item = getByTestId('cartaoHome-forcaTarefa-acao-vacinaCOVID19');
    expect(item).not.toBeNull();
  });

  test('deve chamar o analytics data quando clicar em vacina-covid19', () => {
    const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
    const item = getByTestId('cartaoHome-forcaTarefa-acao-vacinaCOVID19');
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });
});
