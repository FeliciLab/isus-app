import React from 'react';
import { fireEvent, render } from 'util-teste';
import ConteudoDrawer from '~/components/ConteudoDrawer';
import { analyticsData } from '~/utils/analytics';
import testIDs, { TESTIDS } from '~/constantes/testIDs';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import { AutenticacaoContext } from '~/context/AutenticacaoContext';

jest.mock('../../../src/utils/analytics', () => ({
  analyticsData: jest.fn(),
}));

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useIsFocused: jest.fn(),
}));

describe('testes de interface para o menu lateral do app', () => {
  let fetchByTestId;
  describe('Dado que o AppTrackTransparency está ativo', () => {
    beforeEach(() => {
      const { getByTestId } = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <AutenticacaoContext.Provider value={{ user: false, token: null }}>
            <ConteudoDrawer />
          </AutenticacaoContext.Provider>
        </AppTrackTransparencyContext.Provider>,
      );
      fetchByTestId = getByTestId;
    });

    test('deve chamar o analytics data ao clicar no item Home no menu lateral', () => {
      const item = fetchByTestId(TESTIDS.DRAWER.ITEM_HOME);
      fireEvent.press(item);
      expect(analyticsData).toHaveBeenCalled();
    });
    test('deve chamar o analytics data ao clicar no item Meu perfil no menu lateral', () => {
      const item = fetchByTestId(TESTIDS.DRAWER.ITEM_PERFIL);
      fireEvent.press(item);
      expect(analyticsData).toHaveBeenCalled();
    });
    test('deve chamar o analytics data ao clicar no item Fale conosco no menu lateral', () => {
      const item = fetchByTestId(testIDs.DRAWER.ITEM_FALECONOSCO);
      fireEvent.press(item);
      expect(analyticsData).toHaveBeenCalled();
    });
    test('deve chamar o analytics data quando clicar no item SUS no Ceará no menu lateral', () => {
      const item = fetchByTestId(testIDs.DRAWER.ITEM_SUSNOCEARA);
      fireEvent.press(item);
      expect(analyticsData).toHaveBeenCalled();
    });
  });
});
