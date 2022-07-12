import React from 'react';
import { fireEvent, render } from 'util-teste';
import MaternoInfantil from '~/pages/Home/LinhasDeCuidado/MaternoInfantil';
import { analyticsData } from '~/utils/analytics';
import { TESTIDS } from '~/constantes/testIDs';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn(),
}));

describe('LinhasDeCuidad > MaternoInfantil', () => {
  describe('params: expanded true', () => {
    let renderedObject;
    const route = {
      params: {
        expanded: true,
      },
    };
    beforeEach(() => {
      renderedObject = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <MaternoInfantil route={route} />
        </AppTrackTransparencyContext.Provider>,
      );
    });

    test(`deve chamar o analytics data ao clicar no item
    ${TESTIDS.MATERNO_INFANTIL.NASCER_CEARA}`, () => {
      const item = renderedObject.getByTestId(
        TESTIDS.MATERNO_INFANTIL.NASCER_CEARA,
      );
      fireEvent.press(item);
      expect(analyticsData).toBeCalled();
    });

    test(`deve chamar o analytics data ao clicar no item
        ${TESTIDS.MATERNO_INFANTIL.NASCER_CEARA}
        com os parâmetros corretos`, () => {
      const item = renderedObject.getByTestId(
        TESTIDS.MATERNO_INFANTIL.NASCER_CEARA,
      );

      fireEvent.press(item);
      expect(analyticsData).toBeCalledWith(
        labelsAnalytics.MATERNO_INFANTIL.NASCER_NO_CEARA,
        'Click',
        'Materno Infantil',
      );
    });
  });

  describe('params: expanded true', () => {
    let renderedObject;
    const route = {
      params: {
        expanded: false,
      },
    };
    beforeEach(() => {
      renderedObject = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <MaternoInfantil route={route} />
        </AppTrackTransparencyContext.Provider>,
      );
    });

    test(`deve chamar o analytics data ao clicar no item
        ${TESTIDS.MATERNO_INFANTIL.ESTRATIFICACAO_RISCO}`, () => {
      const item = renderedObject.getByTestId(
        TESTIDS.MATERNO_INFANTIL.ESTRATIFICACAO_RISCO,
      );

      fireEvent.press(item);
      expect(analyticsData).toBeCalled();
    });

    test(`deve chamar o analytics data ao clicar no item
          ${TESTIDS.MATERNO_INFANTIL.ESTRATIFICACAO_RISCO}
          com parâmetros corretos.`, () => {
      const item = renderedObject.getByTestId(
        TESTIDS.MATERNO_INFANTIL.ESTRATIFICACAO_RISCO,
      );

      fireEvent.press(item);
      expect(analyticsData).toBeCalledWith(
        labelsAnalytics.MATERNO_INFANTIL.ESTRATIFICACAO_DE_RISCO,
        'Click',
        'Materno Infantil',
      );
    });

    test(`deve chamar o analytics data ao clicar no item
          ${TESTIDS.MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL}`, () => {
      const item = renderedObject.getByTestId(
        TESTIDS.MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL,
      );

      fireEvent.press(item);
      expect(analyticsData).toBeCalled();
    });

    test(`deve chamar o analytics data ao clicar no item
          ${TESTIDS.MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL}
          com parâmetros corretos.`, () => {
      const item = renderedObject.getByTestId(
        TESTIDS.MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL,
      );

      fireEvent.press(item);
      expect(analyticsData).toBeCalledWith(
        labelsAnalytics.MATERNO_INFANTIL.PRE_NATAL_RISCO_HABITUAL,
        'Click',
        'Materno Infantil',
      );
    });

    test(`deve chamar o analytics data ao clicar no item
          ${TESTIDS.MATERNO_INFANTIL.PRE_NATAL_ALTO_RISCO}`, () => {
      const item = renderedObject.getByTestId(
        TESTIDS.MATERNO_INFANTIL.PRE_NATAL_ALTO_RISCO,
      );

      fireEvent.press(item);
      expect(analyticsData).toBeCalled();
    });

    test(`deve chamar o analytics data ao clicar no item
          ${TESTIDS.MATERNO_INFANTIL.PRE_NATAL_ALTO_RISCO}
          com parâmetros corretos.`, () => {
      const item = renderedObject.getByTestId(
        TESTIDS.MATERNO_INFANTIL.PRE_NATAL_ALTO_RISCO,
      );

      fireEvent.press(item);
      expect(analyticsData).toBeCalledWith(
        labelsAnalytics.MATERNO_INFANTIL.PRE_NATAL_ALTO_RISCO,
        'Click',
        'Materno Infantil',
      );
    });

    test(`deve chamar o analytics data ao clicar no item
          ${TESTIDS.MATERNO_INFANTIL.SINDROMES_HIPERTENSIVAS_GESTACAO}`, () => {
      const item = renderedObject.getByTestId(
        TESTIDS.MATERNO_INFANTIL.SINDROMES_HIPERTENSIVAS_GESTACAO,
      );

      fireEvent.press(item);
      expect(analyticsData).toBeCalled();
    });

    test(`deve chamar o analytics data ao clicar no item
          ${TESTIDS.MATERNO_INFANTIL.SINDROMES_HIPERTENSIVAS_GESTACAO}
          com parâmetros corretos.`, () => {
      const item = renderedObject.getByTestId(
        TESTIDS.MATERNO_INFANTIL.SINDROMES_HIPERTENSIVAS_GESTACAO,
      );

      fireEvent.press(item);
      expect(analyticsData).toBeCalledWith(
        labelsAnalytics.MATERNO_INFANTIL.SINDROMES_HIPERTENSIVAS_GESTACAO,
        'Click',
        'Materno Infantil',
      );
    });

    test(`deve chamar o analytics data ao clicar no item
          ${TESTIDS.MATERNO_INFANTIL.HEMORRAGIA_GESTACAO}`, () => {
      const item = renderedObject.getByTestId(
        TESTIDS.MATERNO_INFANTIL.HEMORRAGIA_GESTACAO,
      );

      fireEvent.press(item);
      expect(analyticsData).toBeCalled();
    });

    test(`deve chamar o analytics data ao clicar no item
          ${TESTIDS.MATERNO_INFANTIL.HEMORRAGIA_GESTACAO}
          com parâmetros corretos.`, () => {
      const item = renderedObject.getByTestId(
        TESTIDS.MATERNO_INFANTIL.HEMORRAGIA_GESTACAO,
      );

      fireEvent.press(item);
      expect(analyticsData).toBeCalledWith(
        labelsAnalytics.MATERNO_INFANTIL.GUIA_HEMORRAGIA_GESTACAO,
        'Click',
        'Materno Infantil',
      );
    });
  });
});
