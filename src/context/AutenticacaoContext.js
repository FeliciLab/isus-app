import React, { createContext, useState } from 'react';
import Pessoa from '../models/pessoa';

const AutenticacaoContext = createContext();

const AutenticacaoProvider = ({ valoresIniciais, pessoaAutenticada, children }) => {
  const [dadosUsuario, alterarDadosUsuario] = useState({});
  const [pessoa, definirPessoa] = useState(pessoaAutenticada || {});
  const [tokenUsuario, alterarTokenUsuario] = useState(valoresIniciais?.tokenAutenticacao || false);
  const [estaLogado, alterarEstaLogado] = useState(valoresIniciais?.estaLogade || false);

  const alterarPessoa = (dados) => {
    definirPessoa({
      ...Pessoa.criar(dados)
    });
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
