/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import OneSignal from 'react-native-onesignal';
import Routes from './routes';
import { navigationRef, navigate } from './routes/rootNavigation';

export default function App(properties) {
  useEffect(() => {
    OneSignal.setLogLevel(6, 0);

    OneSignal.init('917766a7-c01e-4655-89a1-86f648be2fc8', { kOSSettingsKeyAutoPrompt: false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });
    OneSignal.inFocusDisplaying(2);

    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    return function cleanup() {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

  function onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  function onOpened(openResult) {
    console.log('Launch URL:', openResult.notification.payload.launchURL);
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);

    let url = openResult.notification.payload.launchURL;

    if (url.startsWith('isus')) {
      url = url.substring(12);
      console.log(url);
      console.log(openResult.notification.payload.additionalData);
      navigate('webview', { title: openResult.notification.payload.title, url: openResult.notification.payload.launchURL });
    }

    console.log(openResult.notification.payload.additionalData);
    console.log(openResult.notification.payload.additionalData.targetURL);
    navigate('webview', { title: openResult.notification.payload.title, url: openResult.notification.payload.launchURL });
  }

  function onIds(device) {
    console.log('Device info: ', device);
  }

  return (
    <>
        <StatusBar backgroundColor="#4CAF50" />
        <Routes navigationRef={navigationRef} />
    </>
  );
}
function myiOSPromptCallback(permission) {
  // do something with permission value
}
