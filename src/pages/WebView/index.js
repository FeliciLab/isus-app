import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebView } from 'react-native-webview';
import BarraDeStatus from '~/components/barraDeStatus';

export default function WebViewPage({
  navigation,
  route,
  mostrarEsqueletoDeCarregamento,
  esqueletoDeCarregamento,
}) {
  const navigator = useNavigation();
  const widthView = Dimensions.get('window').width;

  const definirTituloWebView = title => {
    if (title.length <= 35) {
      return title;
    }

    if (widthView <= 320) {
      return `${title.substring(0, 24).trim()}...`;
    }

    return `${title.substring(0, 35).trim()}...`;
  };

  const alterarBackground = () =>
    route.params.idSaude ? '#304FFE' : '#4CAF50';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: alterarBackground(),
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: definirTituloWebView(route.params.title),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            if (route.params.rota) {
              navigator.navigate(route.params.rota);
              return;
            }
            navigator.goBack();
          }}>
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      ),
      ...route.params.navigationOptions,
    });
  }, []);

  return (
    <>
      <BarraDeStatus backgroundColor={alterarBackground()} />
      {mostrarEsqueletoDeCarregamento ? (
        <WebView
          source={{ uri: route.params.url }}
          startInLoadingState={mostrarEsqueletoDeCarregamento}
          renderLoading={() => esqueletoDeCarregamento}
        />
      ) : (
        <WebView source={{ uri: route.params.url }} />
      )}
    </>
  );
}
