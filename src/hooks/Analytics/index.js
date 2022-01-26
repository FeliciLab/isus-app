import useAppTrackTransparency from '../useAppTrackTransparency';
import analytics from '@react-native-firebase/analytics';

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
      return false;
    }

    try {
      const result = await analytics().logEvent(name, {
        event,
        category,
      });
      console.log(`FireBase Analytics LogEvent - ${name}`);
      return result;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    analyticsData,
  };
};

export default useAnalytics;
