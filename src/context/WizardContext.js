import React, { createContext, useState } from 'react';
// eslint-disable-next-line import/no-cycle
import FormularioInfoPessoal from '../pages/Cadastro/formularioInfoPessoal';

const WizardContext = createContext();

export function WizardProvider({ children }) {
  const [TelaAtual, alterarTelaAtual] = useState(<FormularioInfoPessoal />);
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
  initValues: {},
};

export default WizardContext;
