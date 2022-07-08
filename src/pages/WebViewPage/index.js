import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import BarraDeStatus from '~/components/BarraDeStatus';
import { ArrowLeftIcon } from '~/icons';

// TODO: Melhorar esse componente para que ele possa receber BarraDeStatus backgroundColor
// Possivelmente usar um barraDeStatusPops como params da rota
const WebViewPage = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const windowWidth = Dimensions.get('window').width;

  const definirTituloWebView = title => {
    if (title.length <= 35) {
      return title;
    }

    if (windowWidth <= 320) {
      return `${title.substring(0, 24).trim()}...`;
    }

    return `${title.substring(0, 35).trim()}...`;
  };

  const alterarBackground = () =>
    route?.params?.idSaude ? '#304FFE' : '#4CAF50';

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
              navigation.navigate(route.params.rota);
              return;
            }
            navigation.goBack();
          }}>
          <ArrowLeftIcon size={28} color="#FFF" />
        </TouchableOpacity>
      ),
      ...route.params.navigationOptions,
    });
  }, []);

  const LoadingIndicator = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }}>
      <ActivityIndicator size={'large'} color={alterarBackground()} />
    </View>
  );

  return (
    <>
      <BarraDeStatus backgroundColor={alterarBackground()} />
      <WebView
        source={{ uri: route.params.url }}
        startInLoadingState
        renderLoading={LoadingIndicator}
      />
    </>
  );
};

export default WebViewPage;
