import request from '../src/services/request';
import { postAlertaFaltaDeEpi, postFeedback } from '../src/apis/apiHome';
import { pegarSO, pegarVersao } from '../src/utils/platform';

jest.mock('../src/services/request');
jest.mock('../src/utils/platform');

afterEach(() => {
  request.post.mockReset();
});

describe('apiHome', () => {
  it('faz requisição de alerta de falta de epi com versao do manejo e plataforma iOS', () => {
    const descricao = 'Teste';
    const unidadeDeSaude = 'abc';
    const email = 'teste@teste.com';

    pegarSO.mockImplementation(() => 'ios');
    pegarVersao.mockImplementation(() => '3.10.0');

    postAlertaFaltaDeEpi(descricao, unidadeDeSaude, email);
    expect(request.post).toHaveBeenCalledWith('alertaDeEpi', {
      descricao, unidadeDeSaude, email, versaoAplicativo: '3.10.0', plataforma: 'ios'
    });
  });

  it('faz requisição de alerta de falta de epi com versao do manejo e plataforma Android', () => {
    const descricao = 'Teste';
    const unidadeDeSaude = 'abc';
    const email = 'teste@teste.com';

    pegarSO.mockImplementation(() => 'android');
    pegarVersao.mockImplementation(() => '3.10.0');

    postAlertaFaltaDeEpi(descricao, unidadeDeSaude, email);
    expect(request.post).toHaveBeenCalledWith('alertaDeEpi', {
      descricao, unidadeDeSaude, email, versaoAplicativo: '3.10.0', plataforma: 'android'
    });
  });

  it('faz a requisição de Feedback, com imagem, com a versão do manejo e plataforma android', () => {
    const tipoDeFeedback = 'sugestão';
    const texto = 'texto de teste';
    const email = 'teste@teste.com';
    const imagem = { nomeDaImagem: 'teste.jpg' };

    pegarSO.mockImplementation(() => 'android');
    pegarVersao.mockImplementation(() => '3.10.0');

    postFeedback(tipoDeFeedback, texto, email, imagem);
    expect(request.post).toHaveBeenCalledWith('feedback', {
      tipoDeFeedback, texto, email, imagem, versaoAplicativo: '3.10.0', plataforma: 'android'
    });
  });

  it('faz a requisição de Feedback, com imagem, com a versão do manejo e plataforma iOS', () => {
    const tipoDeFeedback = 'sugestão';
    const texto = 'texto de teste';
    const email = 'teste@teste.com';
    const imagem = { nomeDaImagem: 'teste.jpg' };

    pegarSO.mockImplementation(() => 'ios');
    pegarVersao.mockImplementation(() => '3.10.0');

    postFeedback(tipoDeFeedback, texto, email, imagem);
    expect(request.post).toHaveBeenCalledWith('feedback', {
      tipoDeFeedback, texto, email, imagem, versaoAplicativo: '3.10.0', plataforma: 'ios'
    });
  });

  it('faz a requisição de Feedback, com imagem, com a versão do manejo e plataforma iOS', () => {
    const tipoDeFeedback = 'sugestão';
    const texto = 'texto de teste';
    const email = 'teste@teste.com';
    const imagem = { nomeDaImagem: 'teste.jpg' };

    pegarSO.mockImplementation(() => 'ios');
    pegarVersao.mockImplementation(() => '3.10.0');

    postFeedback(tipoDeFeedback, texto, email, imagem);
    expect(request.post).toHaveBeenCalledWith('feedback', {
      tipoDeFeedback, texto, email, imagem, versaoAplicativo: '3.10.0', plataforma: 'ios'
    });
  });

  it('faz a requisição de Feedback, sem imagem, com a versão do manejo e plataforma android', () => {
    const tipoDeFeedback = 'sugestão';
    const texto = 'texto de teste';
    const email = 'teste@teste.com';
    const imagem = {};

    pegarSO.mockImplementation(() => 'android');
    pegarVersao.mockImplementation(() => '3.10.0');

    postFeedback(tipoDeFeedback, texto, email, imagem);
    expect(request.post).toHaveBeenCalledWith('feedback', {
      tipoDeFeedback, texto, email, versaoAplicativo: '3.10.0', plataforma: 'android'
    });
  });

  it('faz a requisição de Feedback, sem imagem, com a versão do manejo e plataforma ios', () => {
    const tipoDeFeedback = 'sugestão';
    const texto = 'texto de teste';
    const email = 'teste@teste.com';
    const imagem = {};

    pegarSO.mockImplementation(() => 'ios');
    pegarVersao.mockImplementation(() => '3.10.0');

    postFeedback(tipoDeFeedback, texto, email, imagem);
    expect(request.post).toHaveBeenCalledWith('feedback', {
      tipoDeFeedback, texto, email, versaoAplicativo: '3.10.0', plataforma: 'ios'
    });
  });
});
