// import React, { useContext } from 'react';
// eslint-disable-next-line import/no-unresolved
// import { render } from 'util-teste';
// import TextInputMask from '../../../../__mocks__/react-native-text-input-mask';
// import { FormContext, FormProvider } from '../../../../src/context/FormContext';
// import EdicaoInfoPessoal from '../../../../src/pages/Perfil/EdicaoInfoPessoal';

jest.mock('react-native-text-input-mask', () => ({
  mask: jest.fn()
}));

const mockNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigation
  }),
  useIsFocused: jest.fn()
}));

// const mockTextInputMask = jest.fn();
// jest.mock('react-native-text-input-mask', () => ({
//   mask: mockTextInputMask,
//   default: mockTextInputMask
// }));

describe('Dado que estou na tela de edição de informações pessoais', () => {
  // let compTextoTopo;
  // const textoTopo = 'Edite as informações pessoais que você deseja atualizar';

  beforeEach(() => {
    // const { getByTestId } = render(
    //   <FormProvider>
    //     <EdicaoInfoPessoal />
    //   </FormProvider>
    // );
    // compTextoTopo = getByTestId('texto');
  });
  describe('Quando a tela é renderizada corretamente', () => {
    test('Então devo visualizar o texto no topo', () => {
      // expect(compTextoTopo).toEqual(textoTopo);
    });
  });
});
