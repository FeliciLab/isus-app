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

export function getProjectPorId(item) {
  return request.get(`/projeto/${item}`);
}

export function postFeedback(categoria, texto, email, imagem) {
  const nomeCategoria = () => {
    if (categoria) {
      const nome = 'Sugestoes';
      return nome;
    }
    const nome = 'Problemas';
    return nome;
  };

  if (!imagem) {
    return request.post('feedback', {
      categoria: nomeCategoria(),
      email,
      texto
    });
  }
  return request.post('feedback', {
    categoria: nomeCategoria(),
    email,
    texto,
    imagem
  });
}
