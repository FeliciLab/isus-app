import React from 'react';
import { Controller } from 'react-hook-form';
import { HelperText, TextInput } from 'react-native-paper';

// Componente de TextInput para ser usando com o react-hook-form
const ControlledTextInput = props => {
  const { control, name, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={error}
            {...rest}
          />
          {error && <HelperText type="error">{error.message}</HelperText>}
        </>
      )}
    />
  );
};

export default ControlledTextInput;
