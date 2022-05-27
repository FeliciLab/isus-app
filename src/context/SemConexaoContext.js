import React, { createContext, useState } from 'react';

const SemConexaoContext = createContext();

// TODO: descobrir para que isso serve
// Serve para contabilizar as vezes que o usuário tenta reconectar.
// Após a terceira tentativa, o ícone muda para vermelho.
// Está sem utilizado na rota que leva até o componente "src/pages/SemConexao"
// deveria ser "universal" no app, mas na tela antiga de login, a implementação
// foi feita na própria tela, não utilizando este componente.
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
