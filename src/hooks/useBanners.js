import { useCallback, useState } from 'react';
import { pegarBanners } from '~/apis/apiHome';

// export interface BannerInterface {
//   id: number;
//   titulo: string;
//   imagem: string;
//   valor: string;
//   tipo: 'webwiew || 'rota';
//   ordem: number;
//   options: {
//      localImagem: string;
//      labelAnalytics: string;
//      login?: boolean;
//   }
// }

export function useBanners() {
  const [banners, setBanners] = useState([]);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const featchBanners = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await pegarBanners(); // !! => trasnforma o obj em boolean
      setBanners(data);
      setError(false);
    } catch (e) {
      setError(e);
      console.log(`Erro ao listar Banners. ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { banners, error, isLoading, featchBanners };
}
