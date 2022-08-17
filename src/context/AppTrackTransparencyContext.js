import React, { createContext, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export const AppTrackTransparencyContext = createContext();

export const AppTrackTransparencyProvider = ({ children }) => {
  const [trackingStatus, setTrackingStatus] = useState('loading');

  const [isTrackingAuthorized, setIsTrackingAuthorized] = useState(false);

  useEffect(() => {
    const listener = AppState.addEventListener('change', status => {
      if (Platform.OS === 'ios' && status === 'active') {
        request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
          .then(result => {
            if ([RESULTS.UNAVAILABLE, RESULTS.GRANTED].some(result)) {
              setIsTrackingAuthorized(true);
            } else {
              setIsTrackingAuthorized(false);
            }

            setTrackingStatus(result);
          })
          .catch(error => console.log(error));
      }
    });

    return listener.remove;
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
