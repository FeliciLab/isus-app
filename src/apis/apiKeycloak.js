/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
import request from '../services/request';

const ordenarPorNome = lista => lista.sort((a, b) => a.nome.localeCompare(b.nome));

export async function autenticar(email, senha) {
  const result = await request.post('auth', { email, senha });
  return result?.data;
}

export async function pegarListaDeServicos() {
  const resultado = await request.get('/unidades-servico');
  return ordenarPorNome(resultado.data);
}

export async function pegarListaDeCategoriasProfissionais() {
  const resultado = await request.get('/categorias-profissionais');
  return ordenarPorNome(resultado.data);
}

export async function pegarListaDeEspecialidades(id) {
  if (id !== 0) {
    const resultado = await request.get(`/categorias-profissionais/${id}/especialidades`);
    return ordenarPorNome(resultado.data);
  }
  return [];
}

export async function pegarTokenDeAcesso(refreshToken) {
  const resultado = await request.post('/refresh-token', {
    refresh_token: refreshToken
  });
  return resultado.data;
}


export function logout(token) {
  return request.post('logout', { refresh_token: token.refresh_token });
}

export function excluir(token) {
  return request.delete('delete', { refresh_token: token.refresh_token });
}
