import React, { useLayoutEffect } from 'react';
import {
  TouchableOpacity
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function WebViewPage({
  navigation, route, mostrarEsqueletoDeCarregamento, esqueletoDeCarregamento
}) {
  const navigator = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50'
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: route.params.title,
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigator.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  return (
    mostrarEsqueletoDeCarregamento
      ? (
<WebView
  source={{ uri: route.params.url }}
  startInLoadingState={mostrarEsqueletoDeCarregamento}
  renderLoading={() => esqueletoDeCarregamento}
/>
      )
      : (
<WebView
  source={{ uri: route.params.url }}
/>
      ));
}
