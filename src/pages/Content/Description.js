import * as React from 'react';

import {
  // eslint-disable-next-line no-unused-vars
  View, Image, Dimensions, StyleSheet, ScrollView,
  Platform, Text, Share, TouchableOpacity, ToastAndroid
}
  from 'react-native';
import {
  Title
} from 'react-native-paper';
import HTML from 'react-native-render-html';
import Moment from 'moment';
import 'moment/locale/pt-br';
import { useNavigation } from '@react-navigation/native';
import Shared from '../../assets/images/Share.png';

export default function DescriptionScreen(props) {
  const navigation = useNavigation();
  // console.tron.log(props);
  const { route } = props;
  const { item } = route.params;
  // MENSAGEM PARA FEEDBACK AO USUÁRIO
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const onShare = async () => {
    const messagTitle = item.post_title;
    const messagLink = ' -iSUS: https://coronavirus.ceara.gov.br/project/'.concat(item.slug);
    try {
      const result = await Share.share({
        message: messagTitle + messagLink
      });
      resultTeste(result);
    } catch (error) {
      // console.log(error.message);
    }
  };

  function resultTeste(result) {
    if (result.action === Share.sharedAction) {
      showToast('Compartilhando esse link...');
    }
  }

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

  function shareImage() {
    if (Platform.OS === 'ios') {
      return (
      <View />
      );
    }
    return (
    <View style={styles.subShare}>
      <TouchableOpacity onPress={onShare}>
        <Image source={Shared} />
      </TouchableOpacity>
    </View>
    );
  }
  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function formateDate(date) {
    Moment.locale('pt-br');
    return `Postado em ${Moment(date).format('D')} de ${Capitalize(Moment(date).format('MMMM'))} de ${Moment(date).format('YYYY')}`;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View>
        <View style={styles.titleDetail}>
          <Title>{item.post_title}</Title>
        </View>
        <View style={styles.sub}>
          <View style={styles.subText}>
            <Text>{formateDate(item.data)}</Text>
          </View>
          {shareImage()}
        </View>
        <Image
          resizeMode="contain"
          style={{
            height: Dimensions.get('window').width / 1.5,
            width: Dimensions.get('window').width
          }}
          source={{ uri: `${item.image}` }}
        />
        <View
          style={{
            // height: Dimensions.get('window').width / 1.5,
            width: Dimensions.get('window').width
          }}
        >
            <View style={{
              padding: 10,
              alignContent: 'center'
            }}
            >
              <HTML html={item.content} />
            </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#333333'
  },
  titleDetail: {
    marginTop: 32,
    marginLeft: 18,
    marginRight: 16,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    lineHeight: 28,
    color: '#666666'
  },
  sub: {
    flexDirection: 'row',
    margin: 1,
    justifyContent: 'space-between',
    marginTop: 12
  },
  subText: {
    marginLeft: 18,
    marginTop: 12,
    marginBottom: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#666666'
  },
  subShare: {
    marginRight: 20,
    marginTop: 12,
    marginBottom: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#EEEEEE'
  }
});
