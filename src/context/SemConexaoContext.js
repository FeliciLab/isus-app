import React, { createContext, useState } from 'react';

const SemConexaoContext = createContext();

// TODO: descobrir para que isso serve
const SemConexaoProvider = ({ children }) => {
  const [indice, mudarIndice] = useState(0);

  return (
    <SemConexaoContext.Provider
      value={{
        indice,
        mudarIndice,
      }}>
      {children}
    </SemConexaoContext.Provider>
  );
};

SemConexaoProvider.defaultProps = {
  initValues: {},
};

export { SemConexaoContext, SemConexaoProvider };
