import React, { useLayoutEffect } from 'react';
import {
  TouchableOpacity, Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function WebViewPage({ navigation, route }) {
  const navigator = useNavigation();
  console.log(route.params.title.length)  
  const widthView = Dimensions.get('window').width;
  console.log(widthView);
  let res = '';
  if (widthView <= 320) {
    // eslint-disable-next-line no-unused-expressions
    (route.params.title.length > 35) ? res = `${route.params.title.substring(0, 24).trim()}...` : res = route.params.title;
  } else {
    // eslint-disable-next-line no-unused-expressions
    (route.params.title.length > 35) ? res = `${route.params.title.substring(0, 35).trim()}...` : res = route.params.title;
  }
  console.log(res);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50'
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
            navigator.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  return (
    <WebView
      source={{
        uri: route.params.url
      }}
    />

  );
}
