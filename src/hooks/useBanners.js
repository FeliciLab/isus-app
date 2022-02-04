import { useState, useCallback } from 'react';
import listaDeBanners from '~/pages/Home/Banners/listaDeBanners';
import useAutenticacao from './useAutenticacao';

export function useBanners() {
  const [banners, setBanners] = useState([]);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { estaLogado } = useAutenticacao();

  const featchBanners = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await listaDeBanners(estaLogado);
      setBanners(data);
    } catch (e) {
      setError(e);
      console.log(`Erro ao listar Banners. ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { banners, error, isLoading, featchBanners };
}
