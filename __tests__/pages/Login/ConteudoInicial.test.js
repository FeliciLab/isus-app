import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { analyticsData } from '../../../src/utils/analytics';
import ConteudoInicial from '../../../src/pages/Login/ConteudoInicial';
import { TESTIDS } from '../../../src/constantes/testIDs';
import { labelsAnalytics } from '../../../src/constantes/labelsAnalytics';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: jest.fn(),
  }),
  useIsFocused: jest.fn(),
}));


test(`deve chamar o analytics data ao clicar em ${TESTIDS.BUTTON_REALIZAR_CADASTRO}`, () => {
  const { getByTestId } = render(
    <ConteudoInicial alterarPossuirIDSaude={mockedNavigate} />
  );
  const item = getByTestId(TESTIDS.BUTTON_REALIZAR_CADASTRO);

  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test(`deve chamar o analytics data ao clicar em ${TESTIDS.BUTTON_REALIZAR_CADASTRO} com parametros corretos`, () => {
  const { getByTestId } = render(
    <ConteudoInicial alterarPossuirIDSaude={mockedNavigate} />
  );
  const item = getByTestId(TESTIDS.BUTTON_REALIZAR_CADASTRO);

  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalledWith(
    labelsAnalytics.BUTTON_REALIZAR_CADASTRO,
    'Click',
    'Perfil'
  );
});

test('deve chamar o analytics data ao clicar em "Já possuo ID Saúde"', () => {
  const { getByTestId } = render(
    <ConteudoInicial alterarPossuirIDSaude={mockedNavigate} />
  );
  const item = getByTestId(TESTIDS.BUTTON_JA_POSSUO_ID_SAUDE);

  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});

test('deve chamar o analytics data ao clicar em "Já possuo ID Saúde com Parametros corretos"', () => {
  const { getByTestId } = render(
    <ConteudoInicial alterarPossuirIDSaude={mockedNavigate} />
  );
  const item = getByTestId(TESTIDS.BUTTON_JA_POSSUO_ID_SAUDE);

  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalledWith('ja_possuo_id_saude', 'Click', 'Perfil');
});
