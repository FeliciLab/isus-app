import {
  cadastrarUsuario, alteraDadosDoUsuario, deletarUsuario, verificarEmailCadastrado, perfilUsuario
} from '../src/apis/apiCadastro';
import request from '../src/services/request';
import dadosUsuarioMock from '../__mocks__/valores/dadosUsuario';

jest.mock('../src/services/request');

test('Deve enviar os parâmetros corretamente do cadastrar usuário', () => {
  cadastrarUsuario(dadosUsuarioMock);
  expect(request.post).toHaveBeenCalledWith('/user', dadosUsuarioMock);
});

test('Deve enviar parâmetros corretamente do alterar dados do  usuário', () => {
  alteraDadosDoUsuario(dadosUsuarioMock);
  expect(request.put).toHaveBeenCalledWith('/user', dadosUsuarioMock);
});

test('Deve enviar parâmetros corretamente do deletar dados do  usuário', () => {
  deletarUsuario(dadosUsuarioMock);
  expect(request.delete).toHaveBeenCalledWith('/user');
});

test('Deve enviar parâmetros corretamente do verificar email do usuário', () => {
  const email = 'teste@teste.com';
  verificarEmailCadastrado(email);
  expect(request.get).toHaveBeenCalledWith(`/user/email-cadastrado/${email}`);
});

test('Deve enviar parâmetros corretamente do verificar email do usuário', () => {
  perfilUsuario();
  expect(request.get).toHaveBeenCalledWith('/perfil');
});
