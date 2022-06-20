import { DrawerItem } from '@react-navigation/drawer';
import React from 'react';

export default function ItemDrawer({
  nome,
  icone,
  isFocado,
  onPress,
  testID,
}) {
  return (
    <DrawerItem
      icon={() => icone}
      label={nome}
      testID={testID}
      style={{ display: 'flex' }}
      labelStyle={{ fontSize: 15 }}
      inactiveTintColor="rgba(0, 0, 0, 0.87)"
      activeTintColor="rgba(0, 0, 0, 0.87)"
      inactiveBackgroundColor="transparent"
      activeBackgroundColor="transparent"
      focused={isFocado}
      onPress={onPress}
    />
  );
}
