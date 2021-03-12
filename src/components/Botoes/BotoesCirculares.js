import React from 'react';
import { StyleSheet } from 'react-native';
import { BotaoCircular } from './BotaoCircularStyle';
import { CORES } from '../../constantes/estiloBase';

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 10,
    shadowRadius: 1.00,
    elevation: 5
  }
});

export const BotaoLaranja = ({ children, onPress }) => (
  <BotaoCircular
    color="#fff"
    backgroundColor={CORES.LARANJA}
    style={styles.shadow}
    onPress={onPress}
  >
    {children}
  </BotaoCircular>
);


export default {
  BotaoLaranja
};
