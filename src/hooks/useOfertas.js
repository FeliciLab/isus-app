import { useCallback, useState } from 'react';
import { getListOgertas } from '~/services/frequencias';

export function useOfertas() {
  const [ofertas, setOfertas] = useState([]);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const featchOfertas = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await getListOgertas();

      setOfertas(data.ofertas);

      setError(false);
    } catch (e) {
      setError(e);
      console.log(`Erro ao listar Banners. ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { ofertas, error, isLoading, featchOfertas };
}
