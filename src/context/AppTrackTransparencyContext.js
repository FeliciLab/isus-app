import React, { createContext, useState } from 'react';
import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';

export const AppTrackTransparencyContext = createContext();

export const AppTrackTransparencyProvider = ({ children }) => {
  const [
    rastreioTransparenteHabilitado,
    setRastreioTransparenteHabilitado,
  ] = useState(false);

  const [
    exibirDialogAlertaRastreio,
    atribuirExibirDialogAlertaRastreio,
  ] = useState(false);

  const definirSeRastreioHabilitado = permissao => {
    const habilitar = ['authorized', 'unavailable'];

    return habilitar.includes(permissao);
  };

  const definirSeDeveExibirDialog = permissao => {
    const exibir = ['denied', 'restrict'];

    return exibir.includes(permissao);
  };

  const verificarRastreio = async () => {
    let permissao = await getTrackingStatus();
    if (permissao === 'not-determined' || !rastreioTransparenteHabilitado) {
      permissao = await requestTrackingPermission();
    }

    atribuirExibirDialogAlertaRastreio(definirSeDeveExibirDialog(permissao));
    setRastreioTransparenteHabilitado(definirSeRastreioHabilitado(permissao));
  };

  const values = {
    rastreioTransparenteHabilitado,
    setRastreioTransparenteHabilitado,
    verificarRastreio,
    exibirDialogAlertaRastreio,
  };

  return (
    <AppTrackTransparencyContext.Provider value={values}>
      {children}
    </AppTrackTransparencyContext.Provider>
  );
};
