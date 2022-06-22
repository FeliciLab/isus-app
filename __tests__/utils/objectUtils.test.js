import { vazio } from '~/utils/objectUtils';

describe('objectUtils', () => {
  it('Retorna true se o objeto não tiver atributos', () => {
    const response = vazio({});

    expect(response).toBeTruthy();
  });

  it('Retorna false se o objeto tiver atributos', () => {
    const response = vazio({ id: 1 });

    expect(response).not.toBeTruthy();
  });
});
