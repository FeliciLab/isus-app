/* eslint-disable import/no-unresolved */
import React from 'react';
import { fireEvent, render } from 'util-teste';
import ConteudoDrawer from '../../../src/components/ConteudoDrawer';
import MockedDrawerNavigator from '../../../__mocks__/navigator/mocked-drawer-navigator';
import AppTab from '../../../src/routes/appBottomTab.routes';

jest.mock('../../../src/utils/analytics.js', () => ({
  analyticsData: () => jest.fn()
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

test('verifica se o item home foi adicionado', () => {
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

  expect(item).not.toBeNull();
});

test('verifica se o item Meu perfil foi adicionado', () => {
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

  expect(item).not.toBeNull();
});

test('verifica se o item Fale conosco foi adicionado', () => {
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

  expect(item).not.toBeNull();
});

test('verifica se o item SUS no Ceará foi adicionado', () => {
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

  expect(item).not.toBeNull();
});
