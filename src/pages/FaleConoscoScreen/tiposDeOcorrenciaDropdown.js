import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { ALERTA_FALTA_EPI, RELATAR_SUGESTAO, RELATAR_PROBLEMA } from './tiposDeOcorrencia';

export default function TiposDeOcorrenciaDropdown({ valorInicial, valorAtual }) {
  const [tela, alterarTela] = useState(valorInicial);

  useEffect(() => {
    valorAtual(tela);
  }, tela);

  const tiposDeOcorrencia = [
    { value: ALERTA_FALTA_EPI },
    { value: RELATAR_SUGESTAO },
    { value: RELATAR_PROBLEMA }
  ];

  return (
    <View style={{ position: 'relative' }}>

    <Dropdown
      label="Tipo de ocorrência"
      data={tiposDeOcorrencia}
      value={valorInicial}
      dropdownPosition={0}
      dropdownOffset={{ top: 80, left: 0 }}
      containerStyle={{ marginBottom: 2 }}
      onChangeText={valorProximo => alterarTela(valorProximo)}
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
