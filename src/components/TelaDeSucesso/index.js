import React from 'react';
import { View } from 'react-native';
import { SafeArea, Text } from './style';
import BarraDeStatus from '../barraDeStatus';
import Check from '../../assets/icons/check.svg';

const TelaDeSucesso = ({
  texto,
  corBackground
}) => (
  <>
    <BarraDeStatus
      backgroundColor={corBackground}
      barStyle="light-content"
    />
    <View style={{ backgroundColor: corBackground }}>
      <SafeArea>
        <Check />
        <Text>
          { texto }
        </Text>
      </SafeArea>
    </View>
  </>
);

export default TelaDeSucesso;
