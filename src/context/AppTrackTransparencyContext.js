import React, { createContext, useState, useEffect } from 'react';
import { getTrackingStatus } from 'react-native-tracking-transparency';

export const AppTrackTransparencyContext = createContext();

// App Tracking Status:
// unavailable => não está disponível no dispositivo atual.
//    Esse é o caso em dispositivos Android e iPhones abaixo do iOS 14
// denied => O usuário negou explicitamente permissão para rastrear.
// authorized => O usuário concedeu permissão para rastrear.
// restricted => O alerta de permissão de rastreamento não pode ser exibido porque o dispositivo está restrito.
// not-determined => O usuário ainda não foi solicitado a conceder permissões de rastreamento.
//    Chame requestTrackingPermission()

export const AppTrackTransparencyProvider = ({ children }) => {
  const [trackingStatus, setTrackingStatus] = useState('');

  useEffect(() => {
    getTrackingStatus()
      .then(status => {
        setTrackingStatus(status);
      })
      .catch(e => console.log('Error', e?.toString?.() ?? e));
  }, []);

  const isTrackingAuthorized = () => {
    return ['unavailable', 'authorized'].includes(trackingStatus);
  };

  const isTrackingNotDetermined = () => {
    return trackingStatus === 'not-determined';
  };

  const requestTrackingPermission = React.useCallback(async () => {
    try {
      if (trackingStatus === 'not-determined') {
        const status = await requestTrackingPermission();
        setTrackingStatus(status);
      }
    } catch (e) {
      console.log('Error', e?.toString?.() ?? e);
    }
  }, []);

  const values = {
    trackingStatus,
    isTrackingAuthorized,
    isTrackingNotDetermined,
    requestTrackingPermission,
  };

  return (
    <AppTrackTransparencyContext.Provider value={values}>
      {children}
    </AppTrackTransparencyContext.Provider>
  );
};
