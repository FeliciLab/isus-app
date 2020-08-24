import request from '../src/services/request';
import { postAlertaFaltaDeEpi } from '../src/apis/apiHome';
import { pegarSO, pegarVersao } from '../src/utils/platform';

jest.mock('../src/services/request');
jest.mock('../src/utils/platform');

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
});
