import React, { createContext, useState } from 'react';
import Pessoa from '../models/pessoa';

const AutenticacaoContext = createContext();

const AutenticacaoProvider = ({ children }) => {
  //
  const [dadosUsuario, alterarDadosUsuario] = useState({});
  const [pessoa, definirPessoa] = useState({});
  const [tokenUsuario, alterarTokenUsuario] = useState({});
  const [estaLogado, alterarEstaLogado] = useState(false);

  const alterarPessoa = (dados) => {
    definirPessoa(
      Pessoa(
        {
          ...dados,
          nomeCompleto: dados?.name || '',
          cidadeId: dados?.municipio?.id || '',
          cidade: dados?.municipio?.name || '',
          categoriaProfissional: dados?.profissional?.categoria_profissional?.id || ''
        }
      )
    );
  };

  return (
    <AutenticacaoContext.Provider
      value={{
        dadosUsuario,
        alterarDadosUsuario,
        tokenUsuario,
        alterarTokenUsuario,
        estaLogado,
        alterarEstaLogado,
        pessoa,
        alterarPessoa
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
