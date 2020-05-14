import React, { useState } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';
import { Caption } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Education from '../Education';
import { getProjetosPorCategoria, getCategoriasArquitetura } from '../../apis/apiHome';


export default function SearchesScreen(props) {
  const navigation = useNavigation();
  const { route } = props;
  const { params } = route;
  console.log(params);
  let termIdInitial = 443;
  const [data, setData] = useState([]);
  const [categorias, setCategorias] = useState([
    {
      name: 'Menu',
      slug: 'Menu',
      term_group: 0,
      term_id: 0
    }
  ]);
  const Tab = createMaterialTopTabNavigator();

  useFocusEffect(
    React.useCallback(() => {
      getProjetosPorCategoria(termIdInitial).then((response) => {
        setData(response.data.data);
      });
      getCategoriasArquitetura().then((response) => {
        console.log('response.data');
        // console.log(response.data);
        console.log(response.data['Pesquisa Científica']);
        setCategorias(response.data['Pesquisa Científica']);
      });
      // getCategoriasArquitetura().then((response) => {
      //   setCategorias(response.data['Pesquisa Científica']);
      //   // console.log('setCategorias');
      //   // console.log(setCategorias);
      // });
    }, [])
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Pesquisa científica',
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

  return (
    <ScrollView style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <View style={style.headerTop}>
          <View style={{ flexDirection: 'row' }}>
            <Tab.Navigator
              tabBarOptions={{
                scrollEnabled: true,
                labelStyle: {
                  fontSize: 14
                },
                indicatorStyle: { backgroundColor: '#FFF' },
                inactiveTintColor: 'rgba(0, 0, 0, 0.54)',
                activeTintColor: '#FFF',
                style: {
                  backgroundColor: '#4CAF50'
                }
              }}
            >
              {categorias.map(item => (
                <Tab.Screen
                  key={item.term_id}
                  name={item.name}
                  component={Education}
                  initialParams={item}
                  clickButton={() => {
                    termIdInitial = item.term_id;
                    console.log(termIdInitial);
                    getProjetosPorCategoria(termIdInitial).then((response) => {
                      console.log('getProjetosPorCategoria');
                      setData(response.data.data);
                    });
                  }}
                />
              ))}
            </Tab.Navigator>
          </View>
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

const style = StyleSheet.create({
  sty: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: 0.25,
    // color: '#000000de'
  },
  styleContent: {
    height: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    marginRight: 18,
    marginLeft: 14,
    opacity: 0.3,
    borderRadius: 18,
    marginTop: 4,
    // color: '#959595'
  },
  headerTop: {
    paddingHorizontal: 10,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4CAF50'
  },

  spaceRight: {
    margin: 10,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0.25,
    textAlign: 'left'
  }
});
