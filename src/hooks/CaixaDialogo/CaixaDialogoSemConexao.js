import { useContext, useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

import { CaixaDialogoContext } from '../../context/CaixaDialogoContext';
import { CORES } from '../../constantes/estiloBase';

const useCaixaDialogo = () => {
  const {
    mostrarCaixaDialogo,
    fecharCaixaDialogo,
  } = useContext(CaixaDialogoContext);

  const netInfo = useNetInfo();
  let estaConectado = true;

  useEffect(() => {
    estaConectado = netInfo.isConnected;
  }, [estaConectado]);

  const SemConexao = ({ acaoConcluir }, indice) => {
    console.log('entrou em caixaDialogoSemConexao');
    if (!estaConectado) {
      console.log('estaConectado:', estaConectado);
      mostrarCaixaDialogo({
        titulo: 'Sem conexão com a internet',
        texto: 'Verifique se o wi-fi ou os dados móveis estão ativos e tente novamente.',
        cor: CORES.LARANJA,
        textoConclusao: 'TENTAR NOVAMENTE',
        textoCancelamento: 'VOLTAR',
        aoConcluir: () => {
          console.log(indice);
          if (indice <= 3) acaoConcluir(indice);
          fecharCaixaDialogo();
        },
        aoCancelar: () => {
          console.log('passou aqui');
          fecharCaixaDialogo();
        }
      });
    }
    return indice;
  };
  return { SemConexao };
};

export default useCaixaDialogo;
