import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import OneSignal from 'react-native-onesignal';
import Routes from './routes';
import { navigationRef, navigate } from './routes/rootNavigation';

export default function App() {
  useEffect(() => {
    OneSignal.setLogLevel(6, 0);

    OneSignal.init('917766a7-c01e-4655-89a1-86f648be2fc8', { kOSSettingsKeyAutoPrompt: false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });
    OneSignal.inFocusDisplaying(2);

    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('opened', onOpened);

    return function cleanup() {
      OneSignal.removeEventListener('opened', onOpened);
    };
  }, []);

  function onOpened(openResult) {
    navigate('webview', { title: openResult.notification.payload.title, url: openResult.notification.payload.launchURL });
  }

  return (
    <>
        <StatusBar backgroundColor="#4CAF50" />
        <Routes navigationRef={navigationRef} />
    </>
  );
}
function myiOSPromptCallback() {}
