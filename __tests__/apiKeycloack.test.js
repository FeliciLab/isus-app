import {
  autenticar,
  pegarListaDeCategoriasProfissionais,
  pegarListaDeEspecialidades,
  pegarListaDeServicos,
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
    const email = 'usuaria@email.com';
    const senha = '88888888';
    autenticar(email, senha);
    expect(request.post).toHaveBeenCalledWith('auth', { email, senha });
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
});
