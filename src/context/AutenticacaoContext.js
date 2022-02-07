import React, { createContext, useState } from 'react';
import useAsyncStorage from '~/hooks/useAsyncStorage';
import Pessoa from '~/models/pessoa';

const AutenticacaoContext = createContext();

const AutenticacaoProvider = ({ children }) => {
  const [user, setUser] = useAsyncStorage('@isus:user', null);

  const [pessoa, setPessoa] = useAsyncStorage('@isus:pessoa', null);

  const [token, setToken] = useState('@isus:token', null);

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
      }}>
      {children}
    </AutenticacaoContext.Provider>
  );
};

export { AutenticacaoContext, AutenticacaoProvider };
