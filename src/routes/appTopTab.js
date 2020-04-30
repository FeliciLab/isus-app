import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Education from '../pages/Education';

const EducationTab = createMaterialTopTabNavigator();
export default function EducationTabScreen() {
  return (
    <EducationTab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 10 },
        indicatorStyle: { backgroundColor: '#4CAF50' }
      }}
    >
      <EducationTab.Screen
        name="Recursos Educativos"
        component={Education}
        options={{ headerShown: true }}
      />
      <EducationTab.Screen name="Protocolos Institucionais" component={Education} />
      <EducationTab.Screen name="Notas e Portarias" component={Education} />
    </EducationTab.Navigator>
  );
}
