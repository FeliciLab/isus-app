import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { CORES } from '~/constantes/estiloBase';

const Select = ({ setValue, label, ...rest }) => {
  const placeholder = {
    label,
    value: null,
    color: '#9EA0A4',
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        placeholder={placeholder}
        onValueChange={value => setValue(value)}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: CORES.VERDE,
  },
});

export default Select;