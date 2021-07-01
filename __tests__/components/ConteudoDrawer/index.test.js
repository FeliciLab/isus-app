/* eslint-disable import/no-unresolved */
import React from 'react';
import { fireEvent, render } from 'util-teste';
import { useNavigation } from '@react-navigation/native';
import ConteudoDrawer from '../../../src/components/ConteudoDrawer';
import MockedDrawerNavigator from '../../../__mocks__/navigator/mocked-drawer-navigator';
import AppTab from '../../../src/routes/appBottomTab.routes';
import { analyticsData } from '../../../src/utils/analytics';
import testIDs, { TESTIDS } from '../../../src/constantes/testIDs';
// import ItemDrawer from '../../../src/components/ConteudoDrawer/itemDrawer';
import packageJson from '../../../package.json';
// import { AutenticacaoProvider } from '../../../src/context/AutenticacaoContext';
// import {salvarTokenDoUsuarioNoStorage } from '../../../src/services/autenticacao';

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
  describe('Dado que abro o menu lateral', () => {
    describe('Quando clico em HOME', () => {
      test('então sou redirecionado para a página HOME', () => {
        const { getByTestId } = render(
          <ConteudoDrawer
            navigation={{ navigate: mockedNavigate }}
          />
        );
        const item = getByTestId(testIDs.DRAWER.ITEM_HOME);
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('HOME');
      });
    });
    /* describe('Quando clico em Meu Perfil (E não estou autenticado)', () => {
      test('então sou redirecionado para a página de login/cadastro', () => {
        salvarTokenDoUsuarioNoStorage('soutoken');
        armazenarEstadoLogado('souestalogado');
        const { getByTestId } = render(
          <AutenticacaoProvider
            iniToken={false}
            iniLogado
          >
            <ConteudoDrawer navigation={{ navigate: mockedNavigate }} />
          </AutenticacaoProvider>
        );
        const item = getByTestId(testIDs.DRAWER.ITEM_PERFIL);
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('LOGIN');
      });
    }); */
    /* describe('Quando clico em Meu Perfil (E estou autenticado)', () => {
      test('então sou redirecionado para a página de perfil', () => {
        const { getByTestId } = render(
          <AutenticacaoProvider
            iniToken
            iniLogado
          >
            <ConteudoDrawer navigation={{ navigate: mockedNavigate }} />
          </AutenticacaoProvider>
        );
        const item = getByTestId(testIDs.DRAWER.ITEM_PERFIL);
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('PERFIL');
      });
    }); */
    describe('Quando clico em Fale Conosco', () => {
      test('então sou redirecionado para a página de Fale Conosco', () => {
        const { getByTestId } = render(
          <ConteudoDrawer
            navigation={{ navigate: mockedNavigate }}
          />
        );
        const item = getByTestId(testIDs.DRAWER.ITEM_FALECONOSCO);
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('FEEDBACK');
      });
    });
    describe('Quando clico em SUS no Ceará', () => {
      test('então sou redirecionado para a página de SUS no Ceará', () => {
        const { getByTestId } = render(
          <ConteudoDrawer
            navigation={{ navigate: mockedNavigate }}
          />
        );
        const item = getByTestId(testIDs.DRAWER.ITEM_SUSNOCEARA);
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('SUS_NO_CEARA');
      });
    });
    describe('Quando clico em Sobre ISUS', () => {
      test('então sou redirecionado para a página Sobre ISUS', () => {
        const { getByTestId } = render(
          <ConteudoDrawer
            navigation={{ navigate: mockedNavigate }}
          />
        );
        const item = getByTestId(testIDs.DRAWER.ITEM_SOBRE_O_ISUS);
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('SOBRE');
      });
    });
    describe('Quando clico em Termos de Uso', () => {
      test('então sou redirecionado para a página Termos de Uso', () => {
        const { getByTestId } = render(
          <ConteudoDrawer
            navigation={{ navigate: mockedNavigate }}
          />
        );
        const item = getByTestId(testIDs.DRAWER.ITEM_TERMOS_DE_USO);
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('TERMOS_DE_USO');
      });
    });
    // TODO: ABAIXO
    describe('Quando clico em Compartilhar', () => {
      test('então exibo o pop-up de compartilhamento do celular', () => {
        const navigation = useNavigation();
        const { getByTestId } = render(
          <ConteudoDrawer
            navigation={{ navigate: navigation }}
          />
        );
        const item = getByTestId(testIDs.DRAWER.ITEM_COMPARTILHE_O_ISUS);
        fireEvent.press(item);
        expect(mockedNavigate).not.toBeNull();
      });
    });
    describe('Quando o menu é exibido', () => {
      test('Então a versão é visualizada na parte inferior do menu.', () => {
        const versaoSistema = packageJson.version;
        const navigation = useNavigation();
        const { getByText } = render(
          <ConteudoDrawer
            navigation={{ navigate: navigation }}
          />
        );
        const item = getByText(`Versão ${versaoSistema}`);
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children[2]).toEqual(versaoSistema);
      });
    });
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
