import { useCallback, useState } from 'react';
import { getListOfertas } from '~/services/espFrequencias';

export function useEspOfertas() {
  const [ofertas, setOfertas] = useState([]);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fetchEspOfertas = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await getListOfertas();

      setOfertas(data.ofertas);

      setError(false);
    } catch (e) {
      setError(e);
      console.log(`Erro ao listar Ofertas. ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { ofertas, error, isLoading, fetchEspOfertas };
}
