import React, { createContext, useState } from 'react';

const CaixaDialogoContext = createContext();

// TODO: verificar se isso é realmente necessário
function CaixaDialogoProvider({ children }) {
  const [indice, mudarIndice] = useState(0);

  const [visivel, alterarVisibilidade] = useState(false);

  const [titulo, alterarTitulo] = useState('');

  const [texto, alterarTexto] = useState('');

  const [cor, alterarCor] = useState('');

  const [textoConclusao, alterarTextoConclusao] = useState('');

  const [textoCancelamento, alterarTextoCancelamento] = useState('');

  const [aoCancelar, alterarAoCancelar] = useState(() => true);

  const [aoConcluir, alterarAoConcluir] = useState(() => true);

  const mostrarCaixaDialogo = obj => {
    alterarVisibilidade(false);
    alterarTitulo(obj.titulo);
    alterarCor(obj.cor);
    alterarTexto(obj.texto);
    alterarTextoConclusao(obj.textoConclusao);
    alterarTextoCancelamento(obj.textoCancelamento);
    alterarAoCancelar(() => obj.aoCancelar);
    alterarAoConcluir(() => obj.aoConcluir);
    alterarVisibilidade(true);
  };

  const fecharCaixaDialogo = () => {
    alterarVisibilidade(false);
  };

  return (
    <CaixaDialogoContext.Provider
      value={{
        mostrarCaixaDialogo,
        fecharCaixaDialogo,
        visivel,
        titulo,
        texto,
        cor,
        textoConclusao,
        textoCancelamento,
        aoCancelar,
        aoConcluir,
        indice,
        mudarIndice,
      }}>
      {children}
    </CaixaDialogoContext.Provider>
  );
}

export { CaixaDialogoProvider, CaixaDialogoContext };
