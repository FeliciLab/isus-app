import { useContext } from 'react';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';

function useAppTrackTransparency() {
  const { trackingStatus, isTrackingAuthorized } = useContext(
    AppTrackTransparencyContext,
  );

  return {
    trackingStatus,
    isTrackingAuthorized,
  };
}

export default useAppTrackTransparency;
