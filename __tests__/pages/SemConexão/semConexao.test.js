/* eslint-disable import/no-unresolved */
import React from 'react';
import { render, fireEvent } from 'util-teste';
import { TESTIDS } from '../../../src/constantes/testIDs';
import SemConexao from '../../../src/pages/SemConexao';


jest.mock('@react-native-community/netinfo', () => ({
  ...jest.requireActual('@react-native-community/netinfo'),
  useNetInfo: () => ({
    isConnected: true,
  })
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

describe('testes na tela de sem conexão webviews', () => {
  // test(`renderizar ${TESTIDS.SEM_CONEXAO.BOTAO_VOLTAR}`, () => {
  //   const params = {
  //     componente: 'webview',
  //     title: '',
  //     url: '',
  //     rota: '',
  //     expanded: true
  //   };
  //   const { getByTestId } = render(
  //     <SemConexao {...{ route: { params } }} />
  //   );
  //   const BotaoVoltar = getByTestId(TESTIDS.SEM_CONEXAO.BOTAO_VOLTAR);

  //   fireEvent.press(BotaoVoltar);
  //   expect(BotaoVoltar).not.toBeNull();
  //   expect(mockedNavigate).toHaveBeenCalled();

  //   const iconeLaranja = getByTestId(TESTIDS.SEM_CONEXAO.ICONE_SEM_CONEXAO_LARANJA);
  //   expect(iconeLaranja).not.toBeNull();
  // });

  // test(`renderizar ${TESTIDS.SEM_CONEXAO.BOTAO_TENTAR_NOVAMENTE}`, () => {
  //   const params = {
  //     componente: 'webview',
  //     title: '',
  //     url: '',
  //     rota: '',
  //     expanded: true
  //   };
  //   const { getByTestId } = render(<SemConexao {...{ route: { params } }} />);
  //   const BotaoTentarNovamente = getByTestId(
  //     TESTIDS.SEM_CONEXAO.BOTAO_TENTAR_NOVAMENTE
  //   );

  //   fireEvent.press(BotaoTentarNovamente);
  //   expect(BotaoTentarNovamente).not.toBeNull();
  //   expect(mockedNavigate).toHaveBeenCalled();
  // });

  test(`renderizar ${TESTIDS.SEM_CONEXAO.BOTAO_VOLTAR} da tela falha de conexão`, () => {
    const params = {
      componente: 'webview',
      title: '',
      url: '',
      rota: '',
      expanded: true
    };

    const { getByTestId } = render(<SemConexao {...{ route: { params } }} />);
    const BotaoTentarNovamente = getByTestId(
      TESTIDS.SEM_CONEXAO.BOTAO_TENTAR_NOVAMENTE
    );
    fireEvent.press(BotaoTentarNovamente);
    fireEvent.press(BotaoTentarNovamente);
    fireEvent.press(BotaoTentarNovamente);
    expect(BotaoTentarNovamente).not.toBeNull();
    expect(mockedNavigate).toHaveBeenCalled();

    const iconeVermelho = getByTestId(TESTIDS.SEM_CONEXAO.ICONE_SEM_CONEXAO_VERMELHO);
    expect(iconeVermelho).not.toBeNull();
  });
});
describe('testes na tela de sem conexão browser', () => {
  test('renderizar tela ESP Virtual ', () => {
    const params = {
      componente: 'browser',
      title: '',
      url: '',
      rota: '',
      expanded: true
    };

    const { getByTestId } = render(<SemConexao {...{ route: { params } }} />);
    const BotaoTentarNovamente = getByTestId(TESTIDS.SEM_CONEXAO.BOTAO_TENTAR_NOVAMENTE);
    fireEvent.press(BotaoTentarNovamente);
    expect(BotaoTentarNovamente).not.toBeNull();
  });
});
