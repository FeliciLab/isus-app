import React from 'react';
import { fireEvent, render } from 'util-teste';
import { analyticsData } from '~/utils/analytics';
import { TESTIDS } from '~/constantes/testIDs';
import FormularioLogin from '~/pages/Login/formulario';
import { FormProvider } from '~/context/FormContext';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import modeloPessoaMock from '../../../__mocks__/valores/modeloPessoaMock';

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
  senhaValido: jest.fn(() => true),
}));

jest.mock('@react-native-community/netinfo', () => ({
  ...jest.requireActual('@react-native-community/netinfo'),
  useNetInfo: () => ({
    isConnected: true,
  }),
}));

describe('Login>Formulario', () => {
  describe('DADO que estou na tela de login', () => {
    let campoEmailID;

    beforeEach(() => {
      const { getByTestId } = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <FormProvider>
            <FormularioLogin />
          </FormProvider>
        </AppTrackTransparencyContext.Provider>,
      );
      campoEmailID = getByTestId(TESTIDS.FORMULARIO.LOGIN.CAMPO_EMAIL);
    });
    describe('E renderizo a pagina', () => {
      test('ENTÃO o campo e-mail deve estar em branco.', () => {
        expect(campoEmailID.props.value).toEqual('');
      });
    });
  });

  describe('Testes de Analytics da tela Login', () => {
    let botaoFazerLogin;
    let botaoEsqueciSenha;

    beforeEach(() => {
      const { getByTestId } = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <FormProvider initValues={modeloPessoaMock}>
            <FormularioLogin />
          </FormProvider>
        </AppTrackTransparencyContext.Provider>,
      );
      botaoFazerLogin = getByTestId(TESTIDS.BUTTON_FAZER_LOGIN);
      botaoEsqueciSenha = getByTestId(TESTIDS.BUTTON_ESQUECI_SENHA);
      fireEvent.press(botaoFazerLogin);
    });

    test('deve chamar o analytics data ao clicar em "Fazer Login"', () => {
      fireEvent.press(botaoFazerLogin);
      expect(analyticsData).toHaveBeenCalled();
    });

    test('deve chamar o analytics data ao clicar em "Fazer Login" com os parâmetros corretamente', () => {
      fireEvent.press(botaoFazerLogin);
      expect(analyticsData).toHaveBeenCalledWith(
        'fazer_login',
        'Click',
        'Perfil',
      );
    });

    test('deve chamar o analytics data ao clicar em "Esqueci Minha Senha"', () => {
      fireEvent.press(botaoEsqueciSenha);
      expect(analyticsData).toHaveBeenCalled();
    });

    test('deve chamar o analytics data ao clicar em "Esqueci Minha Senha" com os parâmetros corretamente', () => {
      fireEvent.press(botaoEsqueciSenha);
      expect(analyticsData).toHaveBeenCalledWith(
        'esqueci_minha_senha',
        'Click',
        'Perfil',
      );
    });
  });
});
