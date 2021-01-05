import React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import { useFeatures } from '@paralleldrive/react-feature-toggles';

export default function ItemDrawer({
  nome, icone, feature, isFocado, onPress
}) {
  const features = useFeatures();
  const featureEstaAtiva = () => (!!(feature && features.includes(feature)));
  const featureExiste = () => (!!feature);

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
      key={nome}
      icon={() => icone}
      label={nome}
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
