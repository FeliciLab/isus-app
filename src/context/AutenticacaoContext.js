import React, { createContext, useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { perfilUsuario } from '~/apis/apiCadastro';
import { logout } from '~/apis/apiKeycloak';
import { CORES } from '~/constantes/estiloBase';
import useAsyncStorage from '~/hooks/useAsyncStorage';
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

    await setToken({
      accessToken: response.mensagem.access_token,
      expiresIn: response.mensagem.expires_in,
      notBeforePolicy: response.mensagem['not-before-policy'],
      refreshExpiresIn: response.mensagem.refresh_expires_in,
      refreshToken: response.mensagem.refresh_token,
      scope: response.mensagem.scope,
      sessionState: response.mensagem.session_state,
      tokenType: response.mensagem.token_type,
    });

    const perfil = await perfilUsuario(response.mensagem);

    await setUser({
      id: perfil.data.id,
      idKeycloak: perfil.data.id_keycloak,
      name: perfil.data.name,
      email: perfil.data.email,
      cpf: perfil.data.cpf,
      telefone: perfil.data.telefone,
      municipio: perfil.data.municipio,
      estado: perfil.data.estado,
      categoriaProfissional: perfil.data.profissional.categoria_profissional,
      tiposContratacoes: perfil.data.profissional.tipos_contratacoes,
      titulacoesAcademica: perfil.data.profissional.titulacoes_academica,
      unidadesServicos: perfil.data.profissional.unidades_servicos,
      especialidades: perfil.data.profissional.especialidades,
      cadastrado: perfil.data.cadastrado,
    });

    // verificar se o usuário já está cadastrado no iSUS
    return perfil.cadastrado ? true : false;
  }, []);

  const signOut = useCallback(async () => {
    await logout(token);

    await setToken(null);

    await setUser(null);
  }, [token]);

  const updateUser = useCallback(async () => {
    const perfil = await perfilUsuario(token);

    await setUser({
      id: perfil.data.id,
      idKeycloak: perfil.data.id_keycloak,
      name: perfil.data.name,
      email: perfil.data.email,
      cpf: perfil.data.cpf,
      telefone: perfil.data.telefone,
      municipio: perfil.data.municipio,
      estado: perfil.data.estado,
      categoriaProfissional: perfil.data.profissional.categoria_profissional,
      tiposContratacoes: perfil.data.profissional.tipos_contratacoes,
      titulacoesAcademica: perfil.data.profissional.titulacoes_academica,
      unidadesServicos: perfil.data.profissional.unidades_servicos,
      especialidades: perfil.data.profissional.especialidades,
      cadastrado: perfil.data.cadastrado,
    });
  }, [token]);

  return (
    <AutenticacaoContext.Provider
      value={{
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
