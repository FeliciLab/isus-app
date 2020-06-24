import React from 'react';
import {
  TouchableOpacity, View, Text, StyleSheet
} from 'react-native';

const BotaoManejoClinico = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={estilo.botaoManejo}>
      <Text style={estilo.textoBotao}>
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);

const estilo = StyleSheet.create({
  botaoManejo: {
    backgroundColor: '#F2C94C',
    padding: 10,
    borderRadius: 200,
    shadowColor: '#000',
    marginHorizontal: 2,
    marginVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  textoBotao: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#4054B2',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default BotaoManejoClinico;
