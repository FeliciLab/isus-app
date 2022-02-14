import {
  autenticar, pegarListaDeServicos, pegarListaDeCategoriasProfissionais, pegarListaDeEspecialidades
} from '~/apis/apiKeycloak';
import request from '~/services/request';

jest.mock('../src/services/request');

test('deve chamar requester com parametro get ao usar função pegarListaDeServicos', () => {
  pegarListaDeServicos();
  expect(request.get).toHaveBeenCalledWith('/unidades-servico');
});

test('deve trazer lista de serviços', () => {
  const lista = pegarListaDeServicos();
  expect(lista).not.toEqual([]);
});

test('deve autenticar usuario', () => {
  const email = 'usuaria@email.com';
  const senha = '88888888';
  autenticar(email, senha);
  expect(request.post).toHaveBeenCalledWith('auth', { email, senha });
});

test('deve chamar requester com parametro get ao usar função pegarListaDeCategoriasProfissionais', () => {
  pegarListaDeCategoriasProfissionais();
  expect(request.get).toHaveBeenCalledWith('/categorias-profissionais');
});

test('deve trazer lista de categorias profissionais', () => {
  const lista = pegarListaDeCategoriasProfissionais();
  expect(lista).not.toEqual([]);
});

test('deve chamar requester com parametro get ao usar função pegarListaDeEspecialidades', () => {
  pegarListaDeEspecialidades(1);
  expect(request.get).toHaveBeenCalledWith('/categorias-profissionais/1/especialidades');
});

test('deve trazer lista de especialidades vazia ao usar id igual a 0', async () => {
  const lista = await pegarListaDeEspecialidades(0);
  expect(lista).toEqual([]);
});
