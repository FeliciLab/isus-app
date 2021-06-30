import React from 'react';
import {
  render, waitFor, cleanup
  // eslint-disable-next-line import/no-unresolved
} from 'util-teste';
import { FormProvider } from '../../../../src/context/FormContext';
import EdicaoInfoPessoal from '../../../../src/pages/Perfil/EdicaoInfoPessoal';
import modeloPessoaMock from '../../../../__mocks__/valores/modeloPessoaMock';
import { AutenticacaoProvider } from '../../../../src/context/AutenticacaoContext';

const mockNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigation,
    setOptions: mockNavigation
  }),
  useIsFocused: jest.fn()
}));

// Ver documentacao da testing-library sobre fakeTimers
afterEach(cleanup, () => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('DADO QUE estou na tela de edição de informações pessoais', () => {
  describe('QUANDO a tela é renderizada corretamente', () => {
    let getByTextTest;
    let getAllByTextTest;
    let getByDisplayValueTest;
    let queryByA11yStateTest;
    let getByTestIdTest;

    beforeEach(async () => {
      await waitFor(async () => {
        const {
          getByText,
          getAllByText,
          getByDisplayValue,
          queryByA11yState,
          getByTestId
        } = render(
          <AutenticacaoProvider pessoaAutenticada={modeloPessoaMock}>
            <FormProvider initValues={modeloPessoaMock}>
              <EdicaoInfoPessoal />
            </FormProvider>
          </AutenticacaoProvider>
        );
        getByTextTest = getByText;
        getAllByTextTest = getAllByText;
        getByDisplayValueTest = getByDisplayValue;
        queryByA11yStateTest = queryByA11yState;
        getByTestIdTest = getByTestId;
      });
    });
    test('ENTÃO devo visualizar o texto no topo', () => {
      const textoTopo = 'Edite as informações pessoais que você deseja atualizar:';
      const textoTopoId = getByTestIdTest('texto');
      expect(textoTopoId.props.children).toEqual(textoTopo);
    });

    test('ENTÃO um campo do tipo input/text deve ser exibido com a label Nome Completo', () => {
      const nomeLabel = 'Nome Completo';
      const labelId = getAllByTextTest(nomeLabel);
      expect(labelId[0].props.children).toEqual(nomeLabel);
    });

    test('ENTÃO o campo Nome Completo deve estar preenchido com o nome da pessoa autenticada', () => {
      const nomeController = 'nomeCompleto';
      const campoID = getByTestIdTest(`textinput-${nomeController}`);
      expect(campoID.props.value).toEqual('Rui moreno');
    });

    test('ENTÃO um campo do tipo input/text deve ser exibido com a label E-mail', () => {
      const nomeLabel = 'E-mail';
      const labelId = getAllByTextTest(nomeLabel);
      expect(labelId[0].props.children).toEqual(nomeLabel);
    });

    test('ENTÃO o campo E-mail deve estar preenchido com o nome da pessoa autenticada', () => {
      const nomeController = 'email';
      const campoID = getByTestIdTest(`textinput-${nomeController}`);
      expect(campoID.props.value).toEqual('ruiguemo@gmail.com');
    });

    test('ENTÃO um campo do tipo input/text deve ser exibido com a label Telefone', () => {
      const nomeLabel = 'Telefone';
      const labelId = getAllByTextTest(nomeLabel);
      expect(labelId[0].props.children).toEqual(nomeLabel);
    });

    test('ENTÃO o campo telefone deve estar preenchido com o telefone da pessoa autenticada', () => {
      const nomeController = 'telefone';
      const campoID = getByTestIdTest(`textinput-${nomeController}`);
      expect(campoID.props.value).toEqual('(85) 99999-9999');
    });

    test('ENTÃO um campo do tipo input/text deve ser exibido com a label CPF', () => {
      const nomeLabel = 'CPF';
      const labelId = getAllByTextTest(nomeLabel);
      expect(labelId[0].props.children).toEqual(nomeLabel);
    });

    test('ENTÃO o campo CPF deve estar preenchido com o nome da pessoa autenticada', () => {
      const nomeController = 'cpf';
      const campoID = getByTestIdTest(`textinput-${nomeController}`);
      expect(campoID.props.value).toEqual('571.714.340-01');
    });

    test('ENTÃO um campo do tipo input/text deve ser exibido com a label Município', () => {
      const nomeLabel = 'Município';
      const labelId = getAllByTextTest(nomeLabel);
      expect(labelId[0].props.children).toEqual(nomeLabel);
    });
    test('ENTÃO o campo município deve estar preenchido com o município da pessoa autenticada', () => {
      const campoID = getByDisplayValueTest('1347');
      expect(campoID.props.value).toEqual('1347');
    });

    describe('QUANDO apresento o formulário com os campos preenchidos e validados', () => {
      test('ENTÃO o botão SALVAR deve está habilitado', async () => {
        const campoID = queryByA11yStateTest({ disabled: false });
        await waitFor(() => expect(campoID).not.toBeNull());
      });

      test('ENTÃO o botão deve exibir o texto SALVAR', () => {
        const botaoSalvar = getByTextTest('Salvar');
        expect(botaoSalvar).not.toBeNull();
      });
    });
  });
});
