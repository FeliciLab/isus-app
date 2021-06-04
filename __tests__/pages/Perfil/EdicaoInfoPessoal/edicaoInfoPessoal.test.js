/* eslint-disable max-len */
// import React from 'react';
// // eslint-disable-next-line import/no-unresolved
// import {
//   render, waitFor, cleanup, fireEvent
// } from 'util-teste';

// import { FormProvider } from '../../../../src/context/FormContext';
// import EdicaoInfoPessoal from '../../../../src/pages/Perfil/EdicaoInfoPessoal';

// const mockNavigation = jest.fn();
// jest.mock('@react-navigation/native', () => ({
//   ...jest.requireActual('@react-navigation/native'),
//   useNavigation: () => ({
//     navigate: mockNavigation,
//     setOptions: mockNavigation
//   }),
//   useIsFocused: jest.fn()
// }));

// describe('DADO QUE estou na tela de edição de informações pessoais', () => {
//   let getTest;

//   describe('QUANDO a tela é renderizada corretamente', () => {
//     // test('ENTÃO devo visualizar o texto no topo', () => {
//     //   const { getByTestId } = render(
//     //     <FormProvider>
//     //       <EdicaoInfoPessoal />
//     //     </FormProvider>
//     //   );
//     //   const textoTopo = 'Edite as informações pessoais que você deseja atualizar:';
//     //   const textoTopoId = getByTestId('texto');
//     //   expect(textoTopoId.props.children).toEqual(textoTopo);
//     // });

//     // test('ENTÃO um campo do tipo input/text deve ser exibido com a label Nome Completo', () => {
//     //   const { getAllByText } = render(
//     //     <FormProvider>
//     //       <EdicaoInfoPessoal />
//     //     </FormProvider>
//     //   );
//     //   const nomeLabel = 'Nome Completo';
//     //   const labelId = getAllByText(nomeLabel);
//     //   expect(labelId[0].props.children).toEqual(nomeLabel);
//     // });

//     // test('ENTÃO o campo Nome Completo deve estar preenchido com o nome da pessoa autenticada', async () => {
//     //   const value = 'Jeferson';
//     //   const { getByTestId } = render(
//     //     <FormProvider initValues={{ nomeCompleto: 'Jeferson' }}>
//     //       <EdicaoInfoPessoal />
//     //     </FormProvider>
//     //   );
//     //   const nomeController = 'nomeCompleto';
//     //   const campoID = getByTestId(`textinput-${nomeController}`);
//     //   await waitFor(() => expect(campoID.props.value).toEqual(value));
//     // });

//     // test('ENTÃO um campo do tipo input/text deve ser exibido com a label E-mail', () => {
//     //   const { getAllByText } = render(
//     //     <FormProvider>
//     //       <EdicaoInfoPessoal />
//     //     </FormProvider>
//     //   );
//     //   const nomeLabel = 'E-mail';
//     //   const labelId = getAllByText(nomeLabel);
//     //   expect(labelId[0].props.children).toEqual(nomeLabel);
//     // });

//     // test('ENTÃO o campo E-mail deve estar preenchido com o nome da pessoa autenticada', async () => {
//     //   const value = 'jeferson@aluno.esp.edu.br';
//     //   const { getByTestId } = render(
//     //     <FormProvider initValues={{ email: 'jeferson@aluno.esp.edu.br' }}>
//     //       <EdicaoInfoPessoal />
//     //     </FormProvider>
//     //   );
//     //   const nomeController = 'email';
//     //   const campoID = getByTestId(`textinput-${nomeController}`);
//     //   await waitFor(() => expect(campoID.props.value).toEqual(value));
//     // });
//     test('ENTÃO um campo do tipo input/text deve ser exibido com a label Telefone', () => {
//       const { getAllByText } = render(
//           <FormProvider>
//             <EdicaoInfoPessoal />
//           </FormProvider>
//       );
//       const nomeLabel = 'Telefone';
//       const labelId = getAllByText(nomeLabel);
//       expect(labelId[0].props.children).toEqual(nomeLabel);
//     });
//     test('ENTÃO o campo Telefone deve estar preenchido com o nome da pessoa autenticada',
//       async () => {
//         const maskValue = '(85) 99999-9999';
//         const { getByTestId, update, debug } = render(
//           <FormProvider initValues={{ telefone: '85999999999' }}>
//             <EdicaoInfoPessoal />
//           </FormProvider>
//         );
//         const nomeController = 'telefone';
//         const campoID = getByTestId(`textinput-${nomeController}`);
//         // await waitFor(() => fireEvent.changeText(campoID, value));
//         // fireEvent.changeText(campoID, value);
//         // await update(
//         //   <FormProvider>
//         //     <EdicaoInfoPessoal />
//         //   </FormProvider>
//         // );
//         // debug();
//         await waitFor(() => expect(campoID.props.value).toEqual(maskValue));
//         // await waitFor(() => expect(getByText('(85) 98765-4321')).toBeInTheDocument());
//       });
//     // test('ENTÃO um campo do tipo input/text deve ser exibido com a label CPF', () => {
//     //   const { getAllByText } = render(
//     //     <FormProvider>
//     //       <EdicaoInfoPessoal />
//     //     </FormProvider>
//     //   );
//     //   const nomeLabel = 'CPF';
//     //   const labelId = getAllByText(nomeLabel);
//     //   expect(labelId[0].props.children).toEqual(nomeLabel);
//     // });
//     // test('ENTÃO o campo CPF deve estar preenchido com o nome da pessoa autenticada',
//     // async () => {
//     //   let value = '11111111111';
//     //   console.log(value);
//     //   const { getByTestId } = render(
//     //     <FormProvider initValues={{ cpf: value }}>
//     //       <EdicaoInfoPessoal />
//     //     </FormProvider>
//     //   );
//     //   const nomeController = 'cpf';
//     //   // const campoID = getByTestId(`textinput-${nomeController}`);
//     //   // await waitFor(() => expect(campoID.props.value).toEqual(value));
//     // });

