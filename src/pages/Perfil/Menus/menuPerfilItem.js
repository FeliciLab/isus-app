import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MenuPerfilItem({
  titulo, icone, onPress
}) {
  const ItemInterior = () => (
    <View style={estilos.itemInterior}>
      <Text style={estilos.titulo}>{titulo}</Text>
      <IconMaterial style={estilos.iconeDireita} color="rgba(0, 0, 0, 0.6)" name="keyboard-arrow-right" size={25} />
    </View>
  );

  const Item = ({ children }) => (
    <View style={estilos.item}>
      {children}
    </View>
  );

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={estilos.itemContainer}>
        <Icon style={estilos.iconeEsquerda} name={icone} size={25} color="rgba(0, 0, 0, 0.6)" />
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
    marginBottom: 10,
    color: '#000'
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
    marginLeft: 20,
    marginBottom: 9,
    marginTop: 2
  },
  iconeEsquerda: {
    marginLeft: 20,
    marginRight: 10
  },
  iconeDireita: {
    marginLeft: 'auto',
    paddingRight: 65
  },
  divisor: {
    backgroundColor: 'rgba(0, 0, 0, 0.22)'
  }
});
