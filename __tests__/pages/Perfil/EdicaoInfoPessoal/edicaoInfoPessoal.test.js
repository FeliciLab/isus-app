import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { render } from 'util-teste';
import { FormProvider } from '../../../../src/context/FormContext';
import EdicaoInfoPessoal from '../../../../src/pages/Perfil/EdicaoInfoPessoal';

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
  let getTest;
  const textoTopo = 'Edite as informações pessoais que você deseja atualizar:';

  beforeEach(() => {
    const { getByTestId } = render(
      <FormProvider>
        <EdicaoInfoPessoal />
      </FormProvider>
    );
    getTest = getByTestId;
  });
  
  describe('Quando a tela é renderizada corretamente', () => {
    test('Então devo visualizar o texto no topo', () => {
      compTextoTopo = getTest('texto');
      expect(compTextoTopo.props.children).toEqual(textoTopo);
    });
  });
});
