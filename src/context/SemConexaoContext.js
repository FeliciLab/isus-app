import React, { createContext, useState } from 'react';

const SemConexaoContext = createContext();

const SemConexaoProvider = ({ children }) => {
  const [telaAtual, alterarTelaAtual] = useState({ indice: 0 });

  return (
    <SemConexaoContext.Provider
      value={{
        telaAtual,
        alterarTelaAtual
      }}
    >
      {children}
    </SemConexaoContext.Provider>
  );
};

SemConexaoProvider.defaultProps = {
  initValues: {},
};

export {
  SemConexaoContext,
  SemConexaoProvider
};
