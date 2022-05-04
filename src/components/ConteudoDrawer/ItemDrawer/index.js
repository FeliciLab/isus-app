import { DrawerItem } from '@react-navigation/drawer';
import React from 'react';

function ItemDrawer({ nome, icone, isFocado, onPress, testID }) {
  return (
    <DrawerItem
      icon={() => icone}
      label={nome}
      testID={testID}
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

export default ItemDrawer;
