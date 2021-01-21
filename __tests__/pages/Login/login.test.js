import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import { analyticsData } from '../../../src/utils/analytics';
import ConteudoInicial from '../../../src/pages/Login/ConteudoInicial';
import { TESTIDS } from '../../../src/constantes/testIDs';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: jest.fn(),
  }),
  useIsFocused: jest.fn(),
}));


test('deve chamar o analytics data ao clicar no "Já possuo ID Saúde"', () => {
  const alterarPossuirIDSaude = jest.fn();
  const { getByTestId } = render(<ConteudoInicial alterarPossuirIDSaude={alterarPossuirIDSaude} />);
  const item = getByTestId(TESTIDS.BUTTON_JA_POSSUO_ID_SAUDE);
  fireEvent.press(item);
  expect(analyticsData).toHaveBeenCalled();
});
