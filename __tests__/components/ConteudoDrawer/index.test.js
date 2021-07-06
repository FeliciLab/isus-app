/* eslint-disable import/no-unresolved */
import React from 'react';
import { render } from 'util-teste';
import ConteudoDrawer from '../../../src/components/ConteudoDrawer';

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
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.type).toEqual('SvgMock');
      });
      test('então visualizo o texto e o ícone da HOME', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer />
        );
        const itemNome = queryAllByText('Home');
        const item = getByTestId('icon-drawer-home');
        // eslint-disable-next-line no-underscore-dangle
        expect(itemNome[0]._fiber.memoizedProps.children).toEqual('Home');
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children).not.toBeNull();
      });
      test('então visualizo o icone do boneco (account) e o texto Meu Perfil', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer />
        );
        const itemNome = queryAllByText('Meu perfil');
        const item = getByTestId('icon-drawer-account');
        // eslint-disable-next-line no-underscore-dangle
        expect(itemNome[0]._fiber.memoizedProps.children).toEqual('Meu perfil');
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children).not.toBeNull();
      });
      test('então visualizo o icone do chat+exclamação (feedback) e visualizo o texto Fale Conosco', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer />
        );
        const itemNome = queryAllByText('Fale conosco');
        const item = getByTestId('icon-drawer-feedback');
        // eslint-disable-next-line no-underscore-dangle
        expect(itemNome[0]._fiber.memoizedProps.children).toEqual('Fale conosco');
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children).not.toBeNull();
      });
      test('então visualizo o icone do circulo+interrogação (help-circle) e visualizo o texto SUS no Ceará', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer />
        );
        const itemNome = queryAllByText('SUS no Ceará');
        const item = getByTestId('icon-drawer-susnoceara');
        // eslint-disable-next-line no-underscore-dangle
        expect(itemNome[0]._fiber.memoizedProps.children).toEqual('SUS no Ceará');
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children).not.toBeNull();
      });
      test('então visualizo o icone do circulo+interrogação (information) e visualizo o texto Sobre o iSUS', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer />
        );
        const itemNome = queryAllByText('Sobre o iSUS');
        const item = getByTestId('icon-drawer-information');
        // eslint-disable-next-line no-underscore-dangle
        expect(itemNome[0]._fiber.memoizedProps.children).toEqual('Sobre o iSUS');
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children).not.toBeNull();
      });
      test('então visualizo o icone do circulo+interrogação (clipboard-text) e visualizo o texto Termos de Uso', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer />
        );
        const itemNome = queryAllByText('Termos de Uso');
        const item = getByTestId('icon-drawer-clipboard-text');
        // eslint-disable-next-line no-underscore-dangle
        expect(itemNome[0]._fiber.memoizedProps.children).toEqual('Termos de Uso');
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children).not.toBeNull();
      });
      test('então visualizo o icone do circulo+interrogação (share-varian) e visualizo o texto Compartilhar', () => {
        const { getByTestId, queryAllByText } = render(
          <ConteudoDrawer />
        );
        const itemNome = queryAllByText('Compartilhar');
        const item = getByTestId('icon-drawer-share-variant');
        // eslint-disable-next-line no-underscore-dangle
        expect(itemNome[0]._fiber.memoizedProps.children).toEqual('Compartilhar');
        // eslint-disable-next-line no-underscore-dangle
        expect(item._fiber.memoizedProps.children).not.toBeNull();
      });
    });
  });
});
