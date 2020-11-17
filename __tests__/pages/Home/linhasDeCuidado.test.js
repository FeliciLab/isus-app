import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import featureAtivas from '../../../src/featureAtivas';
import feature from '../../../src/constantes/features';
import LinhasDeCuidado from '../../../src/pages/Home/LinhasDeCuidado';

const navigation = {
  navigate: jest.fn()
};

if (featureAtivas.includes(feature.EDICAO_DE_INFORMACOES_PROFISSIONAIS)) {
  test('deve chamar navigate ao clicar no item', () => {
    const { getByTestId } = render(<LinhasDeCuidado navigation={navigation} />);
    const item = getByTestId('teste');
    fireEvent.press(item);

    expect(navigation.navigate).toHaveBeenCalled();
  });
}
