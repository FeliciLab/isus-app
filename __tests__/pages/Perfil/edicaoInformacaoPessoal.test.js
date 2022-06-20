// import React from 'react';
// import { fireEvent, render } from 'util-teste';
// import feature from '~/constantes/features';
// import { DadosUsuario } from '~/pages/Perfil/DadosUsuario';
// import estaAtiva from '~/utils/estaAtiva';
// import dadosUsuario from '../../../__mocks__/valores/dadosUsuario';

// const mockedNavigate = jest.fn();

// jest.mock('@react-navigation/native', () => ({
//   ...jest.requireActual('@react-navigation/native'),
//   useNavigation: () => ({
//     navigate: mockedNavigate,
//   }),
// }));

// if (estaAtiva(feature.EDICAO_INFO_PESSOAIS)) {
//   test('verifica se o botao de edicao esta na tela', () => {
//     const { getByTestId } = render(<DadosUsuario dados={dadosUsuario} />);
//     const botao = getByTestId('botao-editar-dado-pessoal');

//     expect(botao).not.toBeNull();
//   });

//   test('deve chamar navigate ao clicar no botao de editar', () => {
//     const { getByTestId } = render(<DadosUsuario dados={dadosUsuario} />);
//     const botao = getByTestId('botao-editar-dado-pessoal');
//     fireEvent.press(botao);

//     expect(mockedNavigate).toHaveBeenCalled();
//   });
// } else {

// TODO: Inativei pois o teste de edição é o mesmo de "dadosUsuario.test.js"
test('teste de exemplo', () => {
  expect(true);
});
