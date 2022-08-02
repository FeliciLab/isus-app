import { useCallback, useState } from 'react';
import { pegarBanners } from '~/apis/apiHome';
import { sortBy } from 'lodash';

export function useBanners() {
  const [banners, setBanners] = useState([]);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fetchBanners = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data } = await pegarBanners();

      setBanners(sortBy(data, ['ordem'])); // ordena pela ordem que vem da API

      setError(false);
    } catch (e) {
      setError(e);
      console.log(`Erro ao listar Banners. ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { banners, error, isLoading, fetchBanners };
}
