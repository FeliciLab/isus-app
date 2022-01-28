import React, { createContext, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';

// App Tracking Status:
// unavailable => não está disponível no dispositivo atual.
//    Esse é o caso em dispositivos Android e iPhones abaixo do iOS 14
// denied => O usuário negou explicitamente permissão para rastrear.
// authorized => O usuário concedeu permissão para rastrear.
// restricted => O alerta de permissão de rastreamento não pode ser exibido porque o dispositivo está restrito.
// not-determined => O usuário ainda não foi solicitado a conceder permissões de rastreamento.
//    Chame requestTrackingPermission()

export const AppTrackTransparencyContext = createContext();

export const AppTrackTransparencyProvider = ({ children }) => {
  const [trackingStatus, setTrackingStatus] = useState('loading');

  const [isTrackingAuthorized, setIsTrackingAuthorized] = useState(false);

  useEffect(() => {
    const listener = AppState.addEventListener('change', status => {
      if (status === 'active') {
        // issue da lib para iOS 15
        (async () => {
          const status = await getTrackingStatus(); // pega o status do ATT

          if (status === 'unavailable' || status === 'authorized') {
            setIsTrackingAuthorized(true);
          } else {
            setIsTrackingAuthorized(false);
          }

          setTrackingStatus(status);

          if (status === 'not-determined') {
            await requestTrackingPermission();
          }
        })();
      }
    });

    return () => {
      listener && listener.remove();
    };
  }, []);

  const values = {
    trackingStatus,
    isTrackingAuthorized,
  };

  return (
    <AppTrackTransparencyContext.Provider value={values}>
      {children}
    </AppTrackTransparencyContext.Provider>
  );
};
