import React from 'react';
import { View } from 'react-native';
import Check from '~/assets/icons/check.svg';
import BarraDeStatus from '../barraDeStatus';
import { SafeArea, Text } from './style';

const TelaDeSucesso = ({ texto, corBackground }) => (
  <View style={{ backgroundColor: corBackground }}>
    <BarraDeStatus backgroundColor={corBackground} barStyle="light-content" />
    <SafeArea>
      <Check />
      <Text>{texto}</Text>
    </SafeArea>
  </View>
);

export default TelaDeSucesso;
