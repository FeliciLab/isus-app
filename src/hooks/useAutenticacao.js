import { useContext } from 'react';
import { AutenticacaoContext } from '~/context/AutenticacaoContext';

function useAutenticacao() {
  const {
    user,
    setUser,
    token,
    setToken,
    pessoa,
    alterarPessoa,
    signIn,
    signOut,
    showTutorial,
    setShowTutorial,
    autenticacaoLoading,
    setAutenticacaoLoading,
  } = useContext(AutenticacaoContext);

  return {
    user,
    setUser,
    token,
    setToken,
    pessoa,
    alterarPessoa,
    signIn,
    signOut,
    showTutorial,
    setShowTutorial,
    autenticacaoLoading,
    setAutenticacaoLoading,
  };
}

export default useAutenticacao;
