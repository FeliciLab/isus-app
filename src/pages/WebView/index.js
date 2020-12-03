import React, { useLayoutEffect } from 'react';
import {
  TouchableOpacity, Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BarraDeStatus from '../../components/barraDeStatus';

export default function WebViewPage({
  navigation, route, mostrarEsqueletoDeCarregamento, esqueletoDeCarregamento
}) {
  const navigator = useNavigation();
  const widthView = Dimensions.get('window').width;
  let res = '';
  // verificando o tamanho da tela do dispositivo para limitar os caracteres.
  if (widthView <= 320) {
    // eslint-disable-next-line no-unused-expressions
    (route.params.title.length > 35) ? res = `${route.params.title.substring(0, 24).trim()}...` : res = route.params.title;
  } else {
    // eslint-disable-next-line no-unused-expressions
    (route.params.title.length > 35) ? res = `${route.params.title.substring(0, 35).trim()}...` : res = route.params.title;
  }

  const alterarBackground = () => (route.params.idSaude ? '#304FFE' : '#4CAF50');
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: alterarBackground()
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: res,
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            if (route.params.rota) {
              navigator.navigate(route.params.rota);
              return;
            }

            navigator.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  return (
    <>
    <BarraDeStatus backgroundColor={alterarBackground()} />
    { mostrarEsqueletoDeCarregamento ? (
        <WebView
          source={{ uri: route.params.url }}
          startInLoadingState={mostrarEsqueletoDeCarregamento}
          renderLoading={() => esqueletoDeCarregamento}
        />
    ) : (
        <WebView
          source={{ uri: route.params.url }}
        />
    )}
    </>
  );
}
