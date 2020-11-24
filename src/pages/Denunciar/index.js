import React from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import BarraDeStatus from '../../components/barraDeStatus';

export default function Denunciar() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#000000',
      headerTitleAlign: 'center',
      headerTitle: 'Denunciar',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#4CAF50" />
        </TouchableOpacity>
      )
    });
  });
  return (
    <>
    <BarraDeStatus backgroundColor="#FFFFFF" barStyle="dark" />
    <View style={estilos.container}>
      <Text> Denunciar </Text>
    </View>
    </>
  );
}
const heightView = Dimensions.get('window').height;
const estilos = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: heightView
  }
});