//     // test('ENTÃO um campo do tipo input/text deve ser exibido com a label Município', () => {
//     //   const { getAllByText } = render(
//     //     <FormProvider>
//     //       <EdicaoInfoPessoal />
//     //     </FormProvider>
//     //   );
//     //   const nomeLabel = 'Município';
//     //   const labelId = getAllByText(nomeLabel);
//     //   expect(labelId[0].props.children).toEqual(nomeLabel);
//     // });
//     // test('ENTÃO o campo CPF deve estar preenchido com o nome da pessoa autenticada',
//     // async () => {
//     //   let value = 'Município';
//     //   console.log(value);
//     //   const { getByTestId } = render(
//     //     <FormProvider initValues={{ : value }}>
//     //       <EdicaoInfoPessoal />
//     //     </FormProvider>
//     //   );
//     //   const nomeController = '';
//     //   // const campoID = getByTestId(`textinput-${nomeController}`);
//     //   // await waitFor(() => expect(campoID.props.value).toEqual(value));
//     // });
//     // describe('QUANDO apresento o formulário com os campos preenchidos e validados', () => {
//     //   test('ENTÃO o botão de ação está habilitado', async () => {
//     //     const {
//     //       getByTestId,
//     //       getByA11yRole,
//     //       getByAccessibilityStates,
//     //       debug
//     //     } = render(
//     //       <FormProvider>
//     //         <EdicaoInfoPessoal />
//     //       </FormProvider>
//     //     );
//     //     const nomeController = 'nomeCompleto';
//     //     const elementoNome = getByTestId(`textinput-${nomeController}`);
//     //     fireEvent.changeText(elementoNome, 'Jeferson');
//     //     debug();
//     //     await waitFor(() => expect(getByTestId(`textinput-${nomeController}`).props.value).toEqual('Jeferson'));


//     //     const campoEmailId = getByTestId('textinput-email');
//     //     fireEvent.changeText(campoEmailId, 'jeferson@gmail.com');
//     //     fireEvent.changeText(campoEmailId, '');
//     //     // console.log(campoEmailId.props);

//     //     const campoTelefoneId = getByTestId('textinput-telefone');
//     //     fireEvent.changeText(campoTelefoneId, '85987654321');
//     //     console.log(campoTelefoneId.props);


//     //     const campoCpfId = getByTestId('textinput-cpf');
//     //     fireEvent.changeText(campoCpfId, '66029133012');
//     //     console.log(campoCpfId.props);


//     //     const elementoBotao = getByA11yRole('button');
//     //     const elementoBotao = getByAccessibilityStates({ disabled: false });
//     //     const campoID
//     //     // fireEvent.press(elementoBotao);
//     //     debug();
//     //     // const elementoBotao = getByA11yState({ disabled: true });
//     //     expect(elementoBotao.props).not.toBeTruthy();
//     //   });
//     // });
//   //   describe('QUANDO preencho algum campo de forma incorreta', () => {
//     //   test('ENTÃO o botão de ação estará desabilitado', async () => {
//     //     const { getByA11yState, getByTestId, debug } = render(
//     //       <FormProvider initValues={{ nomeCompleto: 'Jeferson' }}>
//     //         <EdicaoInfoPessoal />
//     //       </FormProvider>
//     //     );
//     //     const elementoBotao = getByA11yState({ disabled: true });
//     //     const elementoNomeCompleto = getByTestId('textinput-nomeCompleto');
//     //     fireEvent.changeText(elementoNomeCompleto, '');
//     //     debug();
//     //     await waitFor(() => expect(
//     //       elementoBotao.props.accessibilityState.disabled
//     //     ).not.toBeTruthy());
//     //   });
//     // });
//   });
// });
