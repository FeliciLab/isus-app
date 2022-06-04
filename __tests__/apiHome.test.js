import {
  pegarBanners,
  pegarBusca,
  pegarCardsElmo,
  pegarCategoriasArquitetura,
  pegarProjetosPorCategoria,
  pegarProjetosPorId,
  pegarProjetosPorProfissional,
  postAlertaFaltaDeEpi,
  postDemandaEducacao,
  postDuvidasElmo,
  postFeedback,
} from '~/apis/apiHome';
import request from '~/services/request';
import { pegarSO, pegarVersao } from '~/utils/platform';

jest.mock('../src/services/request');
jest.mock('../src/utils/platform');

afterEach(() => {
  request.post.mockReset();
});

describe('apiHome', () => {
  it('deve fazer requisição de alerta de falta de epi com versao do manejo e plataforma iOS', () => {
    const descricao = 'Teste';
    const unidadeDeSaude = 'abc';
    const email = 'teste@teste.com';

    pegarSO.mockImplementation(() => 'ios');
    pegarVersao.mockImplementation(() => '3.10.0');

    postAlertaFaltaDeEpi(descricao, unidadeDeSaude, email);
    expect(request.post).toHaveBeenCalledWith('alertaDeEpi', {
      descricao,
      unidadeDeSaude,
      email,
      versaoAplicativo: '3.10.0',
      plataforma: 'ios',
    });
  });

  it('deve fazer requisição de alerta de falta de epi com versao do manejo e plataforma Android', () => {
    const descricao = 'Teste';
    const unidadeDeSaude = 'abc';
    const email = 'teste@teste.com';

    pegarSO.mockImplementation(() => 'android');
    pegarVersao.mockImplementation(() => '3.10.0');

    postAlertaFaltaDeEpi(descricao, unidadeDeSaude, email);
    expect(request.post).toHaveBeenCalledWith('alertaDeEpi', {
      descricao,
      unidadeDeSaude,
      email,
      versaoAplicativo: '3.10.0',
      plataforma: 'android',
    });
  });

  it('deve fazer requisição de demanda por educação permanente com versao do manejo e plataforma iOS', () => {
    const descricao = 'Teste';
    const unidadeDeSaude = 'abc';
    const email = 'teste@teste.com';

    pegarSO.mockImplementation(() => 'ios');
    pegarVersao.mockImplementation(() => '3.10.0');

    postDemandaEducacao(descricao, unidadeDeSaude, email);
    expect(request.post).toHaveBeenCalledWith('demanda-educacao', {
      descricao,
      unidadeDeSaude,
      email,
      versaoAplicativo: '3.10.0',
      plataforma: 'ios',
    });
  });

  it('deve fazer requisição de ademanda por educação permanente com versao do manejo e plataforma Android', () => {
    const descricao = 'Teste';
    const unidadeDeSaude = 'abc';
    const email = 'teste@teste.com';

    pegarSO.mockImplementation(() => 'android');
    pegarVersao.mockImplementation(() => '3.10.0');

    postDemandaEducacao(descricao, unidadeDeSaude, email);
    expect(request.post).toHaveBeenCalledWith('demanda-educacao', {
      descricao,
      unidadeDeSaude,
      email,
      versaoAplicativo: '3.10.0',
      plataforma: 'android',
    });
  });

  it('deve fazer a requisição de Feedback, com imagem, com a versão do manejo e plataforma android', () => {
    const tipoDeFeedback = 'sugestão';
    const texto = 'texto de teste';
    const email = 'teste@teste.com';
    const imagem = { nomeDaImagem: 'teste.jpg' };

    pegarSO.mockImplementation(() => 'android');
    pegarVersao.mockImplementation(() => '3.10.0');

    postFeedback(tipoDeFeedback, texto, email, imagem);
    expect(request.post).toHaveBeenCalledWith('feedback', {
      tipoDeFeedback,
      texto,
      email,
      imagem,
      versaoAplicativo: '3.10.0',
      plataforma: 'android',
    });
  });

  it('deve fazer requisição de Feedback, com imagem, com a versão do manejo e plataforma iOS', () => {
    const tipoDeFeedback = 'sugestão';
    const texto = 'texto de teste';
    const email = 'teste@teste.com';
    const imagem = { nomeDaImagem: 'teste.jpg' };

    pegarSO.mockImplementation(() => 'ios');
    pegarVersao.mockImplementation(() => '3.10.0');

    postFeedback(tipoDeFeedback, texto, email, imagem);
    expect(request.post).toHaveBeenCalledWith('feedback', {
      tipoDeFeedback,
      texto,
      email,
      imagem,
      versaoAplicativo: '3.10.0',
      plataforma: 'ios',
    });
  });

  it('deve fazer requisição de Feedback, com imagem, com a versão do manejo e plataforma iOS', () => {
    const tipoDeFeedback = 'sugestão';
    const texto = 'texto de teste';
    const email = 'teste@teste.com';
    const imagem = { nomeDaImagem: 'teste.jpg' };

    pegarSO.mockImplementation(() => 'ios');
    pegarVersao.mockImplementation(() => '3.10.0');

    postFeedback(tipoDeFeedback, texto, email, imagem);
    expect(request.post).toHaveBeenCalledWith('feedback', {
      tipoDeFeedback,
      texto,
      email,
      imagem,
      versaoAplicativo: '3.10.0',
      plataforma: 'ios',
    });
  });

  it('deve fazer requisição de Feedback, sem imagem, com a versão do manejo e plataforma android', () => {
    const tipoDeFeedback = 'sugestão';
    const texto = 'texto de teste';
    const email = 'teste@teste.com';
    const imagem = {};

    pegarSO.mockImplementation(() => 'android');
    pegarVersao.mockImplementation(() => '3.10.0');

    postFeedback(tipoDeFeedback, texto, email, imagem);
    expect(request.post).toHaveBeenCalledWith('feedback', {
      tipoDeFeedback,
      texto,
      email,
      versaoAplicativo: '3.10.0',
      plataforma: 'android',
    });
  });

  it('deve fazer requisição de Feedback, sem imagem, com a versão do manejo e plataforma ios', () => {
    const tipoDeFeedback = 'sugestão';
    const texto = 'texto de teste';
    const email = 'teste@teste.com';
    const imagem = {};

    pegarSO.mockImplementation(() => 'ios');
    pegarVersao.mockImplementation(() => '3.10.0');

    postFeedback(tipoDeFeedback, texto, email, imagem);
    expect(request.post).toHaveBeenCalledWith('feedback', {
      tipoDeFeedback,
      texto,
      email,
      versaoAplicativo: '3.10.0',
      plataforma: 'ios',
    });
  });

  it('deve fazer fazer resquest com /categoriasArquitetura?v2=true', () => {
    pegarCategoriasArquitetura();

    expect(request.get).toHaveBeenCalledWith('/categoriasArquitetura?v2=true');
  });

  it('deve fazer fazer resquest com /projetosPorCategoria com o id passado como parametro', () => {
    const idMock = 1;

    pegarProjetosPorCategoria(idMock);

    expect(request.get).toHaveBeenCalledWith(`/projetosPorCategoria/${idMock}`);
  });

  it('deve fazer fazer resquest com /buscaPorProjetos com parâmetros', () => {
    const itemMock = 1;

    const pageMock = 1;

    pegarBusca(itemMock, pageMock);

    expect(request.get).toHaveBeenCalledWith('/buscaPorProjetos', {
      params: {
        search: itemMock,
        page: pageMock,
      },
    });
  });

  it('deve fazer fazer resquest com /buscaPorProjetos com parâmetros default', () => {
    pegarBusca();

    expect(request.get).toHaveBeenCalledWith('/buscaPorProjetos', {
      params: {
        search: '',
        page: 1,
      },
    });
  });

  it('deve fazer fazer resquest /projeto/{item}', () => {
    const itemMock = 1;

    pegarProjetosPorId(itemMock);

    expect(request.get).toHaveBeenCalledWith(`/projeto/${itemMock}`);
  });

  it('deve fazer fazer resquest /projetos-por-profissional', () => {
    pegarProjetosPorProfissional();

    expect(request.get).toHaveBeenCalledWith('/projetos-por-profissional');
  });

  it('postDuvidasElmo com parametros', () => {
    const duvidaMock = 'duvidaMock';
    const emailMock = 'emailMock';

    pegarSO.mockImplementation(() => 'ios');
    pegarVersao.mockImplementation(() => '3.10.0');

    postDuvidasElmo(duvidaMock, emailMock);

    expect(request.post).toHaveBeenCalledWith('duvidas-elmo', {
      duvida: duvidaMock,
      email: emailMock,
      versaoAplicativo: pegarVersao(),
      plataforma: pegarSO(),
    });
  });

  it('pegarBanners', () => {
    pegarBanners();

    expect(request.get).toHaveBeenCalledWith('banner-config');
  });

  it('pegarCardsElmo', () => {
    pegarCardsElmo();

    expect(request.get).toHaveBeenCalledWith('definicoes-conteudos/elmo');
  });
});
