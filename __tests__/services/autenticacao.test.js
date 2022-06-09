import { autenticar } from '~/apis/apiKeycloak';
import {
  pegarDados,
  removerDados,
  salvarDados,
} from '~/services/armazenamento';
import {
  atualizarTokenDeAcessoDoUsuario,
  autenticarComIdSaude,
  excluirTokenDoUsuarioNoStorage,
  pegarTokenDoUsuarioNoStorage,
  salvarTokenDoUsuarioNoStorage,
} from '~/services/autenticacao';

jest.mock('../../src/apis/apiKeycloak');
jest.mock('../../src/services/armazenamento');

const emailMock = 'emailMock';

const senhaMock = 'senhaMock';

const tokenMock = { refreshToken: 'refreshToken' };

describe('autenticacao', () => {
  it('autenticarComIdSaude', async () => {
    autenticarComIdSaude(emailMock, senhaMock);

    expect(autenticar).toHaveBeenCalledWith(emailMock, senhaMock);
  });

  it('pegarTokenDoUsuarioNoStorage', async () => {
    pegarTokenDoUsuarioNoStorage();

    expect(pegarDados).toHaveBeenCalledWith('@isus:token');
  });

  it('salvarTokenDoUsuarioNoStorage', async () => {
    salvarTokenDoUsuarioNoStorage(tokenMock);

    expect(salvarDados).toHaveBeenCalledWith('@isus:token', tokenMock);
  });

  it('excluirTokenDoUsuarioNoStorage', async () => {
    excluirTokenDoUsuarioNoStorage();

    expect(removerDados).toHaveBeenCalledWith('@isus:token');
  });

  it('atualizarTokenDeAcessoDoUsuario', async () => {
    atualizarTokenDeAcessoDoUsuario();

    expect(pegarDados).toHaveBeenCalledWith('@isus:token');
  });
});
