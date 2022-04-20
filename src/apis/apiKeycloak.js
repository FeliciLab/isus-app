import request from '~/services/request';

const ordenarPorNome = lista =>
  lista.sort((a, b) => a.nome.localeCompare(b.nome));

export async function autenticar(email, senha) {
  const { data } = await request.post('auth', { email, senha });
  return data;
}

export async function pegarListaDeServicos() {
  const resultado = await request.get('/unidades-servico');
  return ordenarPorNome(resultado.data);
}

export async function pegarListaDeCategoriasProfissionais() {
  const resultado = await request.get('/categorias-profissionais');
  return ordenarPorNome(resultado.data);
}

export async function pegarListaDeEspecialidades(categoriaProfissionalId) {
  if (categoriaProfissionalId !== 0 || categoriaProfissionalId !== '') {
    const resultado = await request.get(
      `/categorias-profissionais/${categoriaProfissionalId}/especialidades`,
    );
    return ordenarPorNome(resultado.data);
  }
  return [];
}

export async function pegarTokenDeAcesso(refreshToken) {
  const resultado = await request.post('/refresh-token', {
    refresh_token: refreshToken,
  });
  return resultado.data;
}

export function logout(token) {
  return request.post('logout', { refresh_token: token.refresh_token });
}

export function excluir(token) {
  return request.delete('delete', { refresh_token: token.refresh_token });
}
