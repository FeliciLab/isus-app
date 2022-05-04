import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { CORES } from '~/constantes/estiloBase';
import { Container } from './styles';

const ValidationFieldIndicator = ({ message }) => {
  return (
    <Container>
      <ActivityIndicator style={{ marginRight: 2 }} />
      <Text style={{ color: CORES.PRETO }}>{message}</Text>
    </Container>
  );
};

export default ValidationFieldIndicator;
