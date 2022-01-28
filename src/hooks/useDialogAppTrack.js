import { useContext } from 'react';
import { CaixaDialogoContext } from '~/context/CaixaDialogoContext';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';

const useDialogAppTrack = () => {
  const { mostrarCaixaDialogo, fecharCaixaDialogo } = useContext(
    CaixaDialogoContext,
  );

  const { exibirDialogAlertaRastreio } = useContext(
    AppTrackTransparencyContext,
  );

  const exibirDialog = tipo => {
    if (!exibirDialogAlertaRastreio) {
      return false;
    }
    mostrarCaixaDialogo({
      titulo: 'App Tracking Transparency',
      texto: `Para efetuar ${tipo}, você deve habilitar nas configurações do seu dispositivo a permissão do App Track`,
      textoConclusao: 'OK',
      aoConcluir: () => {
        fecharCaixaDialogo();
      },
    });
    return true;
  };

  return { exibirDialog };
};

export default useDialogAppTrack;
