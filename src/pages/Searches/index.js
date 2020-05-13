import React from 'react';
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
import { getProjetosPorCategoria } from '../../apis/apiHome';

export default function SearchesScreen() {
  const navigation = useNavigation();
  const termIdInitial = 6;
  const [data, setData] = React.useState([]);
  const Tab = createMaterialTopTabNavigator();
  useFocusEffect(
    React.useCallback(() => {
      getProjetosPorCategoria(termIdInitial).then((response) => {
        setData(response.data.data);
      });
    }, [])
  );
  const subCategorias = [
    { term_id: 443, name: 'Epidemologia' },
    { term_id: 445, name: 'Prevenção' },
    { term_id: 446, name: 'Manifestações clínicas' },
    { term_id: 447, name: 'Tratamento' },
    { term_id: 448, name: 'Fatores de risco' },
    { term_id: 449, name: 'Terapia intensiva' },
    { term_id: 450, name: 'Especialidades' }
  ];
  console.log(subCategorias);
  return (
    <ScrollView style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <View style={style.headerTop}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ marginHorizontal: 14 }}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            >
              <Icon name="menu" size={28} color="#ffffff" />
            </TouchableOpacity>
          </View>
      </View>
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
              {subCategorias.map(item => (
                <Tab.Screen
                  key={item.term_id}
                  name={item.name}
                  component={Education}
                  initialParams={item}
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
