import React from 'react';
import { View } from 'react-native';
import Check from '~/assets/icons/check.svg';
import BarraDeStatus from '../barraDeStatus';
import { SafeArea, Text } from './style';

const TelaDeSucesso = ({ texto, corBackground }) => (
  <>
    <BarraDeStatus backgroundColor={corBackground} barStyle="light-content" />
    <View style={{ backgroundColor: corBackground }}>
      <SafeArea>
        <Check />
        <Text>{texto}</Text>
      </SafeArea>
    </View>
  </>
);

export default TelaDeSucesso;
