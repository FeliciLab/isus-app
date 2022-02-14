import React from 'react';
import { fireEvent, render } from 'util-teste';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import SusNoCearaScreen from '~/pages/SusNoCeara';
import { analyticsData } from '~/utils/analytics';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useIsFocused: jest.fn(),
}));

let EspSesa = null;
let IsusEsp = null;
let SusCeara = null;

beforeEach(() => {
  const { getByTestId } = render(
    <AppTrackTransparencyContext.Provider
      value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
      <SusNoCearaScreen />
    </AppTrackTransparencyContext.Provider>,
  );

  SusCeara = getByTestId(TESTIDS.ACORDEON_SUS_NO_CEARA);
  IsusEsp = getByTestId(TESTIDS.ACORDEON_ISUS_ESP);
  EspSesa = getByTestId(TESTIDS.ACORDEON_ESP_SESA);
});

describe('Teste do SUS no Ceará no Menu Lateral', () => {
  test('deve mostrar a aba de SUS no Ceará quando renderizar a tela de sus no Ceará', () => {
    expect(SusCeara).not.toBeNull();
  });

  test('deve chamar analyticsData quando clicar na aba de SUS no Ceará', () => {
    fireEvent.press(SusCeara);
    expect(analyticsData).toBeCalled();
  });

  test('deve chamar analyticsData quando clicar na aba de SUS no Ceará com os parâmetros corretamente', () => {
    fireEvent.press(SusCeara);
    expect(analyticsData).toBeCalledWith(
      labelsAnalytics.SUS_NO_CEARA,
      'Click',
      'SUS no Ceará',
    );
  });

  test('deve mostrar a aba de iSUS é ESP quando renderizar a tela de sus no Ceará', () => {
    expect(IsusEsp).not.toBeNull();
  });

  test('deve chamar analyticsData quando clicar na aba de iSUS é ESP', () => {
    fireEvent.press(IsusEsp);
    expect(analyticsData).toBeCalled();
  });

  test('deve chamar analyticsData quando clicar na aba de iSUS é ESP com os parâmetros corretamente', () => {
    fireEvent.press(IsusEsp);
    expect(analyticsData).toBeCalledWith(
      labelsAnalytics.ISUS_ESP,
      'Click',
      'SUS no Ceará',
    );
  });

  test('deve mostrar a aba de ESP é SESA quando renderizar a tela de sus no Ceará', () => {
    expect(EspSesa).not.toBeNull();
  });

  test('deve chamar analyticsData quando clicar na aba de ESP é SESA', () => {
    fireEvent.press(EspSesa);
    expect(analyticsData).toBeCalled();
  });

  test('deve chamar analyticsData quando clicar na aba de ESP é SESA com os parâmetros corretamente', () => {
    fireEvent.press(EspSesa);
    expect(analyticsData).toBeCalledWith(
      labelsAnalytics.ESP_SESA,
      'Click',
      'SUS no Ceará',
    );
  });
});
