/* eslint-disable import/no-cycle */
import request from '../services/request';

export function autenticar(email, senha) {
  return request.post('auth', { email, senha });
}

export async function pegarListaDeServicos() {
  const resultado = await request.get('/unidades-servico');
  return resultado.data;
}

export async function pegarListaDeCategoriasProfissionais() {
  const resultado = await request.get('/categorias-profissionais');
  return resultado.data;
}

export async function pegarListaDeEspecialidades(id) {
  if (id !== 0) {
    const resultado = await request.get(`/categorias-profissionais/${id}/especialidades`);
    return resultado.data;
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