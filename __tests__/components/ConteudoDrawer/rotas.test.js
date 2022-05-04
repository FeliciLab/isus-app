import React from 'react';
import { Share } from 'react-native';
import { fireEvent, render } from 'util-teste';
import ConteudoDrawer from '~/components/ConteudoDrawer';
import testIDs from '~/constantes/testIDs';
import {
  AppTrackTransparencyContext,
  AppTrackTransparencyProvider,
} from '~/context/AppTrackTransparencyContext';
import {
  AutenticacaoContext,
  AutenticacaoProvider,
} from '~/context/AutenticacaoContext';
import packageJson from '../../../package.json';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useIsFocused: jest.fn(),
}));

const share = jest.spyOn(Share, 'share');

const messagLink =
  'Conhece o app iSUS? Um produto digital do governo do Ceará de apoio a profissionais de saúde, com informações, serviços e oportunidades na palma da mão! Saiba mais: https://coronavirus.ceara.gov.br/isus/';

describe('Dado que abro o menu lateral', () => {
  describe('Quando clico em Meu Perfil (E não estou autenticado - login(falso) e token(falso))', () => {
    test('então sou redirecionado para a página de login/cadastro', () => {
      const { getByTestId } = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <AutenticacaoContext.Provider value={{ user: false }}>
            <ConteudoDrawer />
          </AutenticacaoContext.Provider>
        </AppTrackTransparencyContext.Provider>,
      );
      const item = getByTestId(testIDs.DRAWER.ITEM_PERFIL);
      fireEvent.press(item);
      expect(mockedNavigate).toHaveBeenCalledWith('LOGIN');
    });
  });
  describe('Quando clico em Meu Perfil (E não estou autenticado - login(verdadeiro) e token(falso))', () => {
    test('então sou redirecionado para a página de login/cadastro', () => {
      const { getByTestId } = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <AutenticacaoContext.Provider value={{ user: true, token: null }}>
            <ConteudoDrawer />
          </AutenticacaoContext.Provider>
        </AppTrackTransparencyContext.Provider>,
      );
      const item = getByTestId(testIDs.DRAWER.ITEM_PERFIL);
      fireEvent.press(item);
      expect(mockedNavigate).toHaveBeenCalledWith('LOGIN');
    });
  });

  describe('Quando clico em Meu Perfil (E não estou autenticado - login(falso) e token(verdadeiro))', () => {
    test('então sou redirecionado para a página de login/cadastro', () => {
      const { getByTestId } = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <AutenticacaoContext.Provider value={{ user: false, token: null }}>
            <ConteudoDrawer />
          </AutenticacaoContext.Provider>
        </AppTrackTransparencyContext.Provider>,
      );
      const item = getByTestId(testIDs.DRAWER.ITEM_PERFIL);
      fireEvent.press(item);
      expect(mockedNavigate).toHaveBeenCalledWith('LOGIN');
    });
  });
  describe('Quando clico em Meu Perfil (E estou autenticado - login(verdadeiro) e token(verdadeiro))', () => {
    test('então sou redirecionado para a página de perfil', () => {
      const { getByTestId } = render(
        <AutenticacaoProvider
          valoresIniciais={{ estaLogade: true, tokenAutenticacao: true }}>
          <AppTrackTransparencyProvider mock>
            <ConteudoDrawer />
          </AppTrackTransparencyProvider>
        </AutenticacaoProvider>,
      );
      const item = getByTestId(testIDs.DRAWER.ITEM_PERFIL);
      fireEvent.press(item);
      expect(mockedNavigate).toHaveBeenCalledWith('PERFIL');
    });
  });
  describe('Quando clico em HOME', () => {
    test('então sou redirecionado para a página HOME', () => {
      const { getByTestId } = render(
        <AppTrackTransparencyProvider mock>
          <ConteudoDrawer />
        </AppTrackTransparencyProvider>,
      );
      const item = getByTestId(testIDs.DRAWER.ITEM_HOME);
      fireEvent.press(item);
      expect(mockedNavigate).toHaveBeenCalledWith('HOME_SCREEN_HOME');
    });
  });
  describe('Independente de autenticação', () => {
    let renderedObject;

    beforeEach(() => {
      renderedObject = render(
        <AppTrackTransparencyProvider mock>
          <ConteudoDrawer />
        </AppTrackTransparencyProvider>,
      );
    });

    describe('Quando clico em Fale Conosco', () => {
      test('então sou redirecionado para a página de Fale Conosco', () => {
        const item = renderedObject.getByTestId(
          testIDs.DRAWER.ITEM_FALECONOSCO,
        );
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('FEEDBACK');
      });
    });

    describe('Quando clico em SUS no Ceará', () => {
      test('então sou redirecionado para a página de SUS no Ceará', () => {
        const item = renderedObject.getByTestId(testIDs.DRAWER.ITEM_SUSNOCEARA);
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('SUS_NO_CEARA');
      });
    });
    describe('Quando clico em Sobre ISUS', () => {
      test('então sou redirecionado para a página Sobre ISUS', () => {
        const item = renderedObject.getByTestId(
          testIDs.DRAWER.ITEM_SOBRE_O_ISUS,
        );
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('SOBRE');
      });
    });
    describe('Quando clico em Termos de Uso', () => {
      test('então sou redirecionado para a página Termos de Uso', () => {
        const item = renderedObject.getByTestId(
          testIDs.DRAWER.ITEM_TERMOS_DE_USO,
        );
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('TERMOS_DE_USO');
      });
    });
    describe('Quando clico em Politica de Privacidade', () => {
      test('então sou redirecionado para a página Politica de Privacidade', () => {
        const item = renderedObject.getByTestId(
          testIDs.DRAWER.ITEM_POLITA_DE_PRIVACIDADE,
        );
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('POLITICA_DE_PRIVACIDADE');
      });
    });
    describe('Quando clico em Compartilhar', () => {
      test('então exibo o pop-up de compartilhamento do celular', () => {
        const item = renderedObject.getByTestId(
          testIDs.DRAWER.ITEM_COMPARTILHE_O_ISUS,
        );

        fireEvent.press(item);

        expect(item).toBeTruthy();

        expect(share).toHaveBeenCalledWith({
          message: messagLink,
        });
      });
    });
    describe('Quando o menu é exibido', () => {
      test('Então a versão é visualizada na parte inferior do menu.', () => {
        const versaoSistema = packageJson.version;
        const item = renderedObject.getByText(`Versão ${versaoSistema}`);
        expect(item.props.children[1]).toEqual(versaoSistema);
      });
    });
  });
});
