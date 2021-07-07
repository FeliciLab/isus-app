/* eslint-disable import/no-unresolved */
import React from 'react';
import { fireEvent, render } from 'util-teste';
import ConteudoDrawer from '../../../src/components/ConteudoDrawer';
import MockedDrawerNavigator from '../../../__mocks__/navigator/mocked-drawer-navigator';
import AppTab from '../../../src/routes/appBottomTab.routes';
import { analyticsData } from '../../../src/utils/analytics';
import testIDs, { TESTIDS } from '../../../src/constantes/testIDs';

jest.mock('../../../src/utils/analytics', () => ({
  analyticsData: jest.fn()
}));
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
  test('deve chamar o analytics data ao clicar no item Home no menu lateral', () => {
    const { getByTestId } = render(
    <MockedDrawerNavigator
      name="home"
      component={AppTab}
      initialParams={{}}
      conteudoDrawer={props => (
        <ConteudoDrawer {...props} routeName={props.state.routeNames[props.state.index]} />
      )}
    />
    );
    const item = getByTestId(TESTIDS.DRAWER.ITEM_HOME);
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });
  test('deve chamar o analytics data ao clicar no item Meu perfil no menu lateral', () => {
    const { getByTestId } = render(
    <MockedDrawerNavigator
      name="PERFIL"
      component={AppTab}
      initialParams={{}}
      conteudoDrawer={props => (
        <ConteudoDrawer {...props} routeName={props.state.routeNames[props.state.index]} />
      )}
    />
    );
    const item = getByTestId(TESTIDS.DRAWER.ITEM_PERFIL);
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });
  test('deve chamar o analytics data ao clicar no item Fale conosco no menu lateral', () => {
    const { getByTestId } = render(
    <MockedDrawerNavigator
      name="FEEDBACK"
      component={AppTab}
      initialParams={{}}
      conteudoDrawer={props => (
        <ConteudoDrawer {...props} routeName={props.state.routeNames[props.state.index]} />
      )}
    />
    );
    const item = getByTestId(testIDs.DRAWER.ITEM_FALECONOSCO);
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });
  test('deve chamar o analytics data quando clicar no item SUS no Ceará no menu lateral', () => {
    const { getByTestId } = render(
    <MockedDrawerNavigator
      name="SUS_NO_CEARA"
      component={AppTab}
      initialParams={{}}
      conteudoDrawer={props => (
        <ConteudoDrawer {...props} routeName={props.state.routeNames[props.state.index]} />
      )}
    />
    );
    const item = getByTestId(testIDs.DRAWER.ITEM_SUSNOCEARA);
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });
});
