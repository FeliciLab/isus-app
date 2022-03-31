import React, { createContext, useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { perfilUsuario } from '~/apis/apiCadastro';
import { logout } from '~/apis/apiKeycloak';
import { CORES } from '~/constantes/estiloBase';
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
  const [autenticacaoLoading, setAutenticacaoLoading] = useState(false);

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

    // verificar se o usuário já está cadastrado no iSUS
    return perfil.cadastrado ? true : false;
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
        autenticacaoLoading,
        setAutenticacaoLoading,
      }}>
      {children}
      {autenticacaoLoading && (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            flex: 1,
            zIndex: 1000,
            backgroundColor: CORES.PRETO54,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </AutenticacaoContext.Provider>
  );
};

export { AutenticacaoContext, AutenticacaoProvider };
