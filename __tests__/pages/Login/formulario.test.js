import React from 'react';
import { fireEvent, render, act } from 'util-teste';
import { TESTIDS } from '~/constantes/testIDs';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import { autenticarComIdSaude } from '~/services/autenticacao';
import FormularioLogin from '~/pages/Login/FormularioLogin';
import { analyticsData } from '~/utils/analytics';

const mockedNavigate = jest.fn();

const EMAIL = 'ruiguemo@gmail.com';

const SENHA = '12345678';

const redirectRouteMocked = 'redirectRouteMocked';

jest.mock('../../../src/services/autenticacao');

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: jest.fn(),
  }),
  useRoute: jest.fn(() => ({
    params: {
      redirectRoute: redirectRouteMocked,
    },
  })),
  useIsFocused: jest.fn(),
}));

const renderFormularioLogin = () =>
  render(
    <AppTrackTransparencyContext.Provider
      value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
      <FormularioLogin />
    </AppTrackTransparencyContext.Provider>,
  );

describe('Login > Formulario', () => {
  describe('DADO que estou na tela de login', () => {
    let campoUsername;

    let campoSenha;

    beforeEach(() => {
      const { getByTestId } = renderFormularioLogin();

      campoUsername = getByTestId(TESTIDS.FORMULARIO.LOGIN.CAMPO_USERNAME);

      campoSenha = getByTestId(TESTIDS.FORMULARIO.LOGIN.CAMPO_SENHA);
    });

    describe('E renderizo a pagina', () => {
      test('ENTÃO o campo e-mail deve estar em branco.', () => {
        expect(campoUsername.props.value).toEqual('');
      });

      test('ENTÃO o campo senha deve estar em branco.', () => {
        expect(campoSenha.props.value).toEqual('');
      });
    });
  });

  describe('Testes de validações', () => {
    test('Deve exibir erro de campos obrigatórios', async () => {
      const { getByTestId, getAllByText } = renderFormularioLogin();

      const botaoFazerLogin = getByTestId(TESTIDS.BUTTON_FAZER_LOGIN);

      await act(async () => {
        fireEvent.press(botaoFazerLogin);
      });

      const msgErrors = getAllByText('Campo obrigatório');

      expect(msgErrors.length).toBe(2);
    });

    test('Deve exibir erro de email inválido', async () => {
      const { getByText, getByTestId } = renderFormularioLogin();

      const campoEmail = getByTestId(TESTIDS.FORMULARIO.LOGIN.CAMPO_EMAIL);

      const botaoFazerLogin = getByTestId(TESTIDS.BUTTON_FAZER_LOGIN);

      // email inválido
      fireEvent.changeText(campoEmail, 'ABCDEFG');

      await act(async () => {
        fireEvent.press(botaoFazerLogin);
      });

      const msgError = getByText('Email inválido');

      expect(msgError).toBeTruthy();
    });

    test('Deve exibir erro de senha menos que 8 dígitos', async () => {
      const { getByText, getByTestId } = renderFormularioLogin();

      const campoSenha = getByTestId(TESTIDS.FORMULARIO.LOGIN.CAMPO_SENHA);

      const botaoFazerLogin = getByTestId(TESTIDS.BUTTON_FAZER_LOGIN);

      // email inválido
      fireEvent.changeText(campoSenha, '1234567');

      await act(async () => {
        fireEvent.press(botaoFazerLogin);
      });

      const msgError = getByText('Senha dever ter pelo menos 8 caracteres');

      expect(msgError).toBeTruthy();
    });
  });

  describe('Testes de Analytics da tela Login', () => {
    let botaoFazerLogin;
    let botaoEsqueciSenha;
    let campoUsername;
    let campoSenha;

    beforeEach(async () => {
      const { getByTestId } = renderFormularioLogin();

      botaoFazerLogin = getByTestId(TESTIDS.BUTTON_FAZER_LOGIN);

      botaoEsqueciSenha = getByTestId(TESTIDS.BUTTON_ESQUECI_SENHA);

      campoUsername = getByTestId(TESTIDS.FORMULARIO.LOGIN.CAMPO_USERNAME);

      campoSenha = getByTestId(TESTIDS.FORMULARIO.LOGIN.CAMPO_SENHA);

      fireEvent.changeText(campoUsername, EMAIL);

      fireEvent.changeText(campoSenha, SENHA);

      fireEvent.press(botaoFazerLogin);
    });

    test('Campo email deve estar preenchido', () => {
      expect(campoUsername.props.value).toEqual(EMAIL);
    });

    test('Campo senha deve estar preenchido', () => {
      expect(campoSenha.props.value).toEqual(SENHA);
    });

    test('deve chamar o analytics data ao clicar em "Fazer Login"', async () => {
      await act(() => {
        fireEvent.press(botaoFazerLogin);
      });

      expect(analyticsData).toHaveBeenCalled();
    });

    test('deve chamar o analytics data ao clicar em "Fazer Login" com os parâmetros corretamente', async () => {
      await act(() => {
        fireEvent.press(botaoFazerLogin);
      });

      expect(analyticsData).toHaveBeenCalledWith(
        'fazer_login',
        'Click',
        'Perfil',
      );
    });

    test('deve chamar o analytics data ao clicar em "Esqueci Minha Senha"', async () => {
      await act(() => {
        fireEvent.press(botaoFazerLogin);
      });

      expect(analyticsData).toHaveBeenCalled();
    });

    test('deve chamar o autenticarComIdSaude ao clicar em "Fazer Login" com os parâmetros corretamente', async () => {
      await act(() => {
        fireEvent.press(botaoFazerLogin);
      });

      expect(autenticarComIdSaude).toHaveBeenCalledWith(EMAIL, SENHA);
    });

    test('deve chamar o analytics data ao clicar em "Esqueci Minha Senha"', async () => {
      await act(() => {
        fireEvent.press(botaoEsqueciSenha);
      });

      expect(analyticsData).toHaveBeenCalled();
    });

    test('deve redirecionar no final de tudo', async () => {
      await act(() => {
        fireEvent.press(botaoFazerLogin);
      });

      expect(mockedNavigate).toHaveBeenCalled();
    });
  });
});
