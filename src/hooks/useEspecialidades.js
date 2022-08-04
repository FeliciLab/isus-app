import { useCallback, useState } from 'react';
import { pegarListaDeEspecialidades } from '~/apis/apiKeycloak';

export function useEspecialidades() {
  const [especialidades, setEspecialidades] = useState([]);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fetchEspecialidades = useCallback(async categoriaProfissionalId => {
    try {
      setIsLoading(true);
      const data = await pegarListaDeEspecialidades(categoriaProfissionalId);
      setEspecialidades(data);
      setError(false);
    } catch (e) {
      setError(e);
      console.log(`Erro ao listar Especialidades. ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    especialidades,
    error,
    isLoading,
    fetchEspecialidades,
  };
}
