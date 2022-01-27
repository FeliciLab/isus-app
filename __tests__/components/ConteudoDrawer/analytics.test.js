import React from 'react';
import { fireEvent, render } from 'util-teste';
import ConteudoDrawer from '../../../src/components/ConteudoDrawer';
import MockedDrawerNavigator from '../../../__mocks__/navigator/mocked-drawer-navigator';
import AppTab from '../../../src/routes/appBottomTab.routes';
import { analyticsData } from '../../../src/utils/analytics';
import testIDs, { TESTIDS } from '../../../src/constantes/testIDs';
import { AppTrackTransparencyProvider } from '../../../src/context/AppTrackTransparencyContext';

jest.mock('../../../src/utils/analytics', () => ({
  analyticsData: jest.fn()
}));
analyticsData();

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useIsFocused: jest.fn()
}));

describe('testes de interface para o menu lateral do app', () => {
  let fetchByTestId;
  beforeEach(() => {
    const { getByTestId } = render(
      <AppTrackTransparencyProvider mock>
        <MockedDrawerNavigator
          name="home"
          component={AppTab}
          initialParams={{}}
          conteudoDrawer={props => (
            <ConteudoDrawer {...props} routeName={props.state.routeNames[props.state.index]} />
          )}
        />
      </AppTrackTransparencyProvider>
    );

    fetchByTestId = getByTestId;
  });

  test('deve chamar o analytics data ao clicar no item Home no menu lateral', () => {
    const item = fetchByTestId(TESTIDS.DRAWER.ITEM_HOME);
    console.log(item);
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
