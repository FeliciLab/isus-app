import { pegarSO, pegarVersao } from '~/utils/platform';

describe('plataform', () => {
  it('pegarSO deve retornar alguma coisa', () => {
    const so = pegarSO();

    expect(so).toBeTruthy();
  });

  it('pegarVersao deve retornar alguma coisa', () => {
    const appVersion = pegarVersao();

    expect(appVersion).toBeTruthy();
  });
});
