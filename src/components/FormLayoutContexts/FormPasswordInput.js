import React, { useContext } from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import FormContext from '../../context/FormContext';

const FormTextInput = ({
  name, label, placeholder, theme, rules, readonly
}) => {
  const { control } = useContext(FormContext);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue=""
      render={({ onChange, onBlur, value }) => (
        <TextInput
          disabled={readonly || false}
          mode="outlined"
          label={label}
          placeholder={placeholder || label}
          onChangeText={v => onChange(v)}
          selectionColor={theme.colors.primary}
          onBlur={onBlur}
          value={value}
          theme={theme}
        />
      )}
    />
  );
};

export default FormTextInput;
