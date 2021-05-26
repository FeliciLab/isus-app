import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { render, waitFor } from 'util-teste';

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

describe('DADO QUE estou na tela de edição de informações pessoais', () => {
  // let getTest;

  // beforeEach(() => {
  //   const { getByTestId, update } = render(
  //     <FormProvider>
  //        <EdicaoInfoPessoal />
  //     </FormProvider>
  //   );
  //   getTest = getByTestId;
  // });

  describe('QUANDO a tela é renderizada corretamente', () => {
    test('ENTÃO devo visualizar o texto no topo', () => {
      const { getByTestId } = render(
        <FormProvider>
          <EdicaoInfoPessoal />
        </FormProvider>
      );
      const textoTopo = 'Edite as informações pessoais que você deseja atualizar:';
      const textoTopoId = getByTestId('texto');
      expect(textoTopoId.props.children).toEqual(textoTopo);
    });

    test('ENTÃO um campo do tipo input/text deve ser exibido com a label Nome Completo', () => {
      const { getAllByText } = render(
        <FormProvider>
          <EdicaoInfoPessoal />
        </FormProvider>
      );
      const nomeLabel = 'Nome Completo';
      const labelId = getAllByText(nomeLabel);
      expect(labelId[0].props.children).toEqual(nomeLabel);
    });

    test('ENTÃO o campo Nome Completo deve estar preenchido com o nome da pessoa autenticada', async () => {
      const value = 'Jeferson';
      const { getByTestId } = render(
        <FormProvider initValues={{ nomeCompleto: 'Jeferson' }}>
          <EdicaoInfoPessoal />
        </FormProvider>
      );
      const nomeController = 'nomeCompleto';
      const campoID = getByTestId(`textinput-${nomeController}`);
      await waitFor(() => expect(campoID.props.value).toEqual(value));
    });

    test('ENTÃO um campo do tipo input/text deve ser exibido com a label E-mail', () => {
      const { getAllByText } = render(
        <FormProvider>
          <EdicaoInfoPessoal />
        </FormProvider>
      );
      const nomeLabel = 'E-mail';
      const labelId = getAllByText(nomeLabel);
      expect(labelId[0].props.children).toEqual(nomeLabel);
    });

    test('ENTÃO o campo E-mail deve estar preenchido com o nome da pessoa autenticada', async () => {
      const value = 'jeferson@aluno.esp.edu.br';
      const { getByTestId } = render(
        <FormProvider initValues={{ email: 'jeferson@aluno.esp.edu.br' }}>
          <EdicaoInfoPessoal />
        </FormProvider>
      );
      const nomeController = 'email';
      const campoID = getByTestId(`textinput-${nomeController}`);
      await waitFor(() => expect(campoID.props.value).toEqual(value));
    });
  });
});
