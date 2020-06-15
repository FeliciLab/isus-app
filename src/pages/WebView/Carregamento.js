import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
// import ContentLoader, { Rect } from 'react-content-loader/native';
import {
  Placeholder,
  PlaceholderLine,
  Shine,
  PlaceholderMedia
} from 'rn-placeholder';

export default function Carregamento() {
  return (
  //     <ContentLoader
  //       gradientRatio={0.2}
  //       viewBox="0 0 411 683"
  //       height={483}
  //       width={290.64860907759885}
  //       speed={2}
  //       backgroundColor="#ededed"
  //       foregroundColor="#c2c2c2"
  //     >
  // <Rect x="20" y="101" rx="0" ry="0" width="378" height="49" />
  // <Rect x="22" y="441" rx="8" ry="8" width="380" height="10" />
  // <Rect x="22" y="460" rx="8" ry="8" width="380" height="10" />
  // <Rect x="20" y="170" rx="8" ry="8" width="60" height="9" />
  // <Rect x="24" y="479" rx="8" ry="8" width="380" height="10" />
  //     </ContentLoader>
  <View style={styles.container}>
    <Placeholder
      Animation={Shine}
    >
      <PlaceholderMedia size={80} style={styles.cabecalho} />
      <PlaceholderLine width={80} style={styles.titulo} />
      <PlaceholderLine width={20} style={styles.subtitulo} />
      <PlaceholderMedia size={80} style={styles.imagem} />
      <PlaceholderLine style={styles.conteudo} />
      <PlaceholderLine style={styles.conteudo} />
      <PlaceholderLine style={styles.conteudo} />
      <PlaceholderLine style={styles.conteudo} />
      <PlaceholderLine style={styles.conteudo} />
    </Placeholder>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  cabecalho: {
    width: '100%',
    marginBottom: 50,
  },
  titulo: {
    marginLeft: 60
  },
  subtitulo: {
    marginLeft: 60
  },
  imagem: {
    marginLeft: 60,
    width: 200,
    marginBottom: 50
  },
  conteudo: {
    marginLeft: 60
  }
});
