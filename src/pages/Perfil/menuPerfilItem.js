import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { Divider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function MenuPerfilItem({ titulo }) {
  const navigation = useNavigation();

  const ItemInterior = () => (
    <View style={estilos.itemInterior}>
      <Text style={estilos.titulo}>{titulo}</Text>
      <IconMaterial style={estilos.iconeDireita} color="rgba(0, 0, 0, 0.6)" name="keyboard-arrow-right" size={25} />
    </View>
  );

  const Item = ({ children }) => (
    <View style={estilos.item}>
      {children}
      <Divider style={estilos.divisor} />
    </View>
  );

  return (
    <TouchableOpacity onPress={() => navigation.navigate('EMCONSTRUCAO')}>
      <View style={estilos.itemContainer}>
        <Icon style={estilos.iconeEsquerda} name="heart" size={25} color="rgba(0, 0, 0, 0.54)" />
        <Item>
          <ItemInterior />
        </Item>
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
  },
  item: {
    marginBottom: 15,
    flexDirection: 'column',
    width: '100%'
  },
  itemInterior: {
    flexDirection: 'row',
    marginBottom: 9,
    marginTop: 2
  },
  iconeEsquerda: {
    marginRight: 10
  },
  iconeDireita: {
    marginLeft: 'auto',
    paddingRight: 25
  },
  divisor: {
    backgroundColor: 'rgba(0, 0, 0, 0.22)'
  }
});
