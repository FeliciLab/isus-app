/* eslint-disable import/no-unresolved */
import React from 'react';
import { fireEvent, render } from 'util-teste';
import ConteudoDrawer from '../../../src/components/ConteudoDrawer';
import MockedDrawerNavigator from '../../../__mocks__/navigator/mocked-drawer-navigator';
import AppTab from '../../../src/routes/appBottomTab.routes';
import { analyticsData } from '../../../src/utils/analytics';

jest.mock('../../../src/utils/analytics', () => ({
  analyticsData: jest.fn()
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useIsFocused: jest.fn()
}));

const mockedNavigate = jest.fn();
describe('testes do conteúdo do menu lateral do app', () => {
  test('deve renderizar o item home', () => {
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
    const item = getByTestId('drawer-item-home');

    expect(item).not.toBeNull();
  });

  test('deve renderizar o item Meu perfil', () => {
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
    const item = getByTestId('drawer-item-perfil');

    expect(item).not.toBeNull();
  });

  test('deve renderizar o item Fale conosco', () => {
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
    const item = getByTestId('drawer-item-faleConosco');
    expect(item).not.toBeNull();
  });

  test('deve renderizar o item SUS no Ceará', () => {
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
    const item = getByTestId('drawer-item-SusNoCeara');
    expect(item).not.toBeNull();
  });

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
    const item = getByTestId('drawer-item-home');
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
    const item = getByTestId('drawer-item-perfil');
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
    const item = getByTestId('drawer-item-faleConosco');
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
    const item = getByTestId('drawer-item-SusNoCeara');
    fireEvent.press(item);
    expect(analyticsData).toHaveBeenCalled();
  });

  test('deve chamar o navigate quando clicar no item SUS no Ceará no menu lateral', () => {
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
    const item = getByTestId('drawer-item-SusNoCeara');
    fireEvent.press(item);
    expect(mockedNavigate).toHaveBeenCalled();
  });
});
