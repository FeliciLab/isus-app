import React from 'react';
import { WebView } from 'react-native-webview';
import telaCarregamento from './telaCarregamento';

const Component = ({ url }) => (
  <WebView
    source={{ uri: url }}
    startInLoadingState
    renderLoading={() => telaCarregamento}
  />
);

export default Component;
