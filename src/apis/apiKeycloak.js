import request from '~/services/request';

const ordenarPorNome = lista =>
  lista.sort((a, b) => a.nome.localeCompare(b.nome));

export async function autenticar(username, senha) {
  const { data } = await request.post('auth', { username, senha });
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
  if (
    !categoriaProfissionalId ||
    categoriaProfissionalId === 0 ||
    categoriaProfissionalId === ''
  ) {
    return [];
  }

  const resultado = await request.get(
    `/categorias-profissionais/${categoriaProfissionalId}/especialidades`,
  );
  return ordenarPorNome(resultado.data);
}

export async function pegarTokenDeAcesso(refreshToken) {
  const resultado = await request.post('/refresh-token', {
    refresh_token: refreshToken,
  });
  return resultado.data;
}

export function logout(token) {
  return request.post('logout', { refresh_token: token?.refreshToken });
}

export function excluir(token) {
  return request.delete('delete', { refresh_token: token?.refreshToken });
}
