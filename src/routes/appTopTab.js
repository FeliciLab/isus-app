import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Education from '../pages/Education';
import { getCategoriasData } from '../apis/apiHome';
// import ProjetosPorCategoria from '../pages/ProjetosPorCategoria';

const EducationTab = createMaterialTopTabNavigator();
export default function EducationTabScreen() {
  const [categorias, setCategorias] = useState([
    {
      categoria: {
        name: 'Menu',
        slug: 'Menu',
        term_group: 0,
        term_id: 0
      }
    }
  ]);

  useEffect(() => {
    getCategoriasData().then((response) => {
      setCategorias(response.data);
    });
  }, []);

  return (
    <EducationTab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        labelStyle: { fontSize: 10 },
        indicatorStyle: { backgroundColor: '#4CAF50' }
      }}
    >
      {categorias.map(item => (
        <EducationTab.Screen
          key={item.categoria.term_id}
          name={item.categoria.name}
          component={Education}
        />
      ))}
    </EducationTab.Navigator>
  );
}
