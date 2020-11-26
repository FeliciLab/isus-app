import analytics from '@react-native-firebase/analytics';

const analyticsData = async (
  name, eventy, category
) => {
  try {
    await analytics().logEvent(name, {
      eventy,
      category,
    });
    console.log(`FA LogEvent - ${name}`);
  } catch (e) {
    console.log(e);
  }
  return null;
};

const Analytics = {
  analyticsData
};

export {
  analyticsData
};

export default Analytics;
