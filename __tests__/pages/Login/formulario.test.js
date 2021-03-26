import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { analyticsData } from '../../../src/utils/analytics';
import { TESTIDS } from '../../../src/constantes/testIDs';
import FormularioLogin from '../../../src/pages/Login/formulario';

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

test('deve chamar o analytics data ao clicar em "Fazer Login"', () => {
  const { getByTestId } = render(
    <FormularioLogin />
  );
  const item = getByTestId(TESTIDS.BUTTON_FAZER_LOGIN);

  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar em "Fazer Login" com os parâmetros corretamente', () => {
  const { getByTestId } = render(
    <FormularioLogin />
  );
  const item = getByTestId(TESTIDS.BUTTON_FAZER_LOGIN);

  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalledWith('fazer_login', 'Click', 'Perfil');
});

test('deve chamar o analytics data ao clicar em "Esqueci Minha Senha"', () => {
  const { getByTestId } = render(
    <FormularioLogin />
  );
  const item = getByTestId(TESTIDS.BUTTON_ESQUECI_SENHA);

  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar em "Esqueci Minha Senha" com os parâmetros corretamente', () => {
  const { getByTestId } = render(
    <FormularioLogin />
  );
  const item = getByTestId(TESTIDS.BUTTON_ESQUECI_SENHA);

  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalledWith('esqueci_minha_senha', 'Click', 'Perfil');
});
