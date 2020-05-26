import * as React from 'react';

import {
  // eslint-disable-next-line no-unused-vars
  View, Image, Dimensions, StyleSheet,
  ScrollView, Text, Share, TouchableOpacity
}
  from 'react-native';
import {
  Title
} from 'react-native-paper';
import HTML from 'react-native-render-html';
import Moment from 'moment';
import 'moment/locale/pt-br';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Shared from '../../assets/images/Share.png';

export default function DescriptionScreen(props) {
  const navigation = useNavigation();
  const { route } = props;
  const { params } = route;
  const item = params.object;

  const onShare = async () => {
    const messagTitle = item.post_title;
    const messagLink = ' -iSUS: https://coronavirus.ceara.gov.br/project/'.concat(item.slug);
    try {
      await Share.share({
        message: messagTitle + messagLink
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: '#FFF',
      headerTitle: route.params.title,
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity
          style={styles.searchHeaderBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function formateDate(date) {
    Moment.locale('pt-br');
    return `Postado em ${Moment(date).format('D')} de ${Capitalize(Moment(date).format('MMMM'))} de ${Moment(date).format('YYYY')}`;
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.titleDetail}>
          <Title>{item.post_title}</Title>
        </View>
        <View style={styles.sub}>
          <View style={styles.subText}>
            <Text>{formateDate(item.data)}</Text>
          </View>
          <View style={styles.subShare}>
            <TouchableOpacity onPress={onShare}>
              <Image source={Shared} />
            </TouchableOpacity>
          </View>
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
  searchHeaderBack: {
    marginHorizontal: 19
  },
  titleDetail: {
    marginTop: 20,
    marginLeft: 18,
    marginRight: 16,
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
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#EEEEEE'
  }
});
