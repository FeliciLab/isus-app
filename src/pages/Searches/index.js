import * as React from 'react';
import {
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { Caption, Button } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getProjetosPorCategoria } from '../../apis/apiHome';

export default function SearchesScreen() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Sobre o iSUS',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}
        >
          <Icon name="magnify" size={28} color="#FFF" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Icon name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  const [data, setData] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getProjetosPorCategoria(6).then((response) => {
        console.tron.log('response', response.data.data);
        setData(response.data.data);
      });
    }, [])
  );

  return (
    <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            // justifyContent: 'space-evenly',
            marginTop: 10
          }}
        >
        <Button
          mode="text"
          compact="true"
          color="#000000"
          style={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'norma',
            fontSize: 14,
            lineHeight: 20,
            textAlign: 'center',
            letterSpacing: 0.25,
            background: 'rgba(0, 0, 0, 0.38)'
          }}
          contentStyle={{
            height: 44,
            backgroundColor: '#F0F0F0',
            marginRight: 18,
            marginLeft: 14
          }}
          onPress={() => console.log('Pressed')}
        >
          Manejo Clínico
        </Button>

        <Button
          mode="text"
          compact="true"
          color="#000000"
          style={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'norma',
            fontSize: 14,
            lineHeight: 20,
            textAlign: 'center',
            letterSpacing: 0.25,
            background: 'rgba(0, 0, 0, 0.38)'
          }}
          contentStyle={{
            height: 44,
            backgroundColor: '#F0F0F0'
          }}
          onPress={() => console.log('Pressed')}
        >
        Manejo Clínico
        </Button>

      <Button
        mode="text"
        compact="true"
        color="#000000"
        style={{
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontWeight: 'norma',
          fontSize: 14,
          lineHeight: 20,
          textAlign: 'center',
          letterSpacing: 0.25,
          background: 'rgba(0, 0, 0, 0.38)'
        }}
        contentStyle={{
          height: 44,
          backgroundColor: '#F0F0F0'
        }}
        onPress={() => console.log('Pressed')}
      >
      Manejo Clínico
      </Button>
        </View>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      numColumns={2}
      keyExtractor={item => item.id}
      style={{ flex: 1, alignSelf: 'center' }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            height: 200,
            width: Dimensions.get('window').width / 2.2,
            alignItems: 'center',
            margin: 5
          }}
          onPress={() => navigation.navigate('Educaçao permanente', { item })}
        >
          <Image
            style={{ height: 110, width: Dimensions.get('window').width / 2.2 }}
            source={{ uri: `${item.image}` }}
            // resizeMode="contain"
          />
          <View style={{ marginHorizontal: 15 }}>
            <Caption numberOfLines={3}>{item.post_title}</Caption>
          </View>
        </TouchableOpacity>
      )}
    />
    </ScrollView>
  );
}
