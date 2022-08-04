import { useCallback, useState } from 'react';
import { pegarListaDeCategoriasProfissionais } from '~/apis/apiKeycloak';

export function useCategoriasProfissionais() {
  const [categoriasProfissionais, setCategoriasProfissionais] = useState([]);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fetchCategoriasProfissionais = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await pegarListaDeCategoriasProfissionais();
      setCategoriasProfissionais(data);
      setError(false);
    } catch (e) {
      setError(e);
      console.log(`Erro ao listar Categorias Profissionais. ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    categoriasProfissionais,
    error,
    isLoading,
    fetchCategoriasProfissionais,
  };
}
