import { useCallback, useState } from 'react';
import { pegarCategoriasArquitetura } from '~/apis/apiHome';
import useAutenticacao from './useAutenticacao';

export function useCategoriasArquitetura() {
  const [categorias, setCategorias] = useState([]);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { estaLogado } = useAutenticacao();

  const featchCategoriasArquitetura = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await pegarCategoriasArquitetura(estaLogado);
      setCategorias(data);
    } catch (e) {
      setError(e);
      console.log(`Erro ao listar categorias. ${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { categorias, error, isLoading, featchCategoriasArquitetura };
}
