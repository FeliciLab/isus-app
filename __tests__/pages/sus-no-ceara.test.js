/* eslint-disable import/no-unresolved */
import React from 'react';
import { fireEvent, render } from 'util-teste';
import testIDs from '../../src/constantes/testIDs';
import SusNoCearaScreen from '../../src/pages/SusNoCeara';
import { analyticsData } from '../../src/utils/analytics';

const mockedNavigate = jest.fn();
let item = null;
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useIsFocused: jest.fn()
}));

beforeEach(() => {
  const { getByTestId } = render(<SusNoCearaScreen />);
  item = getByTestId(testIDs.SUS_NO_CEARA_ACORDION_SUS_NO_CEARA);
});

describe('Teste do SUS no Ceará no Menu Lateral', () => {
  test('deve mostrar a aba de SUS no Ceará quando renderizar a tela de sus no Ceará', () => {
    expect(item).not.toBeNull();
  });


  test('deve chanar analyticsData quando clicar Acordion', () => {
    fireEvent.press(item);
    expect(analyticsData).tobeCalled();
  });
});
