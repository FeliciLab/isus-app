import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const header = navigation => navigation.setOptions({
  headerStyle: estilos.corDaHeader,
  headerTintColor: '#FFF',
  headerTitleAlign: 'center',
  headerTitle: 'Manejo Clínico Covid-19',
  headerRight: () => (
    <TouchableOpacity
      style={estilos.margemHorizontal19}
      onPress={() => {
        navigation.navigate('Buscar');
      }}
    >
        <Icon name="magnify" size={28} color="#FFF" />
    </TouchableOpacity>
  ),
  headerLeft: () => (
    <TouchableOpacity
      style={estilos.margemHorizontal19}
      onPress={() => {
        navigation.navigate('Home');
      }}
    >
        <Icon name="arrow-left" size={28} color="#FFF" />
    </TouchableOpacity>
  )
});

const estilos = StyleSheet.create({
  corDaHeader: {
    backgroundColor: '#4CAF50',
  },
  margemHorizontal19: {
    marginHorizontal: 19
  }
});

export default header;
