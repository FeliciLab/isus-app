
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
  const route = {
    params: {
      expanded: true
    }
  };

  const { getByTestId } = render(
  <MaternoInfantil route={route} />
  );
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.NASCER_CEARA);
  fireEvent.press(item);
  expect(analyticsData).toBeCalled();
});


test(`deve chamar o analytics data ao clicar no item 
    ${TESTIDS.MATERNO_INFANTIL.NASCER_CEARA}
    com os parâmetros corretos`, () => {
  const route = {
    params: {
      expanded: true
    }
  };
  const { getByTestId } = render(
    <MaternoInfantil route={route} />
  );
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.NASCER_CEARA);

  fireEvent.press(item);
  expect(analyticsData).toBeCalledWith(
    labelsAnalytics.MATERNO_INFANTIL.NASCER_NO_CEARA,
    'Click',
    'Materno Infantil'
  );
});

test(`deve chamar o analytics data ao clicar no item
      ${TESTIDS.MATERNO_INFANTIL.ESTRATIFICACAO_RISCO}`, () => {
  const route = {
    params: {
      expanded: false
    }
  };
  const { getByTestId } = render(<MaternoInfantil route={route} />);
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.ESTRATIFICACAO_RISCO);

  fireEvent.press(item);
  expect(analyticsData).toBeCalled();
});


test(`deve chamar o analytics data ao clicar no item
      ${TESTIDS.MATERNO_INFANTIL.ESTRATIFICACAO_RISCO}
      com parâmetros corretos.`, () => {
  const route = {
    params: {
      expanded: false
    }
  };
  const { getByTestId } = render(<MaternoInfantil route={route} />);
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.ESTRATIFICACAO_RISCO);

  fireEvent.press(item);
  expect(analyticsData).toBeCalledWith(
    labelsAnalytics.MATERNO_INFANTIL.ESTRATIFICACAO_DE_RISCO,
    'Click',
    'Materno Infantil'
  );
});

test(`deve chamar o analytics data ao clicar no item
      ${TESTIDS.MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL}`, () => {
  const route = {
    params: {
      expanded: false
    }
  };
  const { getByTestId } = render(<MaternoInfantil route={route} />);
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL);

  fireEvent.press(item);
  expect(analyticsData).toBeCalled();
});


test(`deve chamar o analytics data ao clicar no item
      ${TESTIDS.MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL}
      com parâmetros corretos.`, () => {
  const route = {
    params: {
      expanded: false
    }
  };
  const { getByTestId } = render(<MaternoInfantil route={route} />);
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL);

  fireEvent.press(item);
  expect(analyticsData).toBeCalledWith(
    labelsAnalytics.MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL,
    'Click',
    'Materno Infantil'
  );
});

test(`deve chamar o analytics data ao clicar no item
      ${TESTIDS.MATERNO_INFANTIL.PRE_NATAL_ALTO_RISCO}`, () => {
  const route = {
    params: {
      expanded: false
    }
  };
  const { getByTestId } = render(<MaternoInfantil route={route} />);
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.PRE_NATAL_ALTO_RISCO);

  fireEvent.press(item);
  expect(analyticsData).toBeCalled();
});


test(`deve chamar o analytics data ao clicar no item
      ${TESTIDS.MATERNO_INFANTIL.PRE_NATAL_ALTO_RISCO}
      com parâmetros corretos.`, () => {
  const route = {
    params: {
      expanded: false
    }
  };
  const { getByTestId } = render(<MaternoInfantil route={route} />);
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.PRE_NATAL_ALTO_RISCO);

  fireEvent.press(item);
  expect(analyticsData).toBeCalledWith(
    labelsAnalytics.MATERNO_INFANTIL.PRE_NATAL_ALTO_RISCO,
    'Click',
    'Materno Infantil'
  );
});

test(`deve chamar o analytics data ao clicar no item
      ${TESTIDS.MATERNO_INFANTIL.SINDROMES_HIPERTENSIVAS_GESTACAO}`, () => {
  const route = {
    params: {
      expanded: false
    }
  };
  const { getByTestId } = render(<MaternoInfantil route={route} />);
  const item = getByTestId(
    TESTIDS.MATERNO_INFANTIL.SINDROMES_HIPERTENSIVAS_GESTACAO
  );

  fireEvent.press(item);
  expect(analyticsData).toBeCalled();
});


test(`deve chamar o analytics data ao clicar no item
      ${TESTIDS.MATERNO_INFANTIL.SINDROMES_HIPERTENSIVAS_GESTACAO}
      com parâmetros corretos.`, () => {
  const route = {
    params: {
      expanded: false
    }
  };
  const { getByTestId } = render(<MaternoInfantil route={route} />);
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.SINDROMES_HIPERTENSIVAS_GESTACAO);

  fireEvent.press(item);
  expect(analyticsData).toBeCalledWith(
    labelsAnalytics.MATERNO_INFANTIL.SINDROMES_HIPERTENSIVAS_GESTACAO,
    'Click',
    'Materno Infantil'
  );
});

test(`deve chamar o analytics data ao clicar no item
      ${TESTIDS.MATERNO_INFANTIL.HEMORRAGIA_GESTACAO}`, () => {
  const route = {
    params: {
      expanded: false
    }
  };
  const { getByTestId } = render(<MaternoInfantil route={route} />);
  const item = getByTestId(
    TESTIDS.MATERNO_INFANTIL.HEMORRAGIA_GESTACAO
  );

  fireEvent.press(item);
  expect(analyticsData).toBeCalled();
});


test(`deve chamar o analytics data ao clicar no item
      ${TESTIDS.MATERNO_INFANTIL.HEMORRAGIA_GESTACAO}
      com parâmetros corretos.`, () => {
  const route = {
    params: {
      expanded: false
    }
  };
  const { getByTestId } = render(<MaternoInfantil route={route} />);
  const item = getByTestId(TESTIDS.MATERNO_INFANTIL.HEMORRAGIA_GESTACAO);

  fireEvent.press(item);
  expect(analyticsData).toBeCalledWith(
    labelsAnalytics.MATERNO_INFANTIL.GUIA_HEMORRAGIA_GESTACAO,
    'Click',
    'Materno Infantil'
  );
});
