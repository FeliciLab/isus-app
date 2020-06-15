import React from 'react';
// import { View, Dimensions, StyleSheet } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
// import {
//   Placeholder,
//   PlaceholderLine,
//   Fade,
//   PlaceholderMedia
// } from 'rn-placeholder';

export default function Carregamento() {
  return (
      <ContentLoader
        gradientRatio={0.2}
        viewBox="0 0 411 683"
        height={483}
        width={290.64860907759885}
        speed={2}
        backgroundColor="#ededed"
        foregroundColor="#c2c2c2"
      >
  <Rect x="20" y="101" rx="0" ry="0" width="378" height="49" />
  <Rect x="22" y="441" rx="8" ry="8" width="380" height="10" />
  <Rect x="22" y="460" rx="8" ry="8" width="380" height="10" />
  <Rect x="20" y="170" rx="8" ry="8" width="60" height="9" />
  <Rect x="24" y="479" rx="8" ry="8" width="380" height="10" />
      </ContentLoader>
  // <View style={styles.container}>
  //   <Placeholder
  //     Animation={Fade}
  //   >
  //     <PlaceholderLine width={80} />
  //     <PlaceholderLine width={20} />
  //     <PlaceholderMedia size={80} style={{ width: 200, marginBottom: 50 }} />
  //     <PlaceholderLine />
  //     <PlaceholderLine />
  //     <PlaceholderLine />
  //   </Placeholder>
  // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     height: Dimensions.get('window').height,
//     width: Dimensions.get('window').width,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 60
//   }
