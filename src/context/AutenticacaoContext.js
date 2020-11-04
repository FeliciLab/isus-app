import React, { createContext, useState } from 'react';

const AutenticacaoContext = createContext();

const AutenticacaoProvider = ({ children }) => {
  //
  const [dadosUsuario, alterarDadosUsuario] = useState({});
  const [tokenUsuario, alterarTokenUsuario] = useState({});
  const [estaLogado, alterarEstaLogado] = useState(false);

  return (
    <AutenticacaoContext.Provider
      value={{
        dadosUsuario,
        alterarDadosUsuario,
        tokenUsuario,
        alterarTokenUsuario,
        estaLogado,
        alterarEstaLogado
      }}
    >
      {children}
    </AutenticacaoContext.Provider>
  );
};

export {
  AutenticacaoContext,
  AutenticacaoProvider
};
