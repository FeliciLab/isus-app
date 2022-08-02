import { useCallback, useState } from 'react';
import { getUserPresencas } from '~/services/frequencias';

export function useUserPresencas(userId, ofertaId) {
  const [presencas, setPresencas] = useState([]);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fetchUserPresencas = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await getUserPresencas(userId, ofertaId);

      setPresencas(data.presencas);

      setError(false);
    } catch (e) {
      setError(e);
      console.log(`Erro ao listar Banners. ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { presencas, error, isLoading, fetchUserPresencas };
}
