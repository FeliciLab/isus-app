import React, { createContext, useCallback } from 'react';
import { perfilUsuario } from '~/apis/apiCadastro';
import { logout } from '~/apis/apiKeycloak';
import useAsyncStorage from '~/hooks/useAsyncStorage';
import Pessoa from '~/models/pessoa';
import { autenticarComIdSaude } from '~/services/autenticacao';

const AutenticacaoContext = createContext();

/*
interface Token = {
  "access_token": string;
  "expires_in": number;
  "not-before-policy": number;
  "refresh_expires_in": number;
  "refresh_token": string;
  "scope": string;
  "session_state": string;
  "token_type": string;
}
*/

const AutenticacaoProvider = ({ children }) => {
  const [user, setUser] = useAsyncStorage('@isus:user', null);

  const [pessoa, setPessoa] = useAsyncStorage('@isus:pessoa', null);

  const [token, setToken] = useAsyncStorage('@isus:token', null);

  const [showTutorial, setShowTutorial] = useAsyncStorage(
    '@isus:show-tutorial',
    true,
  );

  // Retorno se o perfil já estava cadastrado
  // Necessário para caso de uso de usuário que tem idSaude
  // mas que nao fez o cadastro no iSUS
  const signIn = useCallback(async (email, senha) => {
    const response = await autenticarComIdSaude(email, senha);

    // Precisa vir antes para salvar o token do usuário para poder fazer a busca do
    // perfil do usuário
    await setToken(response.mensagem);

    const perfil = await perfilUsuario(response.mensagem);

    await setUser(perfil.data);

    await alterarPessoa(perfil.data);

    return perfil.cadastrado;
  }, []);

  const signOut = useCallback(async () => {
    await logout(token);

    await setToken(null);

    await setUser(null);

    await alterarPessoa({});
  }, [token]);

  const alterarPessoa = async dados => {
    await setPessoa({
      ...Pessoa.criar(dados),
    });
  };

  return (
    <AutenticacaoContext.Provider
      value={{
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
      }}>
      {children}
    </AutenticacaoContext.Provider>
  );
};

export { AutenticacaoContext, AutenticacaoProvider };
