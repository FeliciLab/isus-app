import { renderHook } from '@testing-library/react-hooks';
import { useBanners } from '~/hooks/useBanners';

jest.mock('../../src/hooks/useAutenticacao', () => {
  return jest.fn(() => {
    return { estaLogado: true };
  });
});

const listaDeBanners = jest.fn();

describe('useBanners', () => {
  it('Deve iniciar com valores padrões', () => {
    const { result } = renderHook(() => useBanners());
    expect(result.current.banners).toEqual([]);
    expect(result.current.error).toEqual(false);
    expect(result.current.isLoading).toEqual(false);
    expect(typeof result.current.featchBanners).toEqual('function');
  });

  it('Ao chamar featchBanners deve executar o listaDeBanners', async () => {
    const { result, waitFor } = renderHook(() => useBanners());

    waitFor(() => {
      result.current.featchBanners();
    });

    expect(listaDeBanners).toHaveBeenCalled();
  });
});
