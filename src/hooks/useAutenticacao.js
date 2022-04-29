import { useContext } from 'react';
import { AutenticacaoContext } from '~/context/AutenticacaoContext';

function useAutenticacao() {
  const {
    user,
    updateUser,
    token,
    setToken,
    signIn,
    signOut,
    showTutorial,
    setShowTutorial,
    autenticacaoLoading,
    setAutenticacaoLoading,
  } = useContext(AutenticacaoContext);

  return {
    user,
    updateUser,
    token,
    setToken,
    signIn,
    signOut,
    showTutorial,
    setShowTutorial,
    autenticacaoLoading,
    setAutenticacaoLoading,
  };
}

export default useAutenticacao;
