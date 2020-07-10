import React, {
  createContext, useState, useEffect
} from 'react';
import { pegarVersaoDoManejo, gerenciarVersaoDoManejo, atualizarEstadoDaVersaoDoManejo } from '../../../services/manejo';

const ContextoDeVersaoDoManejo = createContext({});

export default function ProviderDeVersaoDoManejo({ children }) {
  const [versaoDoManejo, alterarVersaoDoManejo] = useState();
  const [atualizarNoStorage, alterarAtualizarNoStorage] = useState(false);

  useEffect(() => {
    async function pegarVersaoManejo() {
      await gerenciarVersaoDoManejo();
      const versaoManejo = await pegarVersaoDoManejo();
      alterarVersaoDoManejo(versaoManejo);
    }
    pegarVersaoManejo();
  }, []);

  useEffect(() => {
    async function atualizarEstadoDaVersaoNoStorage() {
      if (atualizarNoStorage) {
        await atualizarEstadoDaVersaoDoManejo(versaoDoManejo);
        alterarAtualizarNoStorage(false);
      }
    }
    atualizarEstadoDaVersaoNoStorage();
  }, [versaoDoManejo]);

  const marcarVersaoComoLida = () => {
    alterarVersaoDoManejo({ ...versaoDoManejo, lido: true });
    alterarAtualizarNoStorage(true);
  };

  return (
    <ContextoDeVersaoDoManejo.Provider value={{ versaoDoManejo, marcarVersaoComoLida }}>
      {children}
    </ContextoDeVersaoDoManejo.Provider>
  );
}

export { ContextoDeVersaoDoManejo };
