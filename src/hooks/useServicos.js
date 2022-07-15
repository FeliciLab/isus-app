import { useCallback, useState } from 'react';
import { pegarListaDeServicos } from '~/apis/apiKeycloak';

export function useServicos() {
  const [servicos, setServicos] = useState([]);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fetchServicos = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await pegarListaDeServicos();
      setServicos(data);
      setError(false);
    } catch (e) {
      setError(e);
      console.log(`Erro ao listar Serviços. ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { servicos, error, isLoading, fetchServicos };
}
