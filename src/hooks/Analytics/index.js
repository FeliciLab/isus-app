import { useContext } from 'react';
import analytics from '@react-native-firebase/analytics';
import { AppTrackTransparencyContext } from '../../context/AppTrackTransparencyContext';


const useAnalytics = () => {
  const { rastreioTransparenteHabilitado } = useContext(AppTrackTransparencyContext);

  /**
   * Função para registrar evento no Google Analytics
   * @param {string} name É a label que irá aparecer no analytics.
   * @param {string} event Corresponde à ação que gerou esse evento (Click, swipe, scroll...)
   * @param {*} category É a categoria na qual o evento será inserido.
   */
  const analyticsData = async (
    name,
    event,
    category
  ) => {
    if (!rastreioTransparenteHabilitado) {
      return false;
    }

    try {
      await analytics().logEvent(name, {
        event,
        category,
      });

      console.log(`FA LogEvent - ${name}`);
    } catch (e) {
      console.log('Falha ao executar o Analytics', e);
      throw new Error(`Falha ao executar Analytics ${e}`);
    }

    return true;
  };

  return {
    analyticsData
  };
};

export default useAnalytics;
