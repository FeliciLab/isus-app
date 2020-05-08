import request from '../services/request';

export function getCategoriasArquitetura() {
  return request.get('/categoriasArquitetura');
}

export function getProjetosPorCategoria(id) {
  return request.get(`/projetosPorCategoria/${id}`);
}

export function getBusca(item) {
  return request.get(`/buscaPorProjetos?search=${item}`);
}
