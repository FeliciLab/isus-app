import { useContext } from 'react';
import { ConteudoContext } from '~/context/ConteudoContext';

function useConteudo() {
  const {
    categoria,
    titulo,
    categorias,
    alterarCategorias,
    pegarCategorias,
    isLoading,
    error,
  } = useContext(ConteudoContext);

  return {
    categoria,
    titulo,
    categorias,
    alterarCategorias,
    pegarCategorias,
    isLoading,
    error,
  };
}

export default useConteudo;
