import React, { createContext, useState } from 'react';

const CaixaDialogoContext = createContext();

function CaixaDialogoProvider({ children }) {
  const [visivel, alterarVisibilidade] = useState(false);
  const [titulo, alterarTitulo] = useState('');
  const [texto, alterarTexto] = useState('');
  const [cor, alterarCor] = useState('');
  const [textoConclusao, alterarTextoConclusao] = useState('');
  const [textoCancelamento, alterarTextoCancelamento] = useState('');
  const [aoCancelar, alterarAoCancelar] = useState(() => true);
  const [aoConcluir, alterarAoConcluir] = useState(() => true);


  const mostrarCaixaDialogo = (obj) => {
    alterarVisibilidade(false);
    alterarTitulo(obj.titulo);
    alterarCor(obj.cor);
    alterarTexto(obj.texto);
    alterarTextoConclusao(obj.textoConclusao);
    alterarTextoCancelamento(obj.textoCancelamento);
    alterarAoCancelar(obj.aoCancelar);
    alterarAoConcluir(obj.aoConcluir);
    alterarVisibilidade(true);
  };

  return (
    <CaixaDialogoContext.Provider
      value={{
        mostrarCaixaDialogo,
        visivel,
        titulo,
        texto,
        cor,
        textoConclusao,
        textoCancelamento,
        aoCancelar,
        aoConcluir
      }}
    >
      {children}
    </CaixaDialogoContext.Provider>
  );
}

export { CaixaDialogoProvider, CaixaDialogoContext };
