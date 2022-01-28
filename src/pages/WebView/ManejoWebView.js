import React from 'react';
import EsqueletoDeCarregamento from './EsqueletoDeCarregamento';
import WebViewPage from './index';

export default function ManejoWebViewPage({ navigation, route }) {
  return (
    <WebViewPage
      route={route}
      navigation={navigation}
      mostrarEsqueletoDeCarregamento
      esqueletoDeCarregamento={<EsqueletoDeCarregamento />}
    />
  );
}
