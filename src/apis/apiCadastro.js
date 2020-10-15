import request from '../services/request';

export function getMunicipiosCeara() {
  return request.get('/estados/6/municipios');
}

export function cadastrarUsuario(dadosUsuario) {
  return request.post('/user', dadosUsuario);
}

export async function perfilUsuario() {
  const response = await request.get('/perfil');
  return response.data;
}

export async function alteraDadosDoUsuario(dadosDoUsuario) {
  const response = await request.put('/user', dadosDoUsuario);
  return response;
}

export async function verificarEmailCadastrado(email) {
  const response = await request.get(`/user/email-cadastrado/${email}`);
  return response;
}

export async function verificarCPFCadastrado(cpf) {
  const response = await request.get(`/user/cpf-cadastrado/${cpf}`);
  return response;
}
