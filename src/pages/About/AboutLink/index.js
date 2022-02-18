import React from 'react';
import { Linking, Text } from 'react-native';

const AboutLink = props => {
  const { children, to } = props;

  return (
    <Text
      style={{
        color: '#4CAF50',
        textDecorationLine: 'underline',
      }}
      onPress={() => Linking.openURL(to)}>
      {children}
    </Text>
  );
};

export default AboutLink;
