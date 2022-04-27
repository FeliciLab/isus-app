import { useContext } from 'react';
import { AutenticacaoContext } from '~/context/AutenticacaoContext';

function useAutenticacao() {
  const {
    user,
    updateUser,
    deleteUser,
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
    deleteUser,
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
