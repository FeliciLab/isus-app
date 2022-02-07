import React, { createContext, useCallback } from 'react';
import { perfilUsuario } from '~/apis/apiCadastro';
import { logout } from '~/apis/apiKeycloak';
import useAsyncStorage from '~/hooks/useAsyncStorage';
import Pessoa from '~/models/pessoa';
import { autenticarComIdSaude } from '~/services/autenticacao';

const AutenticacaoContext = createContext();

const AutenticacaoProvider = ({ children }) => {
  const [user, setUser] = useAsyncStorage('@isus:user', null);

  const [pessoa, setPessoa] = useAsyncStorage('@isus:pessoa', null);

  const [token, setToken] = useAsyncStorage('@isus:token', null);

  // Retorno se o perfil já estava cadastrado
  // Necessário para caso de uso de usuário que tem idSaude
  // mas que nao fez o cadastro no iSUS
  const signIn = useCallback(async (email, senha) => {
    const response = await autenticarComIdSaude(email, senha);

    console.log(JSON.stringify({ response }, undefined, 2));

    // Precisa vir antes para salvar o token do usuário para poder fazer a busca do
    // perfil do usuário
    await setToken(response.mensagem);

    const perfil = await perfilUsuario(response.mensagem);

    await setUser(perfil.data);

    alterarPessoa(perfil.data);

    return perfil.cadastrado;
  }, []);

  const signOut = useCallback(async () => {
    await logout(token);

    await setToken(null);

    await setUser(null);

    alterarPessoa({});
  }, []);

  const alterarPessoa = dados => {
    setPessoa({
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
      }}>
      {children}
    </AutenticacaoContext.Provider>
  );
};

export { AutenticacaoContext, AutenticacaoProvider };
