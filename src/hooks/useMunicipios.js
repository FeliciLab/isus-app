import { useCallback, useState } from 'react';
import { getMunicipiosCeara } from '~/apis/apiCadastro';

export function useMunicipios() {
  const [municipios, setMunicipios] = useState([]);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fetchMunicipios = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await getMunicipiosCeara(); // !! => trasnforma o obj em boolean
      setMunicipios(data);
      setError(false);
    } catch (e) {
      setError(e);
      console.log(`Erro ao listar Municipios. ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { municipios, error, isLoading, fetchMunicipios };
}
