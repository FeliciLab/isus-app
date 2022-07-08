import { renderHook } from '@testing-library/react-hooks';
import { act } from 'util-teste';
import { pegarBanners } from '~/apis/apiHome';
import { useBanners } from '~/hooks/useBanners';

jest.mock('../../src/hooks/useAutenticacao', () => {
  return jest.fn(() => {
    return { estaLogado: true };
  });
});

jest.mock('../../src/apis/apiHome');

describe('useBanners', () => {
  it('Deve iniciar com valores padrões', () => {
    const { result } = renderHook(() => useBanners());
    expect(result.current.banners).toEqual([]);
    expect(result.current.error).toEqual(false);
    expect(result.current.isLoading).toEqual(false);
    expect(typeof result.current.featchBanners).toEqual('function');
  });

  it('Deve chamar o pegarBanners quando executar o featchBanners', () => {
    const { result } = renderHook(() => useBanners());

    act(async () => {
      result.current.featchBanners();
    });

    expect(pegarBanners).toHaveBeenCalled();
  });
});
