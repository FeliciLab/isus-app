import React from 'react';
import { fireEvent, render } from 'util-teste';
import { TESTIDS } from '~/constantes/testIDs';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import FormularioLogin from '~/pages/Login/FormularioLogin';
import { analyticsData } from '~/utils/analytics';

const mockedNavigate = jest.fn();

const EMAIL = 'ruiguemo@gmail.com';

const SENHA = '12345678';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: jest.fn(),
  }),
  useIsFocused: jest.fn(),
}));

// Mock abaixo não necessário enquanto usar 'yup' para validar
// jest.mock('../../../src/utils/validadores', () => ({
//   emailValido: jest.fn(() => true),
//   senhaValido: jest.fn(() => true),
// }));

// Mock não necessário devido a remoção do teste de conectividade
// jest.mock('@react-native-community/netinfo', () => ({
//   ...jest.requireActual('@react-native-community/netinfo'),
//   useNetInfo: () => ({
//     isConnected: true,
//   }),
// }));

/*
 * Mock para trocar o KASV por ScrollView durante os testes, pois o
 * FormularioLogin é encapsulado pelo componente IDSaudeLoginTemplate
 * https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/493
 */
jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = require('react-native').ScrollView;
  return { KeyboardAwareScrollView };
});

describe('Login > Formulario', () => {
  describe('DADO que estou na tela de login', () => {
    let campoEmail;

    let campoSenha;

    beforeEach(() => {
      const { getByTestId } = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <FormularioLogin />
        </AppTrackTransparencyContext.Provider>,
      );

      campoEmail = getByTestId(TESTIDS.FORMULARIO.LOGIN.CAMPO_EMAIL);

      campoSenha = getByTestId(TESTIDS.FORMULARIO.LOGIN.CAMPO_SENHA);
    });
    describe('E renderizo a pagina', () => {
      test('ENTÃO o campo e-mail deve estar em branco.', () => {
        console.log('CAMPO EMAIL: ', campoEmail);
        expect(campoEmail.props.value).toEqual('');
      });

      test('ENTÃO o campo senha deve estar em branco.', () => {
        expect(campoSenha.props.value).toEqual('');
      });
    });
  });

  describe('Testes de Analytics da tela Login', () => {
    let botaoFazerLogin;

    let botaoEsqueciSenha;

    let campoEmail;

    let campoSenha;

    beforeEach(() => {
      const { getByTestId } = render(
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <FormularioLogin />
        </AppTrackTransparencyContext.Provider>,
      );

      botaoFazerLogin = getByTestId(TESTIDS.BUTTON_FAZER_LOGIN);

      botaoEsqueciSenha = getByTestId(TESTIDS.BUTTON_ESQUECI_SENHA);

      campoEmail = getByTestId(TESTIDS.FORMULARIO.LOGIN.CAMPO_EMAIL);

      campoSenha = getByTestId(TESTIDS.FORMULARIO.LOGIN.CAMPO_SENHA);

      fireEvent.changeText(campoEmail, EMAIL);

      fireEvent.changeText(campoSenha, SENHA);

      fireEvent.press(botaoFazerLogin);
    });

    test('Campo email deve estar preenchido', () => {
      expect(campoEmail.props.value).toEqual(EMAIL);
    });

    test('Campo senha deve estar preenchido', () => {
      expect(campoSenha.props.value).toEqual(SENHA);
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
