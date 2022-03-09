import React from 'react';
import { Image, Platform } from 'react-native';
import WebView from 'react-native-webview';

export default function ImagemDePostagem({ conteudoBaixado, imagem, estilo }) {
  const PlataformaImagemOffline = {
    ios: () => ImagemOfflineiOS,
    android: () => ImagemOfflineAndroid,
  };
  const ImagemOfflineiOS = (
    <WebView
      style={estilo}
      source={{
        html: `<img src=${`data:image/png;base64,${imagem}`} style="max-width: 100%; overflow: hidden; height: 100%;" />`,
      }}
    />
  );

  const ImagemOfflineAndroid = (
    <Image
      resizeMode="cover"
      style={estilo}
      source={{ uri: `data:image/png;base64,${imagem}` }}
    />
  );

  const ImagemOnline = () => (
    <Image resizeMode="cover" style={estilo} source={{ uri: `${imagem}` }} />
  );

  const imagemEhBase64 = () => (imagem ? !imagem.startsWith('http') : false);

  return conteudoBaixado || imagemEhBase64()
    ? PlataformaImagemOffline[Platform.OS]()
    : ImagemOnline();
}
