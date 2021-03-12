import React, { useContext } from 'react';
import FormContext from '../../context/FormContext';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import TextInputMask from 'react-native-text-input-mask';

const FormTextInputMask = ({
  name, label, placeholder, theme, rules, mask
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
          mode="outlined"
          label={label}
          placeholder={placeholder || label}
          onChangeText={v => onChange(v)}
          selectionColor={theme.colors.primary}
          onBlur={onBlur}
          value={value}
          theme={theme}
          render={props => <TextInputMask {...props} mask={mask} />}
        />
      )}
    />
  );
};

export default FormTextInputMask;
