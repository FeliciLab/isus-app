import React from 'react';
import { Linking, Text } from 'react-native';
import { CORES } from '~/constantes/estiloBase';

const AboutLink = props => {
  const { children, to } = props;

  return (
    <Text
      style={{
        color: CORES.VERDE,
        textDecorationLine: 'underline',
      }}
      onPress={() => Linking.openURL(to)}>
      {children}
    </Text>
  );
};

export default AboutLink;
