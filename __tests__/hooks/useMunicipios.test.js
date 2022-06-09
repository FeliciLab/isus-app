import { renderHook } from '@testing-library/react-hooks';
import { act } from 'util-teste';
import { getMunicipiosCeara } from '~/apis/apiCadastro';
import { useMunicipios } from '~/hooks/useMunicipios';

const municipiosMock = [
  {
    id: 1122,
    estado_id: 6,
    nome: 'Abaiara',
  },
  {
    id: 1124,
    estado_id: 6,
    nome: 'Acarape',
  },
  {
    id: 1125,
    estado_id: 6,
    nome: 'Acaraú',
  },
];

jest.mock('../../src/apis/apiCadastro');

getMunicipiosCeara.mockReturnValue({ data: municipiosMock });

describe('useMunicipios', () => {
  it('Deve iniciar com valores padrões', () => {
    const { result } = renderHook(() => useMunicipios());
    expect(result.current.municipios).toEqual([]);
    expect(result.current.error).toEqual(false);
    expect(result.current.isLoading).toEqual(false);
    expect(typeof result.current.fetchMunicipios).toEqual('function');
  });

  it('Deve chamar o getMunicipiosCeara quando executar o fetchMunicipios', async () => {
    const { result } = renderHook(() => useMunicipios());

    await act(async () => {
      result.current.fetchMunicipios();
    });

    expect(getMunicipiosCeara).toHaveBeenCalled();

    expect(result.current.municipios).toEqual(municipiosMock);
  });

  it('Deve chamar o salvar os municípios quando executar fetchMunicipios', async () => {
    const { result } = renderHook(() => useMunicipios());

    await act(async () => {
      result.current.fetchMunicipios();
    });

    expect(result.current.municipios).toEqual(municipiosMock);
  });
});
