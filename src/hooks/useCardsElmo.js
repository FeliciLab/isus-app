import { useCallback, useState } from 'react';
import { pegarCardsElmo } from '~/apis/apiHome';

export function useCardsElmo() {
  const [cardsElmo, setCardsElmo] = useState([]);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fetchCardsElmo = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data } = await pegarCardsElmo();

      setCardsElmo(data);

      setError(false);
    } catch (err) {
      setError(err);
      console.log(`Erro ao listar Cards Elmo. ${err}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { cardsElmo, error, isLoading, fetchCardsElmo };
}
