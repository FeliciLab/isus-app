import React, { createContext, useState } from 'react';
import {
  getTrackingStatus,
  requestTrackingPermission
} from 'react-native-tracking-transparency';

export const AppTrackTransparencyContext = createContext();

export const AppTrackTransparencyProvider = ({ children }) => {
  const [rastreioTransparenteHabilitado, atribuirRastreioTransparenteHabilitado] = useState(false);
  const [exibirDialogAlertaRastreio, atribuirExibirDialogAlertaRastreio] = useState('not-determined');

  const definirSeRastreioHabilitado = (permissao) => {
    const habilitar = [
      'authorized',
      'unavailable'
    ];

    return habilitar.includes(permissao);
  };
  
  const definirSeDeveExibirDialog = (permissao) => {
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
    verificarRastreio
  };

  return (
    <AppTrackTransparencyContext.Provider value={values}>
      {children}
    </AppTrackTransparencyContext.Provider>
  );
};
