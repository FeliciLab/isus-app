import React, {
  createContext, useState, useEffect
} from 'react';
import { pegarVersaoDoManejo, marcarVersaoDoManejoComoLida } from '../../services/manejo';

const ContextoDeVersaoDoManejo = createContext({});

export default function ProviderDeVersaoDoManejo({ children }) {
  const [versaoDoManejo, alterarVersaoDoManejo] = useState();
  const [atualizarNoStorage, alterarAtualizarNoStorage] = useState(false);

  useEffect(() => {
    async function pegarVersaoManejo() {
      console.log('antes de atribuir no contexto', versaoDoManejo);
      const versaoManejo = await pegarVersaoDoManejo();
      alterarVersaoDoManejo(versaoManejo);
    }
    pegarVersaoManejo();
  }, []);

  useEffect(() => {
    async function atualizarEstadoDaVersaoNoStorage() {
      if (atualizarNoStorage) {
        await marcarVersaoDoManejoComoLida();
      }
      console.log('depois de atribuir no contexto', versaoDoManejo);
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
