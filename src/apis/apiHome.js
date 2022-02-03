import request from '~/services/request';
import { vazio } from '~/utils/objectUtils';
import { pegarSO, pegarVersao } from '~/utils/platform';

export function pegarCategoriasArquitetura() {
  return request.get('/categoriasArquitetura?v2=true');
}

export function pegarProjetosPorCategoria(id) {
  return request.get(`/projetosPorCategoria/${id}`);
}

export function pegarBusca(item, page) {
  return request.get('/buscaPorProjetos', {
    params: {
      search: item || '',
      page: page || 1,
    },
  });
}

export function pegarProjetosPorId(item) {
  return request.get(`/projeto/${item}`);
}

export async function pegarProjetosPorProfissional() {
  return request.get('projetos-por-profissional');
}

export function postFeedback(tipoDeFeedback, texto, email, imagem) {
  if (vazio(imagem)) {
    return request.post('feedback', {
      versaoAplicativo: pegarVersao(),
      plataforma: pegarSO(),
      tipoDeFeedback,
      email,
      texto,
    });
  }
  return request.post('feedback', {
    versaoAplicativo: pegarVersao(),
    plataforma: pegarSO(),
    tipoDeFeedback,
    email,
    texto,
    imagem,
  });
}

export function postAlertaFaltaDeEpi(descricao, unidadeDeSaude, email) {
  return request.post('alertaDeEpi', {
    descricao,
    unidadeDeSaude,
    email,
    versaoAplicativo: pegarVersao(),
    plataforma: pegarSO(),
  });
}

export function postDemandaEducacao(descricao, unidadeDeSaude, email) {
  return request.post('demanda-educacao', {
    descricao,
    unidadeDeSaude,
    email,
    versaoAplicativo: pegarVersao(),
    plataforma: pegarSO(),
  });
}
export function postDuvidasElmo(duvida, email) {
  return request.post('duvidas-elmo', {
    duvida,
    email,
    versaoAplicativo: pegarVersao(),
    plataforma: pegarSO(),
  });
}

export function pegarBanners() {
  return request.get('banner-config');
}

export function pegarCardsElmo() {
  return request.get('definicoes-conteudos/elmo');
}
