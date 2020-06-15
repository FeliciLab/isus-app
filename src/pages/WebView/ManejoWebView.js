import React from 'react';
import EsqueletoDeCarregamento from './EsqueletoDeCarregamento';
import WebViewPage from '.';

export default function ManejoWebViewPage({ navigation, route }) {
  return (
    <WebViewPage
      route={route}
      navigation={navigation}
      showSkeleton
      loadingComponent={<EsqueletoDeCarregamento />}
    />
  );
}
