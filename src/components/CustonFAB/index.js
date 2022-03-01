import React from 'react';
import { CORES } from '~/constantes/estiloBase';
import { Container } from './styles';

const CustonFAB = props => {
  return <Container {...props} color={CORES.BRANCO} />;
};

export default CustonFAB;
