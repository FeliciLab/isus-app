import request from '../services/request';
import { vazio } from '../utils/objectUtils';
import { pegarSO, pegarVersao } from '../utils/platform';

export function getCategoriasArquitetura() {
  return request.get('/categoriasArquitetura');
}

export function getProjetosPorCategoria(id) {
  return request.get(`/projetosPorCategoria/${id}`);
}

export function getBusca(item, page) {
  return request.get(`/buscaPorProjetos?search=${item}&page=${page}`);
}

export function getProjectPorId(item) {
  return request.get(`/projeto/${item}`);
}

export function postFeedback(tipoDeFeedback, texto, email, imagem) {
  if (vazio(imagem)) {
    return request.post('feedback', {
      tipoDeFeedback,
      email,
      texto
    });
  }
  return request.post('feedback', {
    tipoDeFeedback,
    email,
    texto,
    imagem
  });
}

export function postAlertaFaltaDeEpi(descricao, unidadeDeSaude, email) {
  return request.post('alertaDeEpi', {
    descricao, unidadeDeSaude, email, versaoAplicativo: pegarVersao(), plataforma: pegarSO()
  });
}
