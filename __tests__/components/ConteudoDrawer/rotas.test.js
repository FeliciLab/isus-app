import React from 'react';
import { fireEvent, render } from 'util-teste';
import ConteudoDrawer from '../../../src/components/ConteudoDrawer';
import testIDs from '../../../src/constantes/testIDs';
import packageJson from '../../../package.json';
import { AutenticacaoProvider } from '../../../src/context/AutenticacaoContext';
import aoCompartilhar from '../../../src/components/ConteudoDrawer/aoCompartilhar';
import { AppTrackTransparencyProvider } from '../../../src/context/AppTrackTransparencyContext';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useIsFocused: jest.fn()
}));

jest.mock('../../../src/components/ConteudoDrawer/aoCompartilhar', () => jest.fn());

describe('Dado que abro o menu lateral', () => {
  describe('Quando clico em Meu Perfil (E não estou autenticado - login(falso) e token(falso))', () => {
    test('então sou redirecionado para a página de login/cadastro', () => {
      const { getByTestId } = render(
        <AppTrackTransparencyProvider mock>
          <AutenticacaoProvider valoresIniciais={{ estaLogade: false, tokenAutenticacao: false }}>
            <ConteudoDrawer />
          </AutenticacaoProvider>
        </AppTrackTransparencyProvider>
      );
      const item = getByTestId(testIDs.DRAWER.ITEM_PERFIL);
      fireEvent.press(item);
      expect(mockedNavigate).toHaveBeenCalledWith('LOGIN');
    });
  });
  describe('Quando clico em Meu Perfil (E não estou autenticado - login(verdadeiro) e token(falso))', () => {
    test('então sou redirecionado para a página de login/cadastro', () => {
      const { getByTestId } = render(
        <AutenticacaoProvider valoresIniciais={{ estaLogade: true, tokenAutenticacao: false }}>
          <AppTrackTransparencyProvider mock>
            <ConteudoDrawer />
          </AppTrackTransparencyProvider>
        </AutenticacaoProvider>
      );
      const item = getByTestId(testIDs.DRAWER.ITEM_PERFIL);
      fireEvent.press(item);
      expect(mockedNavigate).toHaveBeenCalledWith('LOGIN');
    });
  });

  describe('Quando clico em Meu Perfil (E não estou autenticado - login(falso) e token(verdadeiro))', () => {
    test('então sou redirecionado para a página de login/cadastro', () => {
      const { getByTestId } = render(
        <AutenticacaoProvider valoresIniciais={{ estaLogade: false, tokenAutenticacao: true }}>
          <AppTrackTransparencyProvider mock>
            <ConteudoDrawer />
          </AppTrackTransparencyProvider>
        </AutenticacaoProvider>
      );
      const item = getByTestId(testIDs.DRAWER.ITEM_PERFIL);
      fireEvent.press(item);
      expect(mockedNavigate).toHaveBeenCalledWith('LOGIN');
    });
  });
  describe('Quando clico em Meu Perfil (E estou autenticado - login(verdadeiro) e token(verdadeiro))', () => {
    test('então sou redirecionado para a página de perfil', () => {
      const { getByTestId } = render(
        <AutenticacaoProvider valoresIniciais={{ estaLogade: true, tokenAutenticacao: true }}>
          <AppTrackTransparencyProvider mock>
            <ConteudoDrawer />
          </AppTrackTransparencyProvider>
        </AutenticacaoProvider>
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
        </AppTrackTransparencyProvider>
      );
      const item = getByTestId(testIDs.DRAWER.ITEM_HOME);
      fireEvent.press(item);
      expect(mockedNavigate).toHaveBeenCalledWith('HOME');
    });
  });
  describe('Independente de autenticação', () => {
    let renderedObject;
    beforeEach(() => {
      renderedObject = render(
        <AppTrackTransparencyProvider mock>
          <ConteudoDrawer />
        </AppTrackTransparencyProvider>
      );
    });

    describe('Quando clico em Fale Conosco', () => {
      test('então sou redirecionado para a página de Fale Conosco', () => {
        const item = renderedObject.getByTestId(testIDs.DRAWER.ITEM_FALECONOSCO);
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
        const item = renderedObject.getByTestId(testIDs.DRAWER.ITEM_SOBRE_O_ISUS);
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('SOBRE');
      });
    });
    describe('Quando clico em Termos de Uso', () => {
      test('então sou redirecionado para a página Termos de Uso', () => {
        const item = renderedObject.getByTestId(testIDs.DRAWER.ITEM_TERMOS_DE_USO);
        fireEvent.press(item);
        expect(mockedNavigate).toHaveBeenCalledWith('TERMOS_DE_USO');
      });
    });
    describe('Quando clico em Compartilhar', () => {
      test('então exibo o pop-up de compartilhamento do celular', () => {
        const item = renderedObject.getByTestId(testIDs.DRAWER.ITEM_COMPARTILHE_O_ISUS);
        fireEvent.press(item);
        expect(aoCompartilhar).toHaveBeenCalled();
      });
    });
    describe('Quando o menu é exibido', () => {
      test('Então a versão é visualizada na parte inferior do menu.', () => {
        const versaoSistema = packageJson.version;
        const item = renderedObject.getByText(`Versão ${versaoSistema}`);
        expect(item.props.children[2]).toEqual(versaoSistema);
      });
    });
  });
});
