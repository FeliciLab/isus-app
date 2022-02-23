import React from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { ArrowDropDownIcon } from '~/icons';

export default function DropdownSimples({
  aoMudarValor,
  dados,
  label,
  valor,
  definirValor,
  definirRotulo,
}) {
  const dropdownRef = React.createRef();

  return (
    <View style={{ position: 'relative' }}>
      <Dropdown
        ref={dropdownRef}
        label={label}
        data={dados}
        value={valor}
        dropdownPosition={0}
        itemCount="5"
        itemColor="rgba(0,0,0,0.87)"
        textColor="#000000"
        baseColor="#000000"
        dropdownOffset={{ top: 80, left: 0 }}
        containerStyle={{ marginBottom: 2 }}
        valueExtractor={definirValor}
        labelExtractor={definirRotulo}
        onChangeText={proximoValor => {
          aoMudarValor(proximoValor);
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
