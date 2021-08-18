import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { analyticsData } from '../../../src/utils/analytics';
import { TESTIDS } from '../../../src/constantes/testIDs';
import FormularioLogin from '../../../src/pages/Login/formulario';
import { FormProvider } from '../../../src/context/FormContext';
import { AppTrackTransparencyProvider } from '../../../src/context/AppTrackTransparencyContext';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: jest.fn(),
  }),
  useIsFocused: jest.fn(),
}));

jest.mock('../../../src/utils/validadores', () => ({
  emailValido: jest.fn(() => true),
  senhaValido: jest.fn(() => true)
}));

jest.mock('@react-native-community/netinfo', () => ({
  ...jest.requireActual('@react-native-community/netinfo'),
  useNetInfo: () => ({
    isConnected: true,
  })
}));

describe('Login>Formulario', () => {
  describe('Tela Login Sem Conexão', () => {
    describe('DADO que estou na tela de login', () => {
      const email = 'test@test.com';
      const senha = '12345678';
      let campoEmailID;

      beforeEach(() => {
        const { getByTestId } = render(
          <AppTrackTransparencyProvider mock>
            <FormProvider initValues={{ email, senha }}>
              <FormularioLogin />
            </FormProvider>
          </AppTrackTransparencyProvider>
        );
        campoEmailID = getByTestId(TESTIDS.FORMULARIO.LOGIN.CAMPO_EMAIL);
      });

      describe('E renderizo a pagina', () => {
        beforeEach(() => {
        });
        test('ENTÃO o campo e-mail deve estar em branco.', () => {
          expect(campoEmailID.props.value).toEqual('');
        });
      });
    });
  });

  describe('Testes de Analytics da tela Login', () => {
    let botaoFazerLogin;
    let botaoEsqueciSenha;

    beforeEach(() => {
      const { getByTestId } = render(
        <AppTrackTransparencyProvider mock>
          <FormProvider>
            <FormularioLogin />
          </FormProvider>
        </AppTrackTransparencyProvider>
      );
      botaoFazerLogin = getByTestId(TESTIDS.BUTTON_FAZER_LOGIN);
      botaoEsqueciSenha = getByTestId(TESTIDS.BUTTON_ESQUECI_SENHA);
    });

    test('deve chamar o analytics data ao clicar em "Fazer Login"', () => {
      fireEvent.press(botaoFazerLogin);
      expect(analyticsData).toHaveBeenCalled();
    });

    test('deve chamar o analytics data ao clicar em "Fazer Login" com os parâmetros corretamente', () => {
      fireEvent.press(botaoFazerLogin);
      expect(analyticsData)
        .toHaveBeenCalledWith('fazer_login', 'Click', 'Perfil');
    });

    test('deve chamar o analytics data ao clicar em "Esqueci Minha Senha"', () => {
      fireEvent.press(botaoEsqueciSenha);
      expect(analyticsData).toHaveBeenCalled();
    });

    test('deve chamar o analytics data ao clicar em "Esqueci Minha Senha" com os parâmetros corretamente', () => {
      fireEvent.press(botaoEsqueciSenha);
      expect(analyticsData).toHaveBeenCalledWith('esqueci_minha_senha', 'Click', 'Perfil');
    });
  });
});
