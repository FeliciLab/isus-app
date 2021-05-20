import React, { useContext } from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';
// eslint-disable-next-line no-unused-vars
import TextInputMask from 'react-native-text-input-mask';
import FormContext from '../../context/FormContext';

const FormTextInputMask = ({
  // eslint-disable-next-line no-unused-vars
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
        // render={props => <TextInputMask {...props} mask={mask} />}
        />
      )}
    />
  );
};

export default FormTextInputMask;
