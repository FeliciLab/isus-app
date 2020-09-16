import request from '../services/request';
import { pegarTokenDoUsuarioNoStorage } from '../services/autenticacao';

export function getMunicipiosCeara() {
  return request.get('/estados/6/municipios');
}

export function cadastrarUsuario(dadosUsuario) {
  return request.post('/user', dadosUsuario);
}

export async function perfilUsuario() {
  const token = await pegarTokenDoUsuarioNoStorage();
  const response = await request.get('/perfil', { headers: { Authorization: `bearer ${token.access_token}` } });
  return response.data;
}

export async function alteraDadosDoUsuario(dadosDoUsuario) {
  const token = await pegarTokenDoUsuarioNoStorage();
  const response = await request.put('/user', dadosDoUsuario, { headers: { Authorization: `bearer ${token.access_token}` } });
  return response;
}
