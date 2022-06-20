import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import codePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CaixaDialogo from './components/caixaDialogo';
import { CORES } from './constantes/estiloBase';
import { AppTrackTransparencyProvider } from './context/AppTrackTransparencyContext';
import { AutenticacaoProvider } from './context/AutenticacaoContext';
import { CaixaDialogoProvider } from './context/CaixaDialogoContext';
import Routes from './routes';
import { navigate, navigationRef } from './routes/rootNavigation';
import OneSignalActions from './utils/oneSignalActions';
import { LogBox } from 'react-native';

function App() {
  // Ignora warnings relacionados a nova versão do RN com os módulos:
  // react-native-reanimated (deps de react-native-navigation)
  // react-native-keyboard-aware-scroll-view
  // rn-fetch-blob
  LogBox.ignoreLogs([
    'new NativeEventEmitter()',
    'EventEmitter.removeListener',
    'Require cycle: node_modules/rn-fetch-blob/index.js',
  ]);

  useEffect(() => {
    SimpleLineIcons.loadFont();

    OneSignal.setLogLevel(6, 0);

    OneSignal.setAppId('917766a7-c01e-4655-89a1-86f648be2fc8');

    OneSignal.promptForPushNotificationsWithUserResponse(n => console.log(n));

    OneSignal.setNotificationOpenedHandler(openResult => {
      try {
        const urlManejo = 'isusapp://manejoclinico';
        if (openResult.notification.payload.launchURL) {
          const launchUrl = openResult.notification.payload.launchURL;
          if (launchUrl === urlManejo) {
            return redirecionaManejo();
          }
          return redirecionaWebView(openResult);
        }
        return navigate('App');
      } catch (error) {
        console.log(error);
      }
    });

    OneSignal.setInAppMessageClickHandler(result => {
      try {
        const actionButtonClick =
          Platform.OS === 'ios' ? result.clickName : result.click_name;
        if (actionButtonClick === OneSignalActions.FEEDBACK_SIM) {
          navigate('App', { screen: 'FEEDBACK' });
          OneSignal.sendTag('acessou_feedback', 'sim');
        } else {
          OneSignal.sendTag('acessou_feedback', 'nao');
        }
      } catch (error) {
        console.log(error);
      }
    });

    return () => OneSignal.clearHandlers();
  }, []);

  const redirecionaManejo = () => navigate('clinical management');

  const redirecionaWebView = openResult => {
    const urlWebview = openResult.notification.payload.launchURL.replace(
      'isusapp',
      'https',
    );
    return navigate('webview', {
      title: openResult.notification.payload.title,
      url: urlWebview,
    });
  };

  // TODO verificar se statusbar deve ficar fora do safearea
  return (
    <>
      <StatusBar backgroundColor={CORES.VERDE} barStyle="light-content" />
      <AutenticacaoProvider>
        <AppTrackTransparencyProvider>
          <CaixaDialogoProvider>
            <SafeAreaProvider>
              <Routes navigationRef={navigationRef} />
              <CaixaDialogo />
            </SafeAreaProvider>
          </CaixaDialogoProvider>
        </AppTrackTransparencyProvider>
      </AutenticacaoProvider>
    </>
  );
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
})(App);
