import analytics from '@react-native-firebase/analytics';

/**
 * Função para registrar evento no Google Analytics
 * @param {string} name É a label que irá aparecer no analytics.
 * @param {string} event Corresponde à ação que gerou esse evento (Click, swipe, scroll...)
 * @param {*} category É a categoria na qual o evento será inserido.
 */
export const analyticsData = async (name, event, category) => {
  try {
    await analytics().logEvent(name, {
      event,
      category,
    });
    console.log(`FA LogEvent - ${name}`);
  } catch (e) {
    console.log(e);
  }
  return null;
};
