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
  };
}

export default useAutenticacao;
