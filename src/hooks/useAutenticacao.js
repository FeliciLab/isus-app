import { useContext } from 'react';
import { AutenticacaoContext } from '~/context/AutenticacaoContext';

function useAutenticacao() {
  const { user, setUser, token, setToken, pessoa, alterarPessoa } = useContext(
    AutenticacaoContext,
  );

  return {
    user,
    setUser,
    token,
    setToken,
    pessoa,
    alterarPessoa,
  };
}

export default useAutenticacao;
