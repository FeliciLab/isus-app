import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import BarraDeStatus from '~/components/BarraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon } from '~/icons';

const WebViewPage = () => {
  const navigation = useNavigation();

  const { width } = useWindowDimensions();

  const route = useRoute();

  const {
    url,
    title,
    backButtonRedirectRoute,
    navigationOptions,
    barraDeStatusProps,
    activityIndicatorProps,
  } = route.params;

  const definirTituloWebView = useCallback(title => {
    if (title.length <= 35) {
      return title;
    }

    if (width <= 320) {
      return `${title.substring(0, 24).trim()}...`;
    }

    return `${title.substring(0, 35).trim()}...`;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.VERDE,
      },
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: definirTituloWebView(title),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            if (backButtonRedirectRoute) {
              navigation.navigate(backButtonRedirectRoute);
              return;
            }
            navigation.goBack();
          }}>
          <ArrowLeftIcon size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
      ...navigationOptions,
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
      <ActivityIndicator
        size="large"
        color={CORES.VERDE}
        {...activityIndicatorProps}
      />
    </View>
  );

  return (
    <>
      <BarraDeStatus backgroundColor={CORES.VERDE} {...barraDeStatusProps} />
      <WebView
        source={{ uri: url }}
        startInLoadingState
        renderLoading={LoadingIndicator}
      />
    </>
  );
};

export default WebViewPage;
