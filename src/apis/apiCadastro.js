import request from '../services/request';

export function getMunicipiosCeara() {
  return request.get('/estados/6/municipios');
}

export function cadastrarUsuario(dadosUsuario) {
  return request.post('/user', dadosUsuario);
}
