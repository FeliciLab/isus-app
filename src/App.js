/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import Routes from './routes';
import { useNavigation } from '@react-navigation/native';

export default function App(properties) {
  const navigation = useNavigation();
  useEffect(() => {
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
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

    navigation.navigate('webview', {
      title: 'Notificação',
      url: 'https://google.com.br'
    });
  }

  function onIds(device) {
    console.log('Device info: ', device);
  }

  return (
    <>
        <StatusBar backgroundColor="#4CAF50" />
        <Routes />
    </>
  );
}
function myiOSPromptCallback(permission) {
  // do something with permission value
}
