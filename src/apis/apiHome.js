import request from '../services/request';

export function getHomeDAta() {
  return request.get('/algumacoisa/data');
}

export function getCategoriasData() {
  return request.get('/categorias');
}
