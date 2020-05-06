import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Education from '../pages/Education';
import { getCategoriasArquitetura } from '../apis/apiHome';
// import ProjetosPorCategoria from '../pages/ProjetosPorCategoria';

const EducationTab = createMaterialTopTabNavigator();
export default function EducationTabScreen() {
  const [categorias, setCategorias] = useState([
    {
      name: 'Menu',
      slug: 'Menu',
      term_group: 0,
      term_id: 0
    }
  ]);

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
