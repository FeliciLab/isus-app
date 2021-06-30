/* eslint-disable import/no-unresolved */
import React from 'react';
import { render } from 'util-teste';
import { useNavigation } from '@react-navigation/native';
import ConteudoDrawer from '../../../src/components/ConteudoDrawer';
// import MockedDrawerNavigator from '../../../__mocks__/navigator/mocked-drawer-navigator';
// import AppTab from '../../../src/routes/appBottomTab.routes';
// import { analyticsData } from '../../../src/utils/analytics';
// import testIDs, { TESTIDS } from '../../../src/constantes/testIDs';
// import ItemDrawer from '../../../src/components/ConteudoDrawer/itemDrawer';

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
  describe('Dado que clico no menu lateral', () => {
    describe('Quando o menu lateral abre', () => {
      const navigation = useNavigation();
      test('então visualizo a logo do iSUS', () => {
        const { getByTestId } = render(
          <ConteudoDrawer
            navigation={{ navigate: navigation }}
          />
        );
        const item = getByTestId('svg-heart');
        expect(item).not.toBeNull();
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.type).toEqual('SvgMock');
      });
      test('então visualizo o texto e o ícone da HOME', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer
            navigation={{ navigate: navigation }}
            routeName="HOME"
          />
        );
        const itemNome = queryAllByText('Home');
        const item = getByTestId('icon-drawer-home');
        // eslint-disable-next-line no-underscore-dangle
        expect(itemNome[0]._fiber.memoizedProps.children).toEqual('Home');
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children).not.toBeNull();
      });
      test('então visualizo o icone do boneco (account) e o texto Meu Perfil', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer
            navigation={{ navigate: navigation }}
            routeName="PERFIL"
          />
        );
        const itemNome = queryAllByText('Meu perfil');
        const item = getByTestId('icon-drawer-account');
        // eslint-disable-next-line no-underscore-dangle
        expect(itemNome[0]._fiber.memoizedProps.children).toEqual('Meu perfil');
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children).not.toBeNull();
      });
      test('então visualizo o icone do chat+exclamação (feedback) e visualizo o texto Fale Conosco', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer
            navigation={{ navigate: navigation }}
            routeName="FEEDBACK"
          />
        );
        const itemNome = queryAllByText('Fale conosco');
        const item = getByTestId('icon-drawer-feedback');
        // eslint-disable-next-line no-underscore-dangle
        expect(itemNome[0]._fiber.memoizedProps.children).toEqual('Fale conosco');
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children).not.toBeNull();
      });
      test('então visualizo o icone do circulo+interrogação (help-circle) e visualizo o texto SUS no Ceará', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer
            navigation={{ navigate: navigation }}
            routeName="SUS_NO_CEARA"
          />
        );
        const itemNome = queryAllByText('SUS no Ceará');
        const item = getByTestId('icon-drawer-susnoceara');
        // eslint-disable-next-line no-underscore-dangle
        expect(itemNome[0]._fiber.memoizedProps.children).toEqual('SUS no Ceará');
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children).not.toBeNull();
      });
      test('então visualizo o icone do circulo+interrogação (information) e visualizo o texto Sobre o iSUS', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer
            navigation={{ navigate: navigation }}
            routeName="SOBRE"
          />
        );
        const itemNome = queryAllByText('Sobre o iSUS');
        const item = getByTestId('icon-drawer-information');
        // eslint-disable-next-line no-underscore-dangle
        expect(itemNome[0]._fiber.memoizedProps.children).toEqual('Sobre o iSUS');
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children).not.toBeNull();
      });
      test('então visualizo o icone do circulo+interrogação (clipboard-text) e visualizo o texto Termos de Uso', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer
            navigation={{ navigate: navigation }}
            routeName="TERMOS_DE_USO"
          />
        );
        const itemNome = queryAllByText('Termos de Uso');
        const item = getByTestId('icon-drawer-clipboard-text');
        // eslint-disable-next-line no-underscore-dangle
        expect(itemNome[0]._fiber.memoizedProps.children).toEqual('Termos de Uso');
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children).not.toBeNull();
      });
      test('então visualizo o icone do circulo+interrogação (share-varian) e visualizo o texto Compartilhar', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer
            navigation={{ navigate: navigation }}
          />
        );
        const itemNome = queryAllByText('Compartilhar');
        const item = getByTestId('icon-drawer-share-variant');
        // eslint-disable-next-line no-underscore-dangle
        expect(itemNome[0]._fiber.memoizedProps.children).toEqual('Compartilhar');
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children).not.toBeNull();
      });
    });
  });
  /* describe('Dado que abro o menu lateral', () => {
    const navigation = useNavigation();
    describe('Quando clico em HOME', () => {
      test('então sou redirecionado para a página HOME', () => {
        const { getByTestId, debug } = render(
          <ConteudoDrawer
            navigation={{ navigate: navigation }}
            routeName="HOME"
          />
        );
        debug();
        const item = getByTestId(testIDs.DRAWER.ITEM_HOME);
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('PERFIL');
      });
    });
    /* describe('Quando clico em Meu Perfil (E não estou autenticado)', () => {
      test('então sou redirecionado para a página de login/cadastro', () => {

      });
    });
    describe('Quando clico em Meu Perfil (E estou autenticado)', () => {
      test('então sou redirecionado para a página de perfil', () => {

      });
    });
    describe('Quando clico em Fale Conosco', () => {
      test('então sou redirecionado para a página de Fale Conosco', () => {

      });
    });
    describe('Quando clico em SUS no Ceará', () => {
      test('então sou redirecionado para a página de SUS no Ceará', () => {

      });
    });
    describe('Quando clico em Sobre ISUS', () => {
      test('então sou redirecionado para a página Sobre ISUS', () => {

      });
    });
    describe('Quando clico em Termos de Uso', () => {
      test('então sou redirecionado para a página Termos de Uso', () => {

      });
    });
    describe('Quando clico em Compartilhar', () => {
      test('então exibo o pop-up de compartilhamento do celular', () => {

      });
    });
    describe('Quando o menu é exibido', () => {
      test('Então a versão é visualizada na parte inferior do menu.', () => {

      });
    });
  }); */
});
