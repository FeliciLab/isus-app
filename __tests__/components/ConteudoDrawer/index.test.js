/* eslint-disable import/no-unresolved */
import React from 'react';
import { render } from 'util-teste';
import ConteudoDrawer from '../../../src/components/ConteudoDrawer';
import { TESTIDS } from '../../../src/constantes/testIDs';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useIsFocused: jest.fn()
}));

jest.mock('../../../src/components/ConteudoDrawer/aoCompartilhar', () => jest.fn());

describe('testes de interface para o menu lateral do app', () => {
  describe('Dado que clico no menu lateral', () => {
    describe('Quando o menu lateral abre', () => {
      test('então visualizo a logo do iSUS', () => {
        const { getByTestId } = render(
          <ConteudoDrawer />
        );
        const item = getByTestId('svg-heart');
        expect(item).not.toBeNull();
        expect(item.type).toEqual('SvgMock');
      });
      test('então visualizo o texto e o ícone da HOME', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer />
        );
        const itemNome = queryAllByText('Home');
        const item = getByTestId(TESTIDS.ICONS.ICON_HOME);
        expect(itemNome[0].props.children).toEqual('Home');
        expect(item.props.children).not.toBeNull();
      });
      test('então visualizo o icone do boneco (account) e o texto Meu Perfil', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer />
        );
        const itemNome = queryAllByText('Meu perfil');
        const item = getByTestId(TESTIDS.ICONS.ICON_PERFIL);
        expect(itemNome[0].props.children).toEqual('Meu perfil');
        expect(item.props.children).not.toBeNull();
      });
      test('então visualizo o icone do chat+exclamação (feedback) e visualizo o texto Fale Conosco', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer />
        );
        const itemNome = queryAllByText('Fale conosco');
        const item = getByTestId(TESTIDS.ICONS.ICON_FALECONOSCO);
        expect(itemNome[0].props.children).toEqual('Fale conosco');
        expect(item.props.children).not.toBeNull();
      });
      test('então visualizo o icone do circulo+interrogação (help-circle) e visualizo o texto SUS no Ceará', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer />
        );
        const itemNome = queryAllByText('SUS no Ceará');
        const item = getByTestId(TESTIDS.ICONS.ICON_SUSNOCEARA);
        expect(itemNome[0].props.children).toEqual('SUS no Ceará');
        expect(item.props.children).not.toBeNull();
      });
      test('então visualizo o icone do circulo+interrogação (information) e visualizo o texto Sobre o iSUS', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer />
        );
        const itemNome = queryAllByText('Sobre o iSUS');
        const item = getByTestId(TESTIDS.ICONS.ICON_SOBRE_O_ISUS);
        expect(itemNome[0].props.children).toEqual('Sobre o iSUS');
        expect(item.props.children).not.toBeNull();
      });
      test('então visualizo o icone do circulo+interrogação (clipboard-text) e visualizo o texto Termos de Uso', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer />
        );
        const itemNome = queryAllByText('Termos de Uso');
        const item = getByTestId(TESTIDS.ICONS.ICON_TERMOS_DE_USO);
        expect(itemNome[0].props.children).toEqual('Termos de Uso');
        expect(item.props.children).not.toBeNull();
      });
      test('então visualizo o icone do circulo+interrogação (share-varian) e visualizo o texto Compartilhar', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer />
        );
        const itemNome = queryAllByText('Compartilhar');
        const item = getByTestId(TESTIDS.ICONS.ICON_COMPARTILHAR);
        expect(itemNome[0].props.children).toEqual('Compartilhar');
        expect(item.props.children).not.toBeNull();
      });
    });
  });
});
