import React, { createContext, useState } from 'react';
import FormularioInfoPessoal from '../pages/Cadastro/formularioInfoPessoal';

const WizardContext = createContext();

export function WizardProvider({ children }) {
  const [TelaAtual, alterarTelaAtual] = useState({
    indice: 0,
    tela: <FormularioInfoPessoal />
  });

  return (
    <WizardContext.Provider
      value={{
        TelaAtual,
        alterarTelaAtual
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

WizardProvider.defaultProps = {
  initValues: {}
};

export default WizardContext;
