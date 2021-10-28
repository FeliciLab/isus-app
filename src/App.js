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
import featuresAtivas from './featureAtivas';
import { AutenticacaoProvider } from './context/AutenticacaoContext';
import { CaixaDialogoProvider } from './context/CaixaDialogoContext';
import { AppTrackTransparencyProvider } from './context/AppTrackTransparencyContext';
import CaixaDialogo from './components/caixaDialogo';

function App() {
  useEffect(() => {
    SimpleLineIcons.loadFont();

    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('917766a7-c01e-4655-89a1-86f648be2fc8');

    OneSignal.promptForPushNotificationsWithUserResponse(n => console.log(n));

    OneSignal.setNotificationOpenedHandler(openResult => {
      const urlManejo = 'isusapp://manejoclinico';
      if (openResult.notification.payload.launchURL) {
        const launchUrl = openResult.notification.payload.launchURL;
        if (launchUrl === urlManejo) {
          return redirecionaManejo();
        }
        return redirecionaWebView(openResult);
      }
      return navigate('App');
    });

    OneSignal.setInAppMessageClickHandler(result => {
      const açãoDoBotãoClicado =
        Platform.OS === 'ios' ? result.clickName : result.click_name;
      if (açãoDoBotãoClicado === OneSignalActions.FEEDBACK_SIM) {
        navigate('App', { screen: 'FEEDBACK' });
        OneSignal.sendTag('acessou_feedback', 'sim');
      } else {
        OneSignal.sendTag('acessou_feedback', 'nao');
      }
    });

    return () => OneSignal.clearHandlers();
  }, []);

  const redirecionaManejo = () => navigate('clinical management');
  const redirecionaWebView = openResult => {
    const urlWebview = openResult.notification.payload.launchURL.replace(
      'isusapp',
      'https'
    );
    return navigate('webview', {
      title: openResult.notification.payload.title,
      url: urlWebview
    });
  };

  return (
    <>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />
      <FeatureToggles features={featuresAtivas}>
        <AutenticacaoProvider>
          <AppTrackTransparencyProvider>
            <CaixaDialogoProvider>
              <Routes navigationRef={navigationRef} />
              <CaixaDialogo />
            </CaixaDialogoProvider>
          </AppTrackTransparencyProvider>
        </AutenticacaoProvider>
      </FeatureToggles>
    </>
  );
}
export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
})(App);
