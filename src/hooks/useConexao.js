import NetInfo from '@react-native-community/netinfo';
import { useContext } from 'react';
import { CORES } from '~/constantes/estiloBase';
import { CaixaDialogoContext } from '~/context/CaixaDialogoContext';

function useConexao() {
  let estaConectado = false;
  const { mostrarCaixaDialogo, fecharCaixaDialogo } = useContext(
    CaixaDialogoContext,
  );

  const escutar = aoConcluir => {
    NetInfo.addEventListener(state => {
      estaConectado = state.isConnected;
    });
    if (!estaConectado) {
      const dialogo = {
        titulo: 'Sem conexão com a internet',
        texto:
          'Verifique se o wi-fi ou os dados móveis estão ativos e tente novamente.',
        cor: CORES.LARANJA,
        textoConclusao: 'ok',
        aoConcluir: () => {
          aoConcluir();
          fecharCaixaDialogo();
        },
      };
      mostrarCaixaDialogo(dialogo);
    }
  };

  return {
    escutar,
  };
}

export default useConexao;
