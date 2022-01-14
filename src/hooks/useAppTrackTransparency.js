import { useContext } from 'react';
import { AppTrackTransparencyContext } from '../context/AppTrackTransparencyContext';

function useAppTrackTransparency() {
  const {
    trackingStatus,
    isTrackingAuthorized,
    isTrackingNotDetermined,
    requestPermission,
  } = useContext(AppTrackTransparencyContext);

  return {
    trackingStatus,
    isTrackingAuthorized,
    isTrackingNotDetermined,
    requestPermission,
  };
}

export default useAppTrackTransparency;
