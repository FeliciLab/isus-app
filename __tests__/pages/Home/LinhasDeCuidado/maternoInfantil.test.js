
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import MaternoInfantil from '../../../../src/pages/Home/LinhasDeCuidado/maternoInfantil/index';
import { analyticsData } from '../../../../src/utils/analytics';
import { TESTIDS } from '../../../../src/constantes/testIDs';
import { labelsAnalytics } from '../../../../src/constantes/labelsAnalytics';

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

test(`deve chamar o analytics data ao clicar no item 
${TESTIDS.MATERNO_INFANTIL.NASCER_CEARA}`, () => {
  const { getByTestId } = render(
  <MaternoInfantil />
  );
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.NASCER_CEARA);
  fireEvent.press(item);
  expect(analyticsData).toBeCalled();
});


test(`deve chamar o analytics data ao clicar no item 
    ${TESTIDS.MATERNO_INFANTIL.NASCER_CEARA}
    com os parâmetros corretos`, () => {
  const { getByTestId } = render(
    <MaternoInfantil />
  );
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.NASCER_CEARA);

  fireEvent.press(item);
  expect(analyticsData).toBeCalledWith(
    labelsAnalytics.MATERNO_INFANTIL.NASCER_NO_CEARA,
    'Click',
    'Materno Infantil'
  );
});

// test(`deve chamar o analytics data ao clicar no item
//       ${TESTIDS.MATERNO_INFANTIL.ESTRATIFICACAO_RISCO}`, () => {
//   const { getByTestId } = render(<MaternoInfantil />);
//   const item = getByTestId(TESTIDS.MATERNO_INFANTIL.ESTRATIFICACAO_RISCO);

//   fireEvent.press(item);
//   expect(analyticsData).toBeCalled();
// });


// test(`deve chamar o analytics data ao clicar no item
//     ${TESTIDS.MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL}`, () => {
//   const { getByTestId } = render(<MaternoInfantil navigation={mockedNavigate} />);
//   const item = getByTestId(TESTIDS.MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL);
//   fireEvent.press(item);
//   expect(analyticsData).toHaveBeenCalled();
// });
