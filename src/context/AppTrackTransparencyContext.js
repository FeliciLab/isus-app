import React, { createContext, useState } from 'react';

export const AppTrackTransparencyContext = createContext();

export const AppTrackTransparencyProvider = ({ children }) => {
  const [rastreioTransparenteHabilitado, atribuirRastreioTransparenteHabilitado] = useState(false);

  const values = {
    rastreioTransparenteHabilitado,
    atribuirRastreioTransparenteHabilitado
  };

  return (
    <AppTrackTransparencyContext.Provider value={values}>
      {children}
    </AppTrackTransparencyContext.Provider>
  );
};
