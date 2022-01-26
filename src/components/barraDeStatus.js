import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';

function BarraDeStatus(props) {
  const estaFocado = useIsFocused();
  return estaFocado ? <StatusBar {...props} /> : null;
}

export default BarraDeStatus;
