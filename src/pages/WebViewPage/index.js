import { useNavigation } from '@react-navigation/native';
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

const WebViewPage = ({ navigation, route }) => {
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
              navigator.navigate(route.params.rota);
              return;
            }
            navigator.goBack();
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
      <ActivityIndicator
        size={'large'}
        color={alterarBackground()}
      />
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
