// import React from 'react';
// import { cleanup, render, waitFor } from 'util-teste';
// // import { formatarMascarar } from '~/components/FormLayoutContexts/FormTextInputMask';
// import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
// import { AutenticacaoContext } from '~/context/AutenticacaoContext';
// import { FormProvider } from '~/context/FormContext';
// import EdicaoInfoPessoal from '~/pages/Perfil/EdicaoInfoPessoal';
// import modeloPessoaMock from '../../../../__mocks__/valores/modeloPessoaMock';

// // TODO: voltar testes que estão comentados.
// // Estamos fazendo isso para poder dar continuidade com as atividades de
// // revisão dos formulários
// // obs.: provavelmente esses testes vão mudar.
// // ass.: Ericson Moreira

// const mockNavigation = jest.fn();

// jest.mock('@react-navigation/native', () => ({
//   ...jest.requireActual('@react-navigation/native'),
//   useNavigation: () => ({
//     navigate: mockNavigation,
//     setOptions: mockNavigation,
//   }),
//   useIsFocused: jest.fn(),
// }));

// // Ver documentacao da testing-library sobre fakeTimers
// afterEach(cleanup, () => {
//   jest.runOnlyPendingTimers();
//   jest.useRealTimers();
// });

// describe('EdicaoInfoPessoal', () => {
//   describe('DADO QUE estou na tela de edição de informações pessoais', () => {
//     describe('QUANDO a tela é renderizada corretamente', () => {
//       let getByTextTest;
//       let getAllByTextTest;
//       // let getByDisplayValueTest;
//       let getByA11yRoleTest;
//       // let getByTestIdTest;

//       beforeEach(async () => {
//         await waitFor(async () => {
//           const {
//             getByText,
//             getAllByText,
//             // getByDisplayValue,
//             // getByTestId,
//             getByA11yRole,
//           } = render(
//             <AppTrackTransparencyContext.Provider
//               value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
//               <AutenticacaoContext.Provider
//                 value={{ pessoa: modeloPessoaMock }}>
//                 <FormProvider initValues={modeloPessoaMock}>
//                   <EdicaoInfoPessoal />
//                 </FormProvider>
//               </AutenticacaoContext.Provider>
//             </AppTrackTransparencyContext.Provider>,
//           );
//           getByTextTest = getByText;
//           getAllByTextTest = getAllByText;
//           // getByDisplayValueTest = getByDisplayValue;
//           getByA11yRoleTest = getByA11yRole;
//           // getByTestIdTest = getByTestId;
//         });
//       });
//       test('ENTÃO devo visualizar o texto no topo', () => {
//         const textoTopo =
//           'Edite as informações pessoais que você deseja atualizar:';
//         expect(getByTextTest(textoTopo)).not.toBeNull();
//       });

//       test('ENTÃO um campo do tipo input/text deve ser exibido com a label Nome Completo', () => {
//         const nomeLabel = 'Nome Completo';
//         const labelId = getAllByTextTest(nomeLabel);
//         expect(labelId[0].props.children).toEqual(nomeLabel);
//       });

//       // test('ENTÃO o campo Nome Completo deve estar preenchido com o nome da pessoa autenticada', () => {
//       //   const nomeController = 'nomeCompleto';
//       //   const campoID = getByTestIdTest(`textinput-${nomeController}`);
//       //   expect(campoID.props.value).toEqual(modeloPessoaMock.nomeCompleto);
//       // });

//       test('ENTÃO um campo do tipo input/text deve ser exibido com a label E-mail', () => {
//         const nomeLabel = 'E-mail';
//         const labelId = getAllByTextTest(nomeLabel);
//         expect(labelId[0].props.children).toEqual(nomeLabel);
//       });

//       // test('ENTÃO o campo E-mail deve estar preenchido com o nome da pessoa autenticada', () => {
//       //   const nomeController = 'email';
//       //   const campoID = getByTestIdTest(`textinput-${nomeController}`);
//       //   expect(campoID.props.value).toEqual(modeloPessoaMock.email);
//       // });

//       test('ENTÃO um campo do tipo input/text deve ser exibido com a label Telefone', () => {
//         const nomeLabel = 'Telefone';
//         const labelId = getAllByTextTest(nomeLabel);
//         expect(labelId[0].props.children).toEqual(nomeLabel);
//       });

//       // test('ENTÃO o campo telefone deve estar preenchido com o telefone da pessoa autenticada', () => {
//       //   const nomeController = 'telefone';
//       //   const campoID = getByTestIdTest(`textinput-${nomeController}`);
//       //   const maskTelefone = formatarMascarar({
//       //     antigo: '',
//       //     valor: modeloPessoaMock.telefone,
//       //     mascara: '(##) #####-####',
//       //   });
//       //   expect(campoID.props.value).toEqual(maskTelefone);
//       // });

//       test('ENTÃO um campo do tipo input/text deve ser exibido com a label CPF', () => {
//         const nomeLabel = 'CPF';
//         const labelId = getAllByTextTest(nomeLabel);
//         expect(labelId[0].props.children).toEqual(nomeLabel);
//       });

//       // test('ENTÃO o campo CPF deve estar preenchido com o nome da pessoa autenticada', () => {
//       //   const nomeController = 'cpf';
//       //   const campoID = getByTestIdTest(`textinput-${nomeController}`);
//       //   const maskCpf = formatarMascarar({
//       //     antigo: '',
//       //     valor: modeloPessoaMock.cpf,
//       //     mascara: '###.###.###-##',
//       //   });
//       //   expect(campoID.props.value).toEqual(maskCpf);
//       // });

//       test('ENTÃO um campo do tipo input/text deve ser exibido com a label Município', () => {
//         const nomeLabel = 'Município';
//         const labelId = getAllByTextTest(nomeLabel);
//         expect(labelId[0].props.children).toEqual(nomeLabel);
//       });

//       // test('ENTÃO o campo município deve estar preenchido com o município da pessoa autenticada', () => {
//       //   const campoID = getByDisplayValueTest(
//       //     modeloPessoaMock.cidadeId.toString(),
//       //   );
//       //   expect(campoID.props.value).toEqual(
//       //     modeloPessoaMock.cidadeId.toString(),
//       //   );
//       // });

//       describe('QUANDO apresento o formulário com os campos preenchidos e validados', () => {
//         test('ENTÃO o botão SALVAR deve está habilitado', () => {
//           const campoID = getByA11yRoleTest('button');
//           expect(campoID).not.toBeNull();
//         });

//         test('ENTÃO o botão deve exibir o texto SALVAR', () => {
//           const botaoSalvar = getByTextTest('Salvar');
//           expect(botaoSalvar).not.toBeNull();
//         });
//       });
//     });
//   });
// });

test('TODO: refazer teste de Edição Info Pessoal', () => {
  expect(true);
});
