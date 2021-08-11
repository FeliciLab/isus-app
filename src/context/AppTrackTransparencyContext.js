import React, { createContext, useState } from 'react';
import {
  getTrackingStatus,
  requestTrackingPermission
} from 'react-native-tracking-transparency';

export const AppTrackTransparencyContext = createContext();

export const AppTrackTransparencyProvider = ({ mock, mockDialog, children }) => {
  const [
    rastreioTransparenteHabilitado,
    atribuirRastreioTransparenteHabilitado
  ] = useState(mock || false);

  const [
    exibirDialogAlertaRastreio,
    atribuirExibirDialogAlertaRastreio
  ] = useState(mockDialog || false);

  const definirSeRastreioHabilitado = (permissao) => {
    if (mock) return true;

    const habilitar = [
      'authorized',
      'unavailable'
    ];

    return habilitar.includes(permissao);
  };

  const definirSeDeveExibirDialog = (permissao) => {
    if (mockDialog) return true;

    const exibir = [
      'denied',
      'restrict'
    ];

    return exibir.includes(permissao);
  };

  const verificarRastreio = async () => {
    let permissao = await getTrackingStatus();
    if (permissao === 'not-determined' || !rastreioTransparenteHabilitado) {
      permissao = await requestTrackingPermission();
    }

    atribuirExibirDialogAlertaRastreio(definirSeDeveExibirDialog(permissao));
    atribuirRastreioTransparenteHabilitado(definirSeRastreioHabilitado(permissao));
  };

  const values = {
    rastreioTransparenteHabilitado,
    atribuirRastreioTransparenteHabilitado,
    verificarRastreio,
    exibirDialogAlertaRastreio
  };

  return (
    <AppTrackTransparencyContext.Provider value={values}>
      {children}
    </AppTrackTransparencyContext.Provider>
  );
};
