import * as React from 'react';
import {
  View, Image, Dimensions, ScrollView
} from 'react-native';
import { Title } from 'react-native-paper';
// import { WebView } from 'react-native-webview';
import HTML from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';

export default function DescriptionScreen(props) {
  const navigation = useNavigation();
  console.tron.log(props);
  const { route } = props;
  const { item } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      }
    });
  });

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <Title>{item.post_title}</Title>
      <Image
        resizeMode="contain"
        style={{
          height: Dimensions.get('window').width / 1.5,
          width: Dimensions.get('window').width
        }}
        source={{ uri: `${item.image}` }}
      />
      <View style={{ padding: 10, alignContent: 'center' }}>
        <HTML html={item.content} />
      </View>
    </ScrollView>
  );
}
