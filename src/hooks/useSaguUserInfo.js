import { useCallback, useState } from 'react';
import { getSaguUserInfo } from '~/services/frequencias';

export function useSaguUserInfo(userId) {
  const [saguUserInfo, setSaguUserInfos] = useState({});

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fetchSaguUserInfo = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await getSaguUserInfo(userId);

      setSaguUserInfos(data.user_info);

      setError(false);
    } catch (e) {
      setError(e);
      console.log(`Erro ao listar Sagu User Info. ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { saguUserInfo, error, isLoading, fetchSaguUserInfo };
}
