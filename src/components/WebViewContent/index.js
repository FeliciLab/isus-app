import React from 'react';
import { WebView } from 'react-native-webview';
import ArticleSkeletonPlaceholder from '../ArticleSkeletonPlaceholder';

const WebViewContent = ({ url }) => (
  <WebView
    source={{ uri: url }}
    startInLoadingState
    renderLoading={ArticleSkeletonPlaceholder}
  />
);

export default WebViewContent;
