import { renderHook } from '@testing-library/react-hooks';
import { act } from 'util-teste';
import { useBanners } from '~/hooks/useBanners';
import listaDeBanners from '~/pages/Home/Banners/listaDeBanners';

jest.mock('../../src/hooks/useAutenticacao', () => {
  return jest.fn(() => {
    return { estaLogado: true };
  });
});

jest.mock('../../src/pages/Home/Banners/listaDeBanners');

describe('useBanners', () => {
  it('Deve iniciar com valores padrões', () => {
    const { result } = renderHook(() => useBanners());
    expect(result.current.banners).toEqual([]);
    expect(result.current.error).toEqual(false);
    expect(result.current.isLoading).toEqual(false);
    expect(typeof result.current.featchBanners).toEqual('function');
  });

  it('Deve chamar o listaDeBanners quando executar o featchBanners', () => {
    const { result } = renderHook(() => useBanners());

    act(async () => {
      result.current.featchBanners();
    });

    expect(listaDeBanners).toHaveBeenCalled();
  });
});
