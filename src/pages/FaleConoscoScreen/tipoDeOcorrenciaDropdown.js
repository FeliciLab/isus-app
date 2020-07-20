import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-material-dropdown-v2';

export default function TipoDeOcorrenciaDropdown() {
  const tiposDeOcorrencia = [
    { value: 'Alerta de falta de EPI' },
    { value: 'Relatar sugestão (iSUS)' },
    { value: 'Relatar problema (iSUS)' }
  ];

  return (
    <View style={{ position: 'relative' }}>

    <Dropdown
      label="Tipo de ocorrência"
      data={tiposDeOcorrencia}
      dropdownPosition={0}
      dropdownOffset={{ top: 80, left: 0 }}
      containerStyle={{ marginBottom: 2 }}
    />

    <Icon
      style={{
        position: 'absolute', right: 8, top: 30, fontSize: 25
      }}
      name="arrow-drop-down"
    />
    </View>
  );
}
