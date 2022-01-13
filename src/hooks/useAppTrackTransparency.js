import { useContext } from 'react';
import { AppTrackTransparencyContext } from '../context/AppTrackTransparencyContext';

function useAppTrackTransparency() {
  const {
    trackingStatus,
    isTrackingAuthorized,
    isTrackingNotDetermined,
    requestTrackingPermission,
  } = useContext(AppTrackTransparencyContext);

  return {
    trackingStatus,
    isTrackingAuthorized,
    isTrackingNotDetermined,
    requestTrackingPermission,
  };
}

export default useAppTrackTransparency;
