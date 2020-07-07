import React from 'react';
import { Platform, Dimensions, Image } from 'react-native';
import WebView from 'react-native-webview';

export default function ImagemDePostagem({ conteudoBaixado, imagemBase64, urlImagem }) {
  const PlataformaImagemOffline = {
    ios: () => (ImagemOfflineiOS),
    android: () => (ImagemOfflineAndroid)
  };
  const ImagemOfflineiOS = (
    <WebView
      style={{
        height: Dimensions.get('window').width / 1.5,
        width: Dimensions.get('window').width
      }}
      source={{
        html: `<img src=${`data:image/png;base64,${imagemBase64}`} style="max-width: 100%; overflow: hidden; height: 100%;" />`
      }}
    />
  );

  const ImagemOfflineAndroid = (
    <Image
      resizeMode="contain"
      style={{
        height: Dimensions.get('window').width / 1.5,
        width: Dimensions.get('window').width
      }}
      source={{ uri: `data:image/png;base64,${imagemBase64}` }}
    />
  );

  const ImagemOnline = () => (
    <Image
      resizeMode="contain"
      style={{
        height: Dimensions.get('window').width / 1.5,
        width: Dimensions.get('window').width
      }}
      source={{ uri: `${urlImagem}` }}
    />
  );

  return conteudoBaixado ? PlataformaImagemOffline[Platform.OS]()
    : ImagemOnline();
}
