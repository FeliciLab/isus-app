import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';

function BarraDeStatus(props) {
  const estaFocado = useIsFocused();
  return estaFocado ? <StatusBar {...props} /> : null;
}

export default BarraDeStatus;
