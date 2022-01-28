import React from 'react';
import { StyleSheet } from 'react-native';
import { BotaoCircular } from './BotaoCircularStyle';
import { CORES } from '~/constantes/estiloBase';

export const BotaoLaranja = ({ children, onPress, disabled, loading }) => (
  <BotaoCircular
    accessibilityState={{ disabled }}
    loading={loading}
    disabled={disabled}
    color="#fff"
    backgroundColor={disabled ? CORES.CINZA_DESABILITADO : CORES.LARANJA}
    style={styles.shadow}
    onPress={onPress}>
    {children}
  </BotaoCircular>
);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 10,
    shadowRadius: 1.0,
    elevation: 5,
  },
});
