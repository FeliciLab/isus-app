import React from 'react';
import { render, fireEvent } from 'util-teste';
import { TESTIDS } from '../../../src/constantes/testIDs';
import { AppTrackTransparencyContext } from '../../../src/context/AppTrackTransparencyContext';
import SemConexao from '../../../src/pages/SemConexao';

const mockLinking = jest.fn(() => Promise.resolve('500'));
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: mockLinking,
}));

jest.mock('@react-native-community/netinfo', () => ({
  ...jest.requireActual('@react-native-community/netinfo'),
  useNetInfo: () => ({
    isConnected: true,
  }),
}));

const mockNavigation = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigation,
    replace: mockNavigation,
    setOptions: mockNavigation,
  }),
  useIsFocused: jest.fn(),
}));

describe('SemConexao', () => {
  describe('testes na tela de sem conexão webviews', () => {
    test(`renderizar ${TESTIDS.SEM_CONEXAO.BOTAO_VOLTAR}`, () => {
      const params = {
        componente: 'webview',
        title: '',
        url: '',
        rota: '',
        expanded: true,
      };
      const { getByTestId } = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <SemConexao {...{ route: { params } }} />
        </AppTrackTransparencyContext.Provider>,
      );
      const BotaoVoltar = getByTestId(TESTIDS.SEM_CONEXAO.BOTAO_VOLTAR);

      fireEvent.press(BotaoVoltar);
      expect(BotaoVoltar).not.toBeNull();
      expect(mockNavigation).toHaveBeenCalled();

      const iconeLaranja = getByTestId(
        TESTIDS.SEM_CONEXAO.ICONE_SEM_CONEXAO_LARANJA,
      );
      expect(iconeLaranja).not.toBeNull();
    });

    test(`renderizar ${TESTIDS.SEM_CONEXAO.BOTAO_TENTAR_NOVAMENTE}`, () => {
      const params = {
        componente: 'webview',
        title: '',
        url: '',
        rota: '',
        expanded: true,
      };
      const { getByTestId } = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <SemConexao {...{ route: { params } }} />
        </AppTrackTransparencyContext.Provider>,
      );
      const BotaoTentarNovamente = getByTestId(
        TESTIDS.SEM_CONEXAO.BOTAO_TENTAR_NOVAMENTE,
      );

      fireEvent.press(BotaoTentarNovamente);
      expect(BotaoTentarNovamente).not.toBeNull();
      expect(mockNavigation).toHaveBeenCalled();
    });

    test(`renderizar ${TESTIDS.SEM_CONEXAO.BOTAO_VOLTAR} da tela falha de conexão`, () => {
      const params = {
        componente: 'webview',
        title: '',
        url: '',
        rota: '',
        expanded: true,
      };

      const { getByTestId } = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <SemConexao {...{ route: { params } }} />
        </AppTrackTransparencyContext.Provider>,
      );
      const BotaoTentarNovamente = getByTestId(
        TESTIDS.SEM_CONEXAO.BOTAO_TENTAR_NOVAMENTE,
      );
      fireEvent.press(BotaoTentarNovamente);
      fireEvent.press(BotaoTentarNovamente);
      fireEvent.press(BotaoTentarNovamente);
      expect(BotaoTentarNovamente).not.toBeNull();
      expect(mockNavigation).toHaveBeenCalled();

      const iconeVermelho = getByTestId(
        TESTIDS.SEM_CONEXAO.ICONE_SEM_CONEXAO_VERMELHO,
      );
      expect(iconeVermelho).not.toBeNull();
    });
  });

  describe('testes na tela de sem conexão browser', () => {
    test('renderizar tela ESP Virtual com e sem parametros', () => {
      const params = {
        componente: 'browser',
        title: '',
        url: 'http://espvirtual.esp.ce.gov.br/',
        rota: '',
        expanded: true,
      };

      const { getByTestId } = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <SemConexao {...{ route: { params } }} />
        </AppTrackTransparencyContext.Provider>,
      );
      const BotaoTentarNovamente = getByTestId(
        TESTIDS.SEM_CONEXAO.BOTAO_TENTAR_NOVAMENTE,
      );
      fireEvent.press(BotaoTentarNovamente);
      expect(BotaoTentarNovamente).not.toBeNull();
      expect(mockLinking).toHaveBeenCalled();
      expect(mockLinking).toHaveBeenCalledWith(params.url);
    });
  });
});
