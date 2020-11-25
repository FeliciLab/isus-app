import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import estaAtiva from '../../../src/utils/estaAtiva';
import feature from '../../../src/constantes/features';
import LinhasDeCuidado from '../../../src/pages/Home/LinhasDeCuidado';

const navigation = {
  navigate: jest.fn()
};

if (estaAtiva(feature.EDICAO_DE_INFORMACOES_PROFISSIONAIS)) {
  test('deve chamar navigate ao clicar no item', () => {
    const { getByTestId } = render(<LinhasDeCuidado navigation={navigation} />);
    const item = getByTestId('cartaoHome-linhasDeCuidado-linha-1');
    fireEvent.press(item);

    expect(navigation.navigate).toHaveBeenCalled();
  });

  test('deve renderizar o cartão Home', () => {
    const { getByTestId } = render(<LinhasDeCuidado navigation={navigation} />);
    const item = getByTestId('cartaoHome-linhasDeCuidado-linha-1');
    expect(item).not.toBeNull();
  });
}
