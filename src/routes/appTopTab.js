import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import Education from '../pages/Education';
import { getCategoriasArquitetura } from '../apis/apiHome';
// import ProjetosPorCategoria from '../pages/ProjetosPorCategoria';

const EducationTab = createMaterialTopTabNavigator();
export default function EducationTabScreen() {
  const navigation = useNavigation();
  const [categorias, setCategorias] = useState([
    {
      name: 'Menu',
      slug: 'Menu',
      term_group: 0,
      term_id: 0
    }
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Educação Permanente',
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
      setCategorias(response.data['Pesquisa Científica']);
    });
  }, []);

  console.tron.log(categorias);
  return (
    <EducationTab.Navigator
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
        <EducationTab.Screen
          key={item.term_id}
          name={item.name}
          component={Education}
          initialParams={item}
        />
      ))}
    </EducationTab.Navigator>
  );
}
