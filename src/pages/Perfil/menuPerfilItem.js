import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { Divider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function MenuPerfilItem({ titulo }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('EMCONSTRUCAO')}>
      <View style={estilos.itemContainer}>
        <Icon style={{ marginRight: 10 }} name="heart" size={25} color="rgba(0, 0, 0, 0.54)" />
        <View style={{ marginBottom: 15, flexDirection: 'column', width: '100%' }}>
          <View style={{ flexDirection: 'row', marginBottom: 9, marginTop: 2 }}>
            <Text style={estilos.titulo}>{titulo}</Text>
            <IconMaterial style={{ marginLeft: 'auto', paddingRight: 25 }} color="rgba(0, 0, 0, 0.6)" name="keyboard-arrow-right" size={25} />
          </View>
          <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.22)' }} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 10
  },
  itemContainer: {
    flexDirection: 'row',
  }
});
