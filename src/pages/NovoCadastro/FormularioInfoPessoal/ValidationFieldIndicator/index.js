import React from 'react';
import { ActivityIndicator, Text } from 'react-native';

import { Container } from './styles';

const ValidationFieldIndicator = ({ message }) => {
  return (
    <Container>
      <ActivityIndicator style={{ marginRight: 2 }} />
      <Text>{message}</Text>
    </Container>
  );
};

export default ValidationFieldIndicator;
