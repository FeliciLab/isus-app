/* eslint-disable no-unused-vars */
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { render, waitFor } from 'util-teste';
import { FormProvider } from '../../../../src/context/FormContext';
import EdicaoInfoPessoal from '../../../../src/pages/Perfil/EdicaoInfoPessoal';
// import dadosUsuario from '../../../../__mocks__/valores/dadosUsuario';

const mockNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigation,
    setOptions: mockNavigation
  }),
  useIsFocused: jest.fn()
}));

describe('Dado que estou na tela de edição de informações pessoais', () => {
  let compTextoTopo;
  const textoTopo = 'Edite as informações pessoais que você deseja atualizar:';
  // let campoId;
  beforeEach(() => {
    const { getByTestId } = render(
      <FormProvider>
        <EdicaoInfoPessoal />
      </FormProvider>
    );
    compTextoTopo = getByTestId('texto');
    // campoId = getByTestId('nomeCompleto');
  });
  describe('Quando a tela é renderizada corretamente', () => {
    test('Então devo visualizar o texto no topo', () => {
      expect(compTextoTopo.props.children).toEqual(textoTopo);
    });
    test('Então devo visualizar o texto no topo', async () => {
      // console.log(campoId);
      // await waitFor(() => expect(campoId.props).toEqual('Nome Completo'));
    });
  });
});
