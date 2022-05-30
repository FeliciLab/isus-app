import React from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { ArrowDropDownIcon } from '~/icons';
import { tiposDeOcorrenciaDropdown } from './tiposDeOcorrencia';

// TODO: acho que podemos remover isso
export default function DropdownSimples({
  valorInicial,
  aoMudarValor,
  dados,
  label,
}) {
  const dropdownRef = React.createRef();

  return (
    <View style={{ position: 'relative' }}>
      <Dropdown
        ref={dropdownRef}
        label={label}
        data={dados}
        value={valorInicial.textoDoDropdown}
        dropdownPosition={0}
        dropdownOffset={{ top: 80, left: 0 }}
        containerStyle={{ marginBottom: 2 }}
        onChangeText={proximoValor => {
          aoMudarValor(tiposDeOcorrenciaDropdown[proximoValor]);
        }}
      />
      <ArrowDropDownIcon
        style={{
          position: 'absolute',
          right: 8,
          top: 30,
          fontSize: 25,
        }}
        onPress={() => dropdownRef.current.focus()}
      />
    </View>
  );
}
