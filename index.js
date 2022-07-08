import React from 'react';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from '~/theme/index';
import { name as appName } from './app.json';
import App from './src/App';
import './src/configs/reactotronConfig';

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
