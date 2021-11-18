import { useContext } from 'react';
import { AppTrackTransparencyContext } from '../../context/AppTrackTransparencyContext';
import { analyticsData as analytics } from '../../utils/analytics';

const useAnalytics = () => {
  const { rastreioTransparenteHabilitado } = useContext(
    AppTrackTransparencyContext,
  );

  /**
   * Função para registrar evento no Google Analytics
   * @param {string} name É a label que irá aparecer no analytics.
   * @param {string} event Corresponde à ação que gerou esse evento (Click, swipe, scroll...)
   * @param {*} category É a categoria na qual o evento será inserido.
   */
  const analyticsData = async (name, event, category) => {
    if (!rastreioTransparenteHabilitado) {
      return false;
    }

    const result = await analytics(name, event, category);

    return result;
  };

  return {
    analyticsData,
  };
};

export default useAnalytics;
