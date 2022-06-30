import { useCallback, useState } from 'react';
import { getEspUserInfo } from '~/services/espFrequencias';

export function useEspUserInfo(userId) {
  const [espUserInfo, setEspUserInfo] = useState({});

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fetchEspUserInfo = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await getEspUserInfo(userId);

      setEspUserInfo(data.user_info);

      setError(false);
    } catch (e) {
      setError(e);
      console.log(`Erro ao listar Esp User Info. ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { espUserInfo, error, isLoading, fetchEspUserInfo };
}
