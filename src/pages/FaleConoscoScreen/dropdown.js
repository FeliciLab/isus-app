import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { tiposDeOcorrenciaDropdown } from './tiposDeOcorrencia';

export default function DropdownSimples({
  valorInicial, aoMudarValor, dados, label
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
        onChangeText={(proximoValor) => {
          aoMudarValor(tiposDeOcorrenciaDropdown[proximoValor]);
        }}
      />

      <Icon
        style={{
          position: 'absolute', right: 8, top: 30, fontSize: 25
        }}
        name="arrow-drop-down"
        onPress={() => dropdownRef.current.focus()}
      />
    </View>
  );
}
