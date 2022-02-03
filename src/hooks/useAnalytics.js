import { analyticsData as analytics } from '~/utils/analytics';
import useAppTrackTransparency from './useAppTrackTransparency';

const useAnalytics = () => {
  const { isTrackingAuthorized } = useAppTrackTransparency();

  /**
   * Função para registrar evento no Google Analytics
   * @param {string} name É a label que irá aparecer no analytics.
   * @param {string} event Corresponde à ação que gerou esse evento (Click, swipe, scroll...)
   * @param {*} category É a categoria na qual o evento será inserido.
   */
  const analyticsData = async (name, event, category) => {
    if (!isTrackingAuthorized) {
      return;
    }
    try {
      await analytics(name, event, category);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    analyticsData,
  };
};

export default useAnalytics;
