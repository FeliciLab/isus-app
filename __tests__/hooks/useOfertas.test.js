import { renderHook } from '@testing-library/react-hooks';
import { act } from 'util-teste';
import { useOfertas } from '~/hooks/useOfertas';
import { getListOgertas } from '~/services/frequencias';

jest.mock('../../src/hooks/useAutenticacao', () => {
  return jest.fn(() => {
    return { estaLogado: true };
  });
});

jest.mock('../../src/services/frequencias');

describe('useOfertas', () => {
  it('Deve iniciar com valores padrões', () => {
    const { result } = renderHook(() => useOfertas());
    expect(result.current.ofertas).toEqual([]);
    expect(result.current.error).toEqual(false);
    expect(result.current.isLoading).toEqual(false);
    expect(typeof result.current.fetchOfertas).toEqual('function');
  });

  it('Deve chamar o getListOgertas quando executar o fetchOfertas', () => {
    const { result } = renderHook(() => useOfertas());

    act(async () => {
      result.current.fetchOfertas();
    });

    expect(getListOgertas).toHaveBeenCalled();
  });
});
