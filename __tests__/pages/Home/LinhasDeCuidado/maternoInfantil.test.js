
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import MaternoInfantil from '../../../../src/pages/Home/LinhasDeCuidado/maternoInfantil/index';
import { analyticsData } from '../../../../src/utils/analytics';
import { TESTIDS } from '../../../../src/constantes/testIDs';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn()
}));

test('deve chamar o analytics data ao clicar no item Nascer no Ceará em materno infantil ', () => {
  const { getByTestId } = render(<MaternoInfantil navigation={mockedNavigate} />);
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.NASCER_CEARA);
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

/* test('deve chamar o analytics data ao clicar no item Estratificação de Risco em materno infantil ', () => {
  const { getByTestId } = render(<MaternoInfantil navigation={mockedNavigate} />);
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.ESTRATIFICACAO_RISCO);
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar no item Pré-natal de risco habitual em materno infantil ', () => {
  const { getByTestId } = render(<MaternoInfantil navigation={mockedNavigate} />);
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL);
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
}); */

