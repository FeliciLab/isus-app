import { useContext } from 'react';
import { ConteudoContext } from '~/context/ConteudoContext';

function useConteudo() {
  const { categoria, titulo, categorias, alterarCategorias } = useContext(
    ConteudoContext,
  );

  return {
    categoria,
    titulo,
    categorias,
    alterarCategorias,
  };
}

export default useConteudo;
