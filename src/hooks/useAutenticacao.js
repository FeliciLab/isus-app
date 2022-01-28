import { useContext } from 'react';
import { AutenticacaoContext } from '~/context/AutenticacaoContext';

function useAutenticacao() {
  const {
    dadosUsuario,
    alterarDadosUsuario,
    tokenUsuario,
    alterarTokenUsuario,
    estaLogado,
    alterarEstaLogado,
    pessoa,
    alterarPessoa,
  } = useContext(AutenticacaoContext);

  return {
    dadosUsuario,
    alterarDadosUsuario,
    tokenUsuario,
    alterarTokenUsuario,
    estaLogado,
    alterarEstaLogado,
    pessoa,
    alterarPessoa,
  };
}

export default useAutenticacao;
