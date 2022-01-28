import { useNetInfo } from '@react-native-community/netinfo';
import { useContext } from 'react';
import { CORES } from '~/constantes/estiloBase';
import { CaixaDialogoContext } from '~/context/CaixaDialogoContext';

const useCaixaDialogo = () => {
  const netInfo = useNetInfo();

  const { mostrarCaixaDialogo, fecharCaixaDialogo } = useContext(
    CaixaDialogoContext,
  );

  const SemConexao = ({ acaoConcluir }, tentativa) => {
    if (!netInfo.isConnected) {
      mostrarCaixaDialogo({
        titulo: 'Sem conexão com a internet',
        texto:
          'Verifique se o wi-fi ou os dados móveis estão ativos e tente novamente.',
        cor: CORES.LARANJA,
        textoConclusao: 'TENTAR NOVAMENTE',
        textoCancelamento: 'VOLTAR',
        aoConcluir: () => {
          if (tentativa <= 3) {
            acaoConcluir(tentativa);
          }
          fecharCaixaDialogo();
        },
        aoCancelar: () => {
          fecharCaixaDialogo();
        },
      });
    }
    return tentativa;
  };
  return { SemConexao };
};

export default useCaixaDialogo;
