import React from 'react';
import { fireEvent, render } from 'util-teste';
import { TESTIDS } from '~/constantes/testIDs';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import Termos from '~/pages/Login/Termos';
import { analyticsData } from '~/utils/analytics';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: jest.fn(),
  }),
  useIsFocused: jest.fn(),
}));

describe('Termos', () => {
  let renderObject;
  beforeEach(() => {
    renderObject = render(
      <AppTrackTransparencyContext.Provider
        value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
        <Termos alterarPossuirIDSaude={mockedNavigate} />
      </AppTrackTransparencyContext.Provider>,
    );
  });

  test('deve chamar o analytics data ao clicar em "Termos de Uso"', () => {
    const item = renderObject.getByTestId(TESTIDS.HYPERLINK_TERMOS_USO);
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o analytics data ao clicar em "Termos de Uso" com os parâmetros corretos', () => {
    const item = renderObject.getByTestId(TESTIDS.HYPERLINK_TERMOS_USO);
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalledWith('termos_uso', 'Click', 'Perfil');
  });
});
