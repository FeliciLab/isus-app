import { useFeatures } from '@paralleldrive/react-feature-toggles';
import { DrawerItem } from '@react-navigation/drawer';
import React from 'react';

export default function ItemDrawer({
  nome,
  icone,
  feature,
  isFocado,
  onPress,
  testID,
}) {
  const features = useFeatures();
  const featureEstaAtiva = () => !!(feature && features.includes(feature));
  const featureExiste = () => !!feature;

  const visibilidade = () => {
    if (featureEstaAtiva()) {
      return 'flex';
    }
    if (featureExiste()) {
      return 'none';
    }
    return 'flex';
  };

  return (
    <DrawerItem
      icon={() => icone}
      label={nome}
      testID={testID}
      style={{ display: visibilidade() }}
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
