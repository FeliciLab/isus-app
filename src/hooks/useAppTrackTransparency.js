import { useContext } from 'react';
import { AppTrackTransparencyContext } from '../context/AppTrackTransparencyContext';

function useAppTrackTransparency() {
  const {
    rastreioTransparenteHabilitado,
    atribuirRastreioTransparenteHabilitado,
    verificarRastreio,
    exibirDialogAlertaRastreio
  } = useContext(AppTrackTransparencyContext);

  return {
    rastreioTransparenteHabilitado,
    atribuirRastreioTransparenteHabilitado,
    verificarRastreio,
    exibirDialogAlertaRastreio
  };
}

export default useAppTrackTransparency;
