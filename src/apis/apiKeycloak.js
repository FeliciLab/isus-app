/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
import request from '../services/request';

export function autenticar(email, senha) {
  return request.post('auth', { email, senha });
}

export async function pegarListaDeServicos() {
  const resultado = await request.get('/unidades-servico');
  const lista = resultado.data;

  lista.sort((a, b) => (a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0));

  return lista;
}

export async function pegarListaDeCategoriasProfissionais() {
  const resultado = await request.get('/categorias-profissionais');
  const lista = resultado.data;

  lista.sort((a, b) => (a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0));

  return lista;
}

export async function pegarListaDeEspecialidades(id) {
  if (id !== 0) {
    const resultado = await request.get(`/categorias-profissionais/${id}/especialidades`);
    const lista = resultado.data;

    lista.sort((a, b) => (a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0));

    return lista;
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
  console.log('logout token', token);
  return request.post('logout', { refresh_token: token.refresh_token });
}

export function excluir(token) {
  console.log('excluir token', token);
  return request.delete('delete', { refresh_token: token.refresh_token });
}
