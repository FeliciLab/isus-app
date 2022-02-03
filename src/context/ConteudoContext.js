import React, { createContext, useCallback, useState } from 'react';
import { pegarCategoriasArquitetura } from '~/apis/apiHome';
import rotas from '~/constantes/rotas';
import { pegarDados, salvarDados } from '~/services/armazenamento';
import { useNavigation } from '@react-navigation/native';

export const ConteudoContext = createContext();

export const ConteudoProvider = ({ categoria, titulo, children }) => {
  const navigation = useNavigation();

  const [categorias, alterarCategorias] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);

  const pegarCategorias = useCallback(async () => {
    try {
      setIsLoading(true);

      const resposta = await pegarCategoriasArquitetura();

      if (categoria === undefined) {
        console.log('Categorias undefined!');
        throw new Error('Infomações não estão disponívies no momento.');
      }

      if (!resposta.data[categoria]) {
        console.log('Resposta categorias sem dados');
        throw new Error('Infomações não estão disponívies no momento.');
      }

      alterarCategorias(
        resposta.data[categoria].map(item => ({
          ...item,
          title_description: titulo,
        })),
      );

      salvarDados(`@categorias_${categoria}`, resposta.data[categoria]);

      setError(false); // Só para garantir
    } catch (err) {
      setError(err);
      if (err.message === 'Network Error') {
        try {
          const resp = await pegarDados(`@categorias_${categoria}`);
          alterarCategorias(resp);
        } catch (err2) {
          setError(err2);
          navigation.navigate(rotas.SEM_CONEXAO, {
            goHome: true,
            componente: categoria,
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ConteudoContext.Provider
      value={{
        categoria,
        titulo,
        categorias,
        alterarCategorias,
        pegarCategorias,
        isLoading,
        error,
      }}>
      {children}
    </ConteudoContext.Provider>
  );
};
