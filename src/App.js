import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar, Platform } from 'react-native';
import React, { useEffect } from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import OneSignal from 'react-native-onesignal';
import codePush from 'react-native-code-push';
import { FeatureToggles } from '@paralleldrive/react-feature-toggles';
import Routes from './routes';
import { navigationRef, navigate } from './routes/rootNavigation';
import OneSignalActions from './utils/oneSignalActions';
import features from './features.json';

function App() {
  useEffect(() => {
    SimpleLineIcons.loadFont();

    OneSignal.setLogLevel(6, 0);

    OneSignal.init('917766a7-c01e-4655-89a1-86f648be2fc8', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: true,
      kOSSettingsKeyInFocusDisplayOption: 2
    });
    OneSignal.inFocusDisplaying(2);

    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('inAppMessageClicked', onInAppClicked);


    return function cleanup() {
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('inAppMessageClicked', onInAppClicked);
    };
  }, []);

  const redirecionaManejo = () => navigate('clinical management');

  const redirecionaWebView = (openResult) => {
    const urlWebview = openResult.notification.payload.launchURL.replace('isusapp', 'https');
    return navigate('webview', {
      title: openResult.notification.payload.title,
      url: urlWebview
    });
  };

  function onOpened(openResult) {
    const urlManejo = 'isusapp://manejoclinico';
    if (openResult.notification.payload.launchURL) {
      const launchUrl = openResult.notification.payload.launchURL;
      if (launchUrl === urlManejo) {
        return redirecionaManejo();
      }
      return redirecionaWebView(openResult);
    }
    return navigate('App');
  }

  function onInAppClicked(result) {
    const açãoDoBotãoClicado = Platform.OS === 'ios' ? result.clickName : result.click_name;

    if (açãoDoBotãoClicado === OneSignalActions.FEEDBACK_SIM) {
      navigate('App', { screen: 'FEEDBACK' });
      OneSignal.sendTag('acessou_feedback', 'sim');
    } else {
      OneSignal.sendTag('acessou_feedback', 'nao');
    }
  }

  function myiOSPromptCallback(permission) {
    console.log(permission);
  }

  return (
    <>
      <StatusBar backgroundColor="#4CAF50" />
      <FeatureToggles features={features}>
        <Routes navigationRef={navigationRef} />
      </FeatureToggles>
    </>
  );
}
export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
})(App);
