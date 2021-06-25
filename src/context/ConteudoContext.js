import React, { createContext, useState } from 'react';

export const ConteudoContext = createContext();

export const ConteudoProvider = ({
  categoria,
  titulo,
  children
}) => {
  const [categorias, alterarCategorias] = useState([]);
  return (
    <ConteudoContext.Provider
      value={{
        categoria,
        titulo,
        categorias,
        alterarCategorias
      }}
    >
      {children}
    </ConteudoContext.Provider>
  );
};
