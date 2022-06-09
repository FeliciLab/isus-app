import {
  autenticar,
  excluir,
  logout,
  pegarListaDeCategoriasProfissionais,
  pegarListaDeEspecialidades,
  pegarListaDeServicos,
  pegarTokenDeAcesso,
} from '~/apis/apiKeycloak';
import request from '~/services/request';

jest.mock('../src/services/request');

describe('apiKeycloack', () => {
  it('deve chamar requester com parametro get ao usar função pegarListaDeServicos', () => {
    pegarListaDeServicos();
    expect(request.get).toHaveBeenCalledWith('/unidades-servico');
  });

  it('deve trazer lista de serviços', () => {
    const lista = pegarListaDeServicos();
    expect(lista).not.toEqual([]);
  });

  it('deve autenticar usuario', () => {
    const username = 'usuaria@email.com';
    const senha = '88888888';
    const response = autenticar(username, senha);

    expect(request.post).toHaveBeenCalledWith('auth', { username, senha });
    expect(response).toBeTruthy();
  });

  it('deve chamar requester com parametro get ao usar função pegarListaDeCategoriasProfissionais', () => {

    expect(request.post).toHaveBeenCalledWith('auth', { email, senha });
    expect(response).toBeTruthy();
  });

  it('deve chamar requester com parametro get ao usar função pegarListaDeCategoriasProfissionais', () => {
    pegarListaDeCategoriasProfissionais();
    expect(request.get).toHaveBeenCalledWith('/categorias-profissionais');
  });

  it('deve trazer lista de categorias profissionais', () => {
    const lista = pegarListaDeCategoriasProfissionais();
    expect(lista).not.toEqual([]);
  });

  it('deve chamar requester com parametro get ao usar função pegarListaDeEspecialidades', () => {
    pegarListaDeEspecialidades(1);
    expect(request.get).toHaveBeenCalledWith(
      '/categorias-profissionais/1/especialidades',
    );
  });

  it('deve trazer lista de especialidades vazia ao usar id igual a 0', async () => {
    const lista = await pegarListaDeEspecialidades(0);
    expect(lista).toEqual([]);
  });

  it('deve trazer lista de especialidades vazia ao usar id igual a string vazia', async () => {
    const lista = await pegarListaDeEspecialidades('');
    expect(lista).toEqual([]);
  });

  it('deve trazer token de acesso', () => {
    const tokenMock = 'asdasdasdas';

    const response = pegarTokenDeAcesso(tokenMock);

    expect(request.post).toHaveBeenCalledWith('/refresh-token', {
      refresh_token: tokenMock,
    });

    expect(response).toBeTruthy();
  });

  it('deve trazer logout', () => {
    const tokenMock = 'asdasdasdas';

    logout({ refreshToken: tokenMock });

    expect(request.post).toHaveBeenCalledWith('logout', {
      refresh_token: tokenMock,
    });
  });

  it('deve deletar a token na api', () => {
    const tokenMock = 'asdasdasdas';

    excluir({ refreshToken: tokenMock });

    expect(request.delete).toHaveBeenCalledWith('delete', {
      refresh_token: tokenMock,
    });
  });
});
