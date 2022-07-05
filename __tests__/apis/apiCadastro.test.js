import {
  atualizarUsuarioApi,
  cadastrarUsuario,
  deletarUsuario,
  perfilUsuario,
  verificarCPFCadastrado,
  verificarEmailCadastrado,
} from '~/apis/apiCadastro';
import request from '~/services/request';
import dadosUsuarioMock from '../../__mocks__/valores/dadosUsuario';

jest.mock('../../src/services/request');

describe('apiCadastro', () => {
  test('Deve enviar os parâmetros corretamente do cadastrar usuário', () => {
    cadastrarUsuario(dadosUsuarioMock);
    expect(request.post).toHaveBeenCalledWith('/user', dadosUsuarioMock);
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

  test('Deve enviar parâmetros corretamente e retornar o perfil do usuário', () => {
    const response = perfilUsuario();

    expect(request.get).toHaveBeenCalledWith('/perfil');

    expect(response).toBeTruthy();
  });

  test('Deve enviar parâmetros corretamente atualizar o usuário', () => {
    const dadosDoUsuarioMock = {};

    atualizarUsuarioApi(dadosDoUsuarioMock);

    expect(request.put).toHaveBeenCalledWith('/user', dadosDoUsuarioMock);
  });

  test('Deve enviar parâmetros corretamente verificar o CPF', () => {
    const cpfMock = '111111111111'; // 111.111.111-11

    verificarCPFCadastrado(cpfMock);

    expect(request.get).toHaveBeenCalledWith(`/user/cpf-cadastrado/${cpfMock}`);
  });
});
