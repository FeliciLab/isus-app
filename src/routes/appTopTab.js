import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { getCategoriasArquitetura } from '../apis/apiHome';

const Tab = createMaterialTopTabNavigator();
const indexComponent = 0;
const indexTitle = 1;
let genericComponent;

export default function EducationTabScreen(props) {
  const { route } = props;
  genericComponent = route.params[indexComponent].type;

  const navigation = useNavigation();
  const [categorias, setCategorias] = useState([
    {
      name: ' ',
      slug: ' ',
      term_group: 0,
      term_id: 0
    }
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF40',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: props.route.name,
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

  useEffect(() => {
    getCategoriasArquitetura().then((response) => {
      setCategorias(response.data[props.route.name]);
    });
  }, []);

  function addTitle(item) {
    const title = route.params[indexTitle];
    item.title_description = title;
    return item;
  }

  return (
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
          component={genericComponent}
          initialParams={addTitle(item)}
        />
      ))}
    </Tab.Navigator>
  );
}
